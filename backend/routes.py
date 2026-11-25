import json
import re
from flask import Blueprint, request, jsonify
from database import get_db_connection
from url_analyzer import analyze_url_heuristics

api_bp = Blueprint("api", __name__, url_prefix="/api")

VALID_LANGS = {"en", "kn", "hi"}
VALID_DIFFICULTIES = {"beginner", "intermediate", "advanced", "all"}
VALID_QUIZ_TYPES = {"pre", "post", "practice"}


def sanitize_session_id(raw_id: str) -> str:
    cleaned = re.sub(r"[^a-zA-Z0-9_-]", "", (raw_id or "").strip())
    if not cleaned or len(cleaned) > 80:
        return "guest_default_session"
    return cleaned


def ensure_user_session(conn, session_id: str, lang: str = "en"):
    safe_lang = lang if lang in VALID_LANGS else "en"
    conn.execute(
        """
        INSERT INTO users (session_id, preferred_lang)
        VALUES (?, ?)
        ON CONFLICT(session_id) DO NOTHING
        """,
        (session_id, safe_lang),
    )


# 1. Health & Stats Overview
@api_bp.route("/health", methods=["GET"])
def health_check():
    return jsonify({"status": "ok", "service": "CyberShield API"})


# 2. Retrieve Quiz Questions (supports difficulty, quiz_type, and language)
@api_bp.route("/quiz/questions", methods=["GET"])
def get_quiz_questions():
    difficulty = (request.args.get("difficulty") or "all").lower()
    quiz_type = (request.args.get("quiz_type") or "practice").lower()
    lang = (request.args.get("lang") or "en").lower()

    if difficulty not in VALID_DIFFICULTIES:
        return jsonify({"error": "Invalid difficulty level."}), 400
    if lang not in VALID_LANGS:
        lang = "en"

    conn = get_db_connection()
    if quiz_type in {"pre", "post"}:
        # Balanced 10-question assessment across all difficulty tiers
        rows = conn.execute(
            """
            SELECT * FROM (
                SELECT * FROM quiz_questions WHERE difficulty = 'beginner' ORDER BY id LIMIT 4
            )
            UNION ALL
            SELECT * FROM (
                SELECT * FROM quiz_questions WHERE difficulty = 'intermediate' ORDER BY id LIMIT 3
            )
            UNION ALL
            SELECT * FROM (
                SELECT * FROM quiz_questions WHERE difficulty = 'advanced' ORDER BY id LIMIT 3
            )
            """
        ).fetchall()
    elif difficulty == "all":
        rows = conn.execute("SELECT * FROM quiz_questions ORDER BY id ASC").fetchall()
    else:
        rows = conn.execute(
            "SELECT * FROM quiz_questions WHERE difficulty = ? ORDER BY id ASC",
            (difficulty,),
        ).fetchall()
    conn.close()

    questions = []
    for r in rows:
        questions.append({
            "id": r["id"],
            "difficulty": r["difficulty"],
            "category": r["category"],
            "question": r[f"question_{lang}"],
            "options": json.loads(r[f"options_{lang}_json"]),
            "correct_index": r["correct_index"],
            "explanation": r[f"explanation_{lang}"],
        })

    return jsonify({"questions": questions, "count": len(questions)})


# 3. Submit Quiz Result & Store in SQLite
@api_bp.route("/quiz/submit", methods=["POST"])
def submit_quiz():
    data = request.get_json(silent=True) or {}
    session_id = sanitize_session_id(data.get("session_id"))
    quiz_type = (data.get("quiz_type") or "practice").lower()
    difficulty = (data.get("difficulty") or "all").lower()

    if quiz_type not in VALID_QUIZ_TYPES:
        return jsonify({"error": "Invalid quiz_type. Must be pre, post, or practice."}), 400

    try:
        score = int(data.get("score", 0))
        total_questions = int(data.get("total_questions", 0))
    except (TypeError, ValueError):
        return jsonify({"error": "Score and total_questions must be integers."}), 400

    if total_questions <= 0 or score < 0 or score > total_questions:
        return jsonify({"error": "Invalid score range submitted."}), 400

    percentage = round((score / total_questions) * 100, 1)

    conn = get_db_connection()
    ensure_user_session(conn, session_id)
    cursor = conn.execute(
        """
        INSERT INTO quiz_attempts (session_id, quiz_type, difficulty, score, total_questions, percentage)
        VALUES (?, ?, ?, ?, ?, ?)
        """,
        (session_id, quiz_type, difficulty, score, total_questions, percentage),
    )
    attempt_id = cursor.lastrowid
    conn.commit()
    conn.close()

    return jsonify({
        "message": "Quiz result saved successfully.",
        "attempt_id": attempt_id,
        "percentage": percentage,
    }), 201


