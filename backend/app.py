import os
import re
import random
import sqlite3
from urllib.parse import urlparse
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, 'cybershield.db')
PENDING_OTPS = {}  # Stores {identifier: "123456"} temporarily


def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_db_connection()
    c = conn.cursor()

    c.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            full_name TEXT NOT NULL,
            identifier TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            age TEXT DEFAULT '',
            gender TEXT DEFAULT '',
            state TEXT DEFAULT '',
            avatar TEXT DEFAULT '🛡️',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    c.execute('''
        CREATE TABLE IF NOT EXISTS quiz_scores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            quiz_type TEXT NOT NULL,
            score INTEGER NOT NULL,
            total INTEGER NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    c.execute('''
        CREATE TABLE IF NOT EXISTS checklist_progress (
            item_id TEXT PRIMARY KEY,
            completed INTEGER NOT NULL DEFAULT 0,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    c.execute('''
        CREATE TABLE IF NOT EXISTS feedback (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            category TEXT,
            rating TEXT,
            topic TEXT,
            follow_up TEXT,
            message TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    conn.commit()
    conn.close()


init_db()


SCAM_SCENARIOS = [
    {
        'id': 1,
        'type': 'SMS',
        'sender': 'VM-HDFCBK-ALERT',
        'content': 'Dear Customer, your KYC is expiring today. Update immediately at http://hdfc-kyc-update99.xyz or your account will be suspended.',
        'isScam': True,
        'explanation': 'Banks never send .xyz links or threaten immediate same-day suspension via SMS.'
    },
    {
        'id': 2,
        'type': 'WhatsApp',
        'sender': '+91 98210-XXXXX',
        'content': 'Hi! I accidentally sent ₹2,000 to your UPI ID by mistake. Please scan this QR code and enter your PIN to refund it quickly.',
        'isScam': True,
        'explanation': 'Entering a UPI PIN on a QR code sends money out of your account—never refunds it.'
    },
    {
        'id': 3,
        'type': 'Email',
        'sender': 'no-reply@accounts.google.com',
        'content': 'Security alert: A new sign-in was detected on Windows. If this was you, you do not need to do anything. Otherwise, visit myaccount.google.com.',
        'isScam': False,
        'explanation': 'Legitimate domain (accounts.google.com), no link click required if you recognize the login, and no request for passwords or OTPs.'
    },
    {
        'id': 4,
        'type': 'Video Call',
        'sender': 'CBI Cyber Cell HQ',
        'content': 'Your Aadhaar was used to ship an illegal parcel to Mumbai. Stay on Skype video call under "Digital Arrest" and transfer ₹50,000 for RBI verification.',
        'isScam': True,
        'explanation': '"Digital Arrest" does not exist in Indian law. Police never demand money over video calls.'
    },
    {
        'id': 5,
        'type': 'Official App Alert',
        'sender': 'UIDAI / mAadhaar',
        'content': 'Your Aadhaar biometric lock has been enabled successfully. You can unlock it anytime using the official mAadhaar app or myaadhaar.uidai.gov.in.',
        'isScam': False,
        'explanation': 'Informational confirmation referencing only the official .gov.in portal with zero sensitive data requests.'
    },
    {
        'id': 6,
        'type': 'Telegram',
        'sender': 'HR_Amazon_WorkFromHome',
        'content': 'Earn ₹4,500/day liking YouTube videos! Complete 3 tasks and deposit ₹5,000 in our VIP merchant account to unlock ₹12,000 commission.',
        'isScam': True,
        'explanation': 'Classic prepaid task scam—real jobs never ask you to deposit money to withdraw earnings.'
    }
]


@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'}), 200


# --- 1. Send & Verify OTP Code ---
@app.route('/api/auth/send-otp', methods=['POST'])
def send_otp():
    data = request.get_json() or {}
    identifier = data.get('identifier', '').strip().lower()
    if not identifier or len(identifier) < 5:
        return jsonify({'error': 'Enter a valid email address or 10-digit phone number.'}), 400

    otp_code = str(random.randint(100000, 999999))
    PENDING_OTPS[identifier] = otp_code
    print(f'[CyberShield OTP] Identifier: {identifier} -> Code: {otp_code}')
    return jsonify({
        'message': f'Verification code sent to {identifier}',
        'demo_otp': otp_code  # Returned for local demo convenience
    }), 200


@app.route('/api/auth/signup', methods=['POST'])
def signup():
    data = request.get_json() or {}
    full_name = data.get('full_name', '').strip()
    identifier = data.get('identifier', '').strip().lower()
    otp = data.get('otp', '').strip()
    password = data.get('password', '')
    age = str(data.get('age', '')).strip()
    gender = data.get('gender', '').strip()
    state = data.get('state', '').strip()
    avatar = data.get('avatar', '🛡️').strip() or '🛡️'

    if not full_name or not identifier or len(password) < 4:
        return jsonify({'error': 'Name, phone/email, and password (min 4 chars) are required.'}), 400

    expected_otp = PENDING_OTPS.get(identifier)
    if not expected_otp or otp != expected_otp:
        return jsonify({'error': 'Invalid or expired verification code. Click "Send Code" first.'}), 400

    conn = get_db_connection()
    try:
        conn.execute(
            '''INSERT INTO users (full_name, identifier, password_hash, age, gender, state, avatar)
               VALUES (?, ?, ?, ?, ?, ?, ?)''',
            (full_name, identifier, generate_password_hash(password), age, gender, state, avatar)
        )
        conn.commit()
        PENDING_OTPS.pop(identifier, None)
        user = conn.execute(
            'SELECT id, full_name, identifier, age, gender, state, avatar FROM users WHERE identifier = ?',
            (identifier,)
        ).fetchone()
        return jsonify({'message': 'Account created', 'user': dict(user)}), 201
    except sqlite3.IntegrityError:
        return jsonify({'error': 'This phone number or email is already registered. Please Login.'}), 409
    finally:
        conn.close()


@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    identifier = data.get('identifier', '').strip().lower()
    password = data.get('password', '')
    otp = data.get('otp', '').strip()

    conn = get_db_connection()
    user = conn.execute('SELECT * FROM users WHERE identifier = ?', (identifier,)).fetchone()
    conn.close()

    if not user or not check_password_hash(user['password_hash'], password):
        return jsonify({'error': 'Invalid phone/email or password.'}), 401

    if otp:
        expected_otp = PENDING_OTPS.get(identifier)
        if not expected_otp or otp != expected_otp:
            return jsonify({'error': 'Invalid verification code.'}), 400
        PENDING_OTPS.pop(identifier, None)

    return jsonify({
        'message': 'Login successful',
        'user': {
            'id': user['id'],
            'full_name': user['full_name'],
            'identifier': user['identifier'],
            'age': user['age'],
            'gender': user['gender'],
            'state': user['state'],
            'avatar': user['avatar']
        }
    }), 200


# --- 5. Suspicious Link Checker (Covers all endpoint names to prevent 404) ---
def analyze_url_logic(raw_url):
    normalized = raw_url if raw_url.startswith(('http://', 'https://')) else f'http://{raw_url}'
    parsed = urlparse(normalized)
    domain = (parsed.hostname or '').lower()

    red_flags = []
    if parsed.scheme != 'https':
        red_flags.append('Uses unencrypted HTTP instead of HTTPS.')
    if re.match(r'^\d{1,3}(\.\d{1,3}){3}$', domain):
        red_flags.append('Uses a raw IP address instead of a legitimate domain name.')
    if any(domain.endswith(tld) for tld in ('.xyz', '.top', '.tk', '.ml', '.ga', '.cf', '.gq', '.click', '.loan')):
        red_flags.append('Uses a high-risk domain extension frequently abused in phishing.')
    if any(kw in domain for kw in ('amaz0n', 'paytm-', 'sbi-', 'hdfc-', 'icici-', 'kyc-', 'verify-', 'gift', 'free-')):
        red_flags.append('Contains suspicious brand impersonation or urgency keywords.')
    if domain.count('-') >= 2:
        red_flags.append('Contains multiple hyphens commonly used in spoofed domains.')
    if '@' in raw_url:
        red_flags.append('Contains an "@" symbol used to disguise the real destination host.')

    score = max(10, 100 - len(red_flags) * 30)
    risk_level = 'High Risk' if len(red_flags) >= 2 else ('Suspicious' if len(red_flags) == 1 else 'Likely Safe')
    return {
        'url': raw_url,
        'domain': domain or raw_url,
        'risk_level': risk_level,
        'status': risk_level,
        'safety_score': score,
        'red_flags': red_flags,
        'reasons': red_flags if red_flags else ['Valid HTTPS structure and no known phishing keywords detected.']
    }


@app.route('/api/check-url', methods=['POST'])
@app.route('/api/url-check', methods=['POST'])
@app.route('/api/url/check', methods=['POST'])
@app.route('/api/scan-url', methods=['POST'])
def check_url():
    data = request.get_json() or {}
    raw_url = (data.get('url') or data.get('link') or '').strip()
    if not raw_url:
        return jsonify({'error': 'Please enter a URL to check.'}), 400
    return jsonify(analyze_url_logic(raw_url)), 200


# --- 6. Scam or Not Scenarios (Covers all endpoint names to prevent 404) ---
@app.route('/api/scam-or-not', methods=['GET'])
@app.route('/api/scam-scenarios', methods=['GET'])
@app.route('/api/scenarios', methods=['GET'])
def get_scam_scenarios():
    return jsonify(SCAM_SCENARIOS), 200


@app.route('/api/scam-or-not/check', methods=['POST'])
def check_scam_answer():
    data = request.get_json() or {}
    scenario_id = data.get('id')
    user_guess = bool(data.get('isScam'))
    scenario = next((s for s in SCAM_SCENARIOS if s['id'] == scenario_id), None)
    if not scenario:
        return jsonify({'error': 'Scenario not found'}), 404
    return jsonify({
        'correct': user_guess == scenario['isScam'],
        'isScam': scenario['isScam'],
        'explanation': scenario['explanation']
    }), 200


# --- Quiz, Checklist, Progress & Feedback ---
@app.route('/api/quiz/submit', methods=['POST'])
def submit_quiz():
    data = request.get_json() or {}
    quiz_type = data.get('quiz_type', 'General Quiz')
    score = int(data.get('score', 0))
    total = int(data.get('total', 10))
    conn = get_db_connection()
    conn.execute('INSERT INTO quiz_scores (quiz_type, score, total) VALUES (?, ?, ?)', (quiz_type, score, total))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Quiz score saved', 'score': score, 'total': total}), 201


@app.route('/api/checklist', methods=['GET', 'POST'])
def checklist():
    conn = get_db_connection()
    if request.method == 'POST':
        data = request.get_json() or {}
        item_id = data.get('item_id')
        completed = 1 if data.get('completed') else 0
        if item_id:
            conn.execute(
                '''INSERT INTO checklist_progress (item_id, completed)
                   VALUES (?, ?)
                   ON CONFLICT(item_id) DO UPDATE SET completed=excluded.completed, updated_at=CURRENT_TIMESTAMP''',
                (item_id, completed)
            )
            conn.commit()
    rows = conn.execute('SELECT item_id, completed FROM checklist_progress').fetchall()
    conn.close()
    return jsonify({row['item_id']: bool(row['completed']) for row in rows}), 200


@app.route('/api/progress', methods=['GET'])
def progress_summary():
    conn = get_db_connection()
    quizzes = conn.execute('SELECT * FROM quiz_scores ORDER BY created_at DESC').fetchall()
    checklist_rows = conn.execute('SELECT * FROM checklist_progress WHERE completed = 1').fetchall()
    conn.close()
    return jsonify({
        'quizzes_taken': len(quizzes),
        'latest_score': dict(quizzes[0]) if quizzes else None,
        'checklist_completed': len(checklist_rows),
        'history': [dict(q) for q in quizzes]
    }), 200


@app.route('/api/feedback', methods=['GET', 'POST'])
def feedback():
    conn = get_db_connection()
    if request.method == 'POST':
        data = request.get_json() or {}
        message = data.get('message', '').strip()
        if not message:
            conn.close()
            return jsonify({'error': 'Message cannot be empty.'}), 400
        conn.execute(
            '''INSERT INTO feedback (name, category, rating, topic, follow_up, message)
               VALUES (?, ?, ?, ?, ?, ?)''',
            (
                data.get('name', 'Anonymous'),
                data.get('category', 'General Feedback'),
                data.get('rating', '5 - Very Helpful'),
                data.get('topic', 'Overall Platform'),
                data.get('follow_up', 'No follow-up needed'),
                message
            )
        )
        conn.commit()
        conn.close()
        return jsonify({'message': 'Feedback submitted successfully!'}), 201

    rows = conn.execute('SELECT * FROM feedback ORDER BY created_at DESC LIMIT 20').fetchall()
    conn.close()
    return jsonify([dict(r) for r in rows]), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)