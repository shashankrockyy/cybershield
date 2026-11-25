# CyberShield — Smart Fraud Awareness & Cyber Safety Application
**Tagline:** Awareness • Prevention • Protection

CyberShield is a full-stack, multilingual (English, Kannada, Hindi) preventive cybersecurity education platform built with **React + Vite** on the frontend and **Python Flask + SQLite** on the backend.

## Key Modules
1. **Home & Command Dashboard** — Daily safety tips, 8 interactive module cards, and live progress metrics.
2. **Scam or Not? Fraud Detector** — 15 realistic Indian scam scenarios with suspicious phrase highlighting and red-flag breakdowns.
3. **Cyber Fraud Awareness Library** — 12 comprehensive guides (UPI, Phishing, OTP, Digital Arrest, Fake Jobs, QR, Fake Screenshots, etc.).
4. **Suspicious URL Checker** — Safe static heuristic link inspector (never visits or downloads submitted URLs).
5. **Password Guardian** — 100% browser-local password strength meter and 2FA education.
6. **Cyber Safety Quiz + Pre/Post Assessment** — 30 multilingual MCQs across Beginner, Intermediate, and Advanced levels stored in SQLite.
7. **Interactive Fraud Simulator** — Decision-based scam call and message training.
8. **Spot the Fake Payment** — Teaches verification of genuine vs. manipulated UPI payment receipts.
9. **Privacy & Security Checkup** — 10-point interactive cyber hygiene score tracker.
10. **Emergency Fraud Assistance** — Rapid Golden-Hour response guide featuring **1930** and `cybercrime.gov.in`.

## Local Setup in VS Code
### 1. Start Backend (Terminal 1)
```bash
cd backend
python -m venv venv
venv\Scripts\activate      # Windows
pip install -r requirements.txt
python app.py