# 4. Retrieve Scam or Not Scenarios
@api_bp.route("/scams", methods=["GET"])
def get_scam_scenarios():
    conn = get_db_connection()
    rows = conn.execute("SELECT * FROM scam_scenarios ORDER BY id ASC").fetchall()
    conn.close()

    scenarios = []
    for r in rows:
        scenarios.append({
            "id": r["id"],
            "category": r["category"],
            "channel": r["channel"],
            "sender": r["sender"],
            "message_text": r["message_text"],
            "is_scam": bool(r["is_scam"]),
            "highlighted_phrases": json.loads(r["highlighted_phrases_json"]),
            "red_flags": json.loads(r["red_flags_json"]),
            "explanation": r["explanation"],
            "prevention": r["prevention"],
        })

    return jsonify({"scenarios": scenarios, "count": len(scenarios)})


# 5. Heuristic URL Checker Endpoint (Does NOT fetch or open the URL)
@api_bp.route("/url-check", methods=["POST"])
def check_url():
    data = request.get_json(silent=True) or {}
    raw_url = data.get("url", "")
    try:
        result = analyze_url_heuristics(raw_url)
        return jsonify(result), 200
    except ValueError as err:
        return jsonify({"error": str(err)}), 400


# 6. Get Full User Progress (Modules, Quiz Attempts, Pre vs Post Comparison, Checklist)
@api_bp.route("/progress/<session_id>", methods=["GET"])
def get_user_progress(session_id):
    safe_session = sanitize_session_id(session_id)
    conn = get_db_connection()
    ensure_user_session(conn, safe_session)
    conn.commit()

    user_row = conn.execute(
        "SELECT session_id, display_name, preferred_lang FROM users WHERE session_id = ?",
        (safe_session,),
    ).fetchone()

    modules = conn.execute(
        "SELECT module_slug, completed, completed_at FROM module_progress WHERE session_id = ? AND completed = 1",
        (safe_session,),
    ).fetchall()

    attempts = conn.execute(
        """
        SELECT id, quiz_type, difficulty, score, total_questions, percentage, created_at
        FROM quiz_attempts
        WHERE session_id = ?
        ORDER BY created_at DESC
        """,
        (safe_session,),
    ).fetchall()

    checklist = conn.execute(
        "SELECT item_key, is_checked FROM checklist_progress WHERE session_id = ?",
        (safe_session,),
    ).fetchall()
    conn.close()

    attempts_list = [dict(a) for a in attempts]
    pre_attempts = [a for a in attempts_list if a["quiz_type"] == "pre"]
    post_attempts = [a for a in attempts_list if a["quiz_type"] == "post"]

    latest_pre = pre_attempts[0] if pre_attempts else None
    latest_post = post_attempts[0] if post_attempts else None
    improvement = None
    if latest_pre and latest_post:
        improvement = round(latest_post["percentage"] - latest_pre["percentage"], 1)

    return jsonify({
        "user": dict(user_row),
        "completed_modules": [m["module_slug"] for m in modules],
        "quiz_attempts": attempts_list,
        "pre_assessment": latest_pre,
        "post_assessment": latest_post,
        "awareness_improvement": improvement,
        "checklist": {c["item_key"]: bool(c["is_checked"]) for c in checklist},
    })


# 7. Update User Profile / Language Preference (PATCH)
@api_bp.route("/progress/<session_id>/preferences", methods=["PATCH"])
def update_user_preferences(session_id):
    safe_session = sanitize_session_id(session_id)
    data = request.get_json(silent=True) or {}
    lang = (data.get("preferred_lang") or "en").lower()
    display_name = (data.get("display_name") or "").strip()[:50]

    if lang not in VALID_LANGS:
        return jsonify({"error": "Unsupported language code."}), 400

    conn = get_db_connection()
    ensure_user_session(conn, safe_session, lang)
    if display_name:
        conn.execute(
            "UPDATE users SET preferred_lang = ?, display_name = ? WHERE session_id = ?",
            (lang, display_name, safe_session),
        )
    else:
        conn.execute(
            "UPDATE users SET preferred_lang = ? WHERE session_id = ?",
            (lang, safe_session),
        )
    conn.commit()
    conn.close()

    return jsonify({"message": "Preferences updated.", "preferred_lang": lang})


