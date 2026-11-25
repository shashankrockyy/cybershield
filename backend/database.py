import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "cybershield.db")


def get_db_connection():
    """Return a SQLite connection with dictionary-like row access."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON;")
    return conn


def init_db():
    """Create all required tables if they do not exist."""
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.executescript(
        """
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            session_id TEXT UNIQUE NOT NULL,
            display_name TEXT DEFAULT 'Community Learner',
            preferred_lang TEXT DEFAULT 'en',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS quiz_questions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            difficulty TEXT NOT NULL CHECK(difficulty IN ('beginner', 'intermediate', 'advanced')),
            category TEXT NOT NULL,
            question_en TEXT NOT NULL,
            question_kn TEXT NOT NULL,
            question_hi TEXT NOT NULL,
            options_en_json TEXT NOT NULL,
            options_kn_json TEXT NOT NULL,
            options_hi_json TEXT NOT NULL,
            correct_index INTEGER NOT NULL CHECK(correct_index BETWEEN 0 AND 3),
            explanation_en TEXT NOT NULL,
            explanation_kn TEXT NOT NULL,
            explanation_hi TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS quiz_attempts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            session_id TEXT NOT NULL,
            quiz_type TEXT NOT NULL CHECK(quiz_type IN ('pre', 'post', 'practice')),
            difficulty TEXT NOT NULL,
            score INTEGER NOT NULL,
            total_questions INTEGER NOT NULL,
            percentage REAL NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS scam_scenarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            category TEXT NOT NULL,
            channel TEXT NOT NULL,
            sender TEXT NOT NULL,
            message_text TEXT NOT NULL,
            is_scam INTEGER NOT NULL CHECK(is_scam IN (0, 1)),
            highlighted_phrases_json TEXT NOT NULL,
            red_flags_json TEXT NOT NULL,
            explanation TEXT NOT NULL,
            prevention TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS module_progress (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            session_id TEXT NOT NULL,
            module_slug TEXT NOT NULL,
            completed INTEGER NOT NULL DEFAULT 1,
            completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(session_id, module_slug)
        );

        CREATE TABLE IF NOT EXISTS checklist_progress (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            session_id TEXT NOT NULL,
            item_key TEXT NOT NULL,
            is_checked INTEGER NOT NULL DEFAULT 0,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(session_id, item_key)
        );

        CREATE TABLE IF NOT EXISTS feedback_submissions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT,
            category TEXT NOT NULL CHECK(category IN ('feedback', 'scam_report')),
            message TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        """
    )

    conn.commit()
    conn.close()