# 8. Mark Learning Module Completed (POST)
@api_bp.route("/progress/module", methods=["POST"])
def mark_module_complete():
    data = request.get_json(silent=True) or {}
    session_id = sanitize_session_id(data.get("session_id"))
    module_slug = re.sub(r"[^a-zA-Z0-9_-]", "", (data.get("module_slug") or "").strip())

    if not module_slug:
        return jsonify({"error": "module_slug is required."}), 400

    conn = get_db_connection()
    ensure_user_session(conn, session_id)
    conn.execute(
        """
        INSERT INTO module_progress (session_id, module_slug, completed)
        VALUES (?, ?, 1)
        ON CONFLICT(session_id, module_slug) DO UPDATE SET completed = 1, completed_at = CURRENT_TIMESTAMP
        """,
        (session_id, module_slug),
    )
    conn.commit()
    conn.close()

    return jsonify({"message": f"Module '{module_slug}' marked completed."}), 200


# 9. Save Privacy & Security Checklist Item (POST)
@api_bp.route("/progress/checklist", methods=["POST"])
def save_checklist_item():
    data = request.get_json(silent=True) or {}
    session_id = sanitize_session_id(data.get("session_id"))
    item_key = re.sub(r"[^a-zA-Z0-9_-]", "", (data.get("item_key") or "").strip())
    is_checked = 1 if data.get("is_checked") else 0

    if not item_key:
        return jsonify({"error": "item_key is required."}), 400

    conn = get_db_connection()
    ensure_user_session(conn, session_id)
    conn.execute(
        """
        INSERT INTO checklist_progress (session_id, item_key, is_checked)
        VALUES (?, ?, ?)
        ON CONFLICT(session_id, item_key) DO UPDATE SET is_checked = excluded.is_checked, updated_at = CURRENT_TIMESTAMP
        """,
        (session_id, item_key, is_checked),
    )
    conn.commit()
    conn.close()

    return jsonify({"message": "Checklist item saved.", "item_key": item_key, "is_checked": bool(is_checked)})


# 10. Reset User Progress (DELETE)
@api_bp.route("/progress/<session_id>", methods=["DELETE"])
def reset_user_progress(session_id):
    safe_session = sanitize_session_id(session_id)
    conn = get_db_connection()
    conn.execute("DELETE FROM quiz_attempts WHERE session_id = ?", (safe_session,))
    conn.execute("DELETE FROM module_progress WHERE session_id = ?", (safe_session,))
    conn.execute("DELETE FROM checklist_progress WHERE session_id = ?", (safe_session,))
    conn.commit()
    conn.close()

    return jsonify({"message": "Your local learning progress and quiz history have been reset."})


# 11. Submit & List Community Feedback / Scam Reports (GET & POST)
@api_bp.route("/feedback", methods=["GET", "POST"])
def handle_feedback():
    if request.method == "GET":
        conn = get_db_connection()
        rows = conn.execute(
            "SELECT id, name, category, message, created_at FROM feedback_submissions ORDER BY created_at DESC LIMIT 10"
        ).fetchall()
        conn.close()
        return jsonify({"submissions": [dict(r) for r in rows]})

    data = request.get_json(silent=True) or {}
    name = (data.get("name") or "").strip()
    email = (data.get("email") or "").strip()
    category = (data.get("category") or "feedback").strip().lower()
    message = (data.get("message") or "").strip()

    if len(name) < 2 or len(name) > 80:
        return jsonify({"error": "Please enter your name (2–80 characters)."}), 400
    if category not in {"feedback", "scam_report"}:
        return jsonify({"error": "Category must be 'feedback' or 'scam_report'."}), 400
    if len(message) < 10 or len(message) > 1500:
        return jsonify({"error": "Message must be between 10 and 1500 characters."}), 400

    conn = get_db_connection()
    cursor = conn.execute(
        """
        INSERT INTO feedback_submissions (name, email, category, message)
        VALUES (?, ?, ?, ?)
        """,
        (name, email[:120], category, message),
    )
    submission_id = cursor.lastrowid
    conn.commit()
    conn.close()

    return jsonify({
        "message": "Thank you! Your submission has been recorded for community awareness.",
        "id": submission_id,
    }), 201