import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle,
  XCircle,
  Award,
  RotateCcw,
  ShieldAlert,
  BookOpen,
  ExternalLink,
  HelpCircle,
  ArrowRight
} from 'lucide-react';

const QUIZ_QUESTIONS = [
  {
    id: 1,
    category: 'UPI & Banking',
    question: "You receive a call claiming to be from your bank's KYC department asking for a 6-digit OTP to prevent your account from being blocked. What should you do?",
    options: [
      'Share the OTP immediately so your account stays active',
      'Refuse to share the OTP and disconnect the call immediately',
      'Read out only the first 3 digits to verify identity',
      'Forward the OTP SMS to the caller’s WhatsApp number'
    ],
    correct: 1,
    explanation: 'Banks never call asking for your OTP, PIN, or CVV. Sharing an OTP authorizes scammers to drain your account.',
    tip: 'Enable transaction alerts and never read out SMS codes to anyone over phone or screen-share.'
  },
  {
    id: 2,
    category: 'Phishing Links',
    question: "You get an SMS: 'Congratulations! You won an iPhone 16 Pro. Click http://amaz0n-gifts-claim.xyz to claim within 10 minutes.' Which red flag proves this is a scam?",
    options: [
      'The message uses polite English',
      'Misspelled domain name (amaz0n with a zero), .xyz extension, and artificial 10-minute urgency',
      'It was sent during daytime hours',
      'It mentions a popular smartphone brand'
    ],
    correct: 1,
    explanation: 'Typosquatted domains (amaz0n instead of amazon.in) combined with fake countdown urgency are classic credential-harvesting phishing traps.',
    tip: 'Always check the exact domain spelling before tapping any shortened or unfamiliar link.'
  },
  {
    id: 3,
    category: 'QR Code Fraud',
    question: "A buyer on OLX sends you a QR code and says 'Scan this and enter your UPI PIN to receive ₹5,000.' What is the golden rule of UPI?",
    options: [
      'Scan and enter the PIN to accept the payment',
      'Refuse immediately — entering a UPI PIN only deducts money, never receives it',
      'Ask them to send ₹1 first to test the QR code',
      'Share your debit card expiry date instead'
    ],
    correct: 1,
    explanation: 'You NEVER need to scan a QR code or enter your UPI PIN to receive money into your bank account.',
    tip: 'Whenever a UPI app prompts for your 4- or 6-digit PIN, money is leaving your account.'
  },
  {
    id: 4,
    category: 'Utility & Remote Access',
    question: "You receive an SMS: 'Your electricity power will be disconnected tonight at 9:30 PM because previous bill was not updated. Call 98XXXXXXX immediately.' What is the safest action?",
    options: [
      'Call the personal mobile number in the SMS and pay quickly',
      'Download AnyDesk or TeamViewer if the caller asks to help update your bill',
      'Ignore the SMS and verify your bill status directly on the official electricity board app',
      'Reply with your consumer number and UPI ID'
    ],
    correct: 2,
    explanation: 'Electricity boards never send disconnection threats from 10-digit personal mobile numbers or ask you to install screen-sharing apps.',
    tip: 'Never install AnyDesk, QuickSupport, or TeamViewer on instructions from an unknown caller.'
  },
  {
    id: 5,
    category: 'Digital Arrest Scam',
    question: "Someone posing as a 'CBI / Cyber Crime Police Officer' on a WhatsApp video call claims a parcel with illegal items was found in your name and puts you under 'Digital Arrest'. What is the truth?",
    options: [
      'Stay on the video call and transfer money to prove innocence',
      'Hang up immediately — Indian police never conduct "Digital Arrests" or demand money over video calls',
      'Send photos of your Aadhaar card and bank passbook on WhatsApp',
      'Keep your camera on for 24 hours as instructed'
    ],
    correct: 1,
    explanation: '"Digital Arrest" does not exist under Indian law. Law enforcement never interrogates or demands bail/verification funds over WhatsApp or Skype.',
    tip: 'Disconnect immediately and report the caller number on cybercrime.gov.in or call 1930.'
  },
  {
    id: 6,
    category: 'Social Engineering',
    question: "You get a WhatsApp message from a friend's number asking for ₹15,000 urgently for a hospital emergency, with a QR code under a stranger's name. What should you do?",
    options: [
      'Transfer the money immediately to help your friend',
      'Call your friend directly on their normal phone number to verify before sending anything',
      'Send half the amount first',
      'Ask for a photo of the hospital bill on WhatsApp'
    ],
    correct: 1,
    explanation: 'Scammers hijack WhatsApp accounts via SIM-swap or OTP tricks and message contacts for emergency money.',
    tip: 'Always verify urgent money requests via a separate voice call.'
  },
  {
    id: 7,
    category: 'Password Security',
    question: 'Which password provides the strongest protection against automated brute-force attacks?',
    options: [
      'Dedeepya@2026',
      '1234567890',
      'M0nsoon#FilterCoffee!89',
      'qwerty@123'
    ],
    correct: 2,
    explanation: 'Long passphrases (16+ characters) combining unrelated words, uppercase/lowercase letters, numbers, and symbols take centuries to crack.',
    tip: 'Use a unique passphrase for every important account and turn on Two-Factor Authentication (2FA).'
  },
  {
    id: 8,
    category: 'Public Wi-Fi Safety',
    question: 'You are connected to free public Wi-Fi at a railway station or café. Which activity should you avoid until you switch back to mobile data?',
    options: [
      'Checking train arrival timings',
      'Logging into net banking or making UPI/card transactions without a VPN',
      'Reading online news articles',
      'Checking the weather forecast'
    ],
    correct: 1,
    explanation: 'Unencrypted public Wi-Fi hotspots allow attackers on the same network to intercept login sessions (Man-in-the-Middle attacks).',
    tip: 'Switch to 4G/5G mobile data whenever accessing banking or financial apps.'
  },
  {
    id: 9,
    category: 'Part-Time Job Scams',
    question: "A Telegram group offers ₹3,000/day for liking YouTube videos, and after paying you ₹150 initially, asks you to deposit ₹10,000 into a 'VIP task' to unlock higher returns. What is this?",
    options: [
      'A legitimate remote internship',
      'A prepaid task/investment scam designed to steal your deposit once you invest larger amounts',
      'A government skill-development scheme',
      'A safe cryptocurrency staking plan'
    ],
    correct: 1,
    explanation: 'Task scammers pay small amounts upfront to build trust, then freeze your account once you deposit thousands into fake "VIP tasks".',
    tip: 'Legitimate employers never ask candidates to pay money to earn salary or unlock tasks.'
  },
  {
    id: 10,
    category: 'Incident Response',
    question: 'If money is fraudulently debited from your bank account via a cyber scam, what is the single fastest national helpline number in India to freeze the funds?',
    options: [
      '100',
      '1930 (National Cyber Crime Helpline)',
      '108',
      '1800-111-000'
    ],
    correct: 1,
    explanation: 'Calling 1930 (or reporting on cybercrime.gov.in) within the "Golden Hour" lets banks put a lien on the scammer’s account before cash is withdrawn.',
    tip: 'Save 1930 in your contacts and keep your transaction UTR/reference number handy.'
  }
];

export default function CyberQuiz() {
  const navigate = useNavigate();
  const [quizType, setQuizType] = useState('Pre-Assessment');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const [bookmarkIds, setBookmarkIds] = useState([]);
  const [saveStatus, setSaveStatus] = useState('');

  const currentQuestion = QUIZ_QUESTIONS[currentIndex];
  const selectedOption = answers[currentQuestion.id];
  const isAnswered = selectedOption !== undefined;

  const handleSelectOption = (optionIndex) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionIndex }));
    setShowTip(false);
  };

  const toggleBookmark = (id) => {
    setBookmarkIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (answers[q.id] === q.correct) score += 1;
    });
    return score;
  };

  const handleSubmitQuiz = async () => {
    setSubmitted(true);
    const score = calculateScore();
    try {
      const res = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quiz_type: quizType,
          score,
          total: QUIZ_QUESTIONS.length
        })
      });
      if (res.ok) {
        setSaveStatus('Score saved to your CyberShield progress database!');
      } else {
        setSaveStatus('Quiz completed! (Start Flask backend to sync score to SQLite.)');
      }
    } catch {
      setSaveStatus('Quiz completed! (Offline mode — score calculated locally.)');
    }
  };

  const handleResetQuiz = () => {
    setAnswers({});
    setSubmitted(false);
    setShowReview(false);
    setShowTip(false);
    setSaveStatus('');
    setCurrentIndex(0);
  };

  const score = calculateScore();
  const answeredCount = Object.keys(answers).length;
  const percentage = Math.round((score / QUIZ_QUESTIONS.length) * 100);

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', padding: '1.5rem' }}>
      {/* Header & Mode Switcher */}
      <div className="card" style={{ padding: '1.5rem', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.6rem' }}>Cyber Safety Awareness Quiz</h1>
            <p style={{ margin: '0.35rem 0 0', opacity: 0.8 }}>
              10 real-world scenarios • Answered: {answeredCount} / {QUIZ_QUESTIONS.length}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {['Pre-Assessment', 'Post-Assessment'].map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => {
                  setQuizType(mode);
                  handleResetQuiz();
                }}
                style={{
                  padding: '0.5rem 0.9rem',
                  fontWeight: 'bold',
                  opacity: quizType === mode ? 1 : 0.65,
                  border: quizType === mode ? '2px solid #38bdf8' : '1px solid rgba(255,255,255,0.2)'
                }}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Question Navigator Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginTop: '1rem' }}>
          {QUIZ_QUESTIONS.map((q, idx) => {
            const done = answers[q.id] !== undefined;
            const active = idx === currentIndex;
            return (
              <button
                key={q.id}
                type="button"
                onClick={() => {
                  setCurrentIndex(idx);
                  setShowTip(false);
                }}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  border: active ? '2px solid #38bdf8' : '1px solid rgba(255,255,255,0.2)',
                  background: done ? 'rgba(56, 189, 248, 0.25)' : 'transparent',
                  cursor: 'pointer'
                }}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Question Card */}
      {!submitted ? (
        <div className="card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: '#38bdf8', fontWeight: 'bold' }}>
              Question {currentIndex + 1} of {QUIZ_QUESTIONS.length} • {currentQuestion.category}
            </span>
            <button
              type="button"
              onClick={() => toggleBookmark(currentQuestion.id)}
              style={{ padding: '0.35rem 0.75rem', fontSize: '0.85rem' }}
            >
              {bookmarkIds.includes(currentQuestion.id) ? '★ Saved for Revision' : '☆ Bookmark Question'}
            </button>
          </div>

          <h2 style={{ fontSize: '1.2rem', lineHeight: 1.5, marginBottom: '1.25rem' }}>
            {currentQuestion.question}
          </h2>

          {/* Answer Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(idx)}
                  style={{
                    textAlign: 'left',
                    padding: '0.95rem 1.1rem',
                    borderRadius: '10px',
                    border: isSelected ? '2px solid #38bdf8' : '1px solid rgba(255,255,255,0.18)',
                    background: isSelected ? 'rgba(56, 189, 248, 0.18)' : 'rgba(255,255,255,0.03)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}
                >
                  <span style={{ fontWeight: 'bold', minWidth: '24px' }}>
                    {String.fromCharCode(65 + idx)}.
                  </span>
                  <span>{option}</span>
                </button>
              );
            })}
          </div>

          {/* Extra Options Available Right After Selecting an Option */}
          {isAnswered && (
            <div
              style={{
                marginTop: '1.25rem',
                padding: '1rem',
                borderRadius: '10px',
                background: 'rgba(56, 189, 248, 0.08)',
                border: '1px solid rgba(56, 189, 248, 0.3)'
              }}
            >
              <div style={{ fontSize: '0.9rem', marginBottom: '0.65rem', fontWeight: 'bold' }}>
                Option {String.fromCharCode(65 + selectedOption)} selected — Quick Actions:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                <button
                  type="button"
                  onClick={() => setShowTip((prev) => !prev)}
                  style={{ padding: '0.45rem 0.85rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <HelpCircle size={15} />
                  {showTip ? 'Hide Safety Hint' : 'Show Safety Hint'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const updated = { ...answers };
                    delete updated[currentQuestion.id];
                    setAnswers(updated);
                    setShowTip(false);
                  }}
                  style={{ padding: '0.45rem 0.85rem', fontSize: '0.85rem' }}
                >
                  Clear Selection
                </button>

                {currentIndex < QUIZ_QUESTIONS.length - 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentIndex((prev) => prev + 1);
                      setShowTip(false);
                    }}
                    style={{ padding: '0.45rem 0.85rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                  >
                    Save & Next Question <ArrowRight size={15} />
                  </button>
                )}
              </div>

              {showTip && (
                <p style={{ marginTop: '0.75rem', marginBottom: 0, fontSize: '0.9rem', color: '#7dd3fc' }}>
                  <strong>Safety Hint:</strong> {currentQuestion.tip}
                </p>
              )}
            </div>
          )}

          {/* Previous / Next / Submit Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', gap: '0.75rem' }}>
            <button
              type="button"
              disabled={currentIndex === 0}
              onClick={() => {
                setCurrentIndex((prev) => prev - 1);
                setShowTip(false);
              }}
              style={{ padding: '0.65rem 1.1rem', opacity: currentIndex === 0 ? 0.45 : 1 }}
            >
              ← Previous
            </button>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {currentIndex < QUIZ_QUESTIONS.length - 1 ? (
                <button
                  type="button"
                  onClick={() => {
                    setCurrentIndex((prev) => prev + 1);
                    setShowTip(false);
                  }}
                  style={{ padding: '0.65rem 1.2rem', fontWeight: 'bold' }}
                >
                  Next →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmitQuiz}
                  style={{
                    padding: '0.7rem 1.4rem',
                    fontWeight: 'bold',
                    background: '#0284c7',
                    color: '#fff',
                    borderRadius: '8px'
                  }}
                >
                  Submit {quizType}
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Results & Extra Post-Submission Action Options */
        <div className="card" style={{ padding: '2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <Award size={52} color="#38bdf8" style={{ margin: '0 auto 0.5rem' }} />
            <h2 style={{ margin: 0 }}>{quizType} Completed!</h2>
            <p style={{ fontSize: '1.4rem', fontWeight: 'bold', margin: '0.5rem 0', color: '#38bdf8' }}>
              Your Score: {score} / {QUIZ_QUESTIONS.length} ({percentage}%)
            </p>
            <p style={{ opacity: 0.85, margin: 0 }}>
              {percentage >= 80
                ? 'Excellent cyber awareness! You spotted almost every scam tactic.'
                : percentage >= 50
                ? 'Good start! Review the explanations below to catch subtle phishing and UPI traps.'
                : 'High risk detected — review the explanations below and practice in the Fraud Simulator.'}
            </p>
            {saveStatus && (
              <p style={{ marginTop: '0.65rem', fontSize: '0.88rem', color: '#4ade80' }}>
                {saveStatus}
              </p>
            )}
          </div>

          {/* Extra Options Panel After Submitting */}
          <div
            style={{
              padding: '1.25rem',
              borderRadius: '12px',
              background: 'rgba(56, 189, 248, 0.08)',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              marginBottom: '1.5rem'
            }}
          >
            <h3 style={{ marginTop: 0, marginBottom: '0.85rem', fontSize: '1.05rem' }}>
              Choose Your Next Action:
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => setShowReview((prev) => !prev)}
                style={{ padding: '0.65rem 1rem', display: 'flex', alignItems: 'center', gap: '0.45rem', fontWeight: 'bold' }}
              >
                <BookOpen size={17} />
                {showReview ? 'Hide Answer Explanations' : 'Review All 10 Answers & Explanations'}
              </button>

              <button
                type="button"
                onClick={handleResetQuiz}
                style={{ padding: '0.65rem 1rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}
              >
                <RotateCcw size={17} />
                Retake Quiz
              </button>

              <button
                type="button"
                onClick={() => {
                  setQuizType(quizType === 'Pre-Assessment' ? 'Post-Assessment' : 'Pre-Assessment');
                  handleResetQuiz();
                }}
                style={{ padding: '0.65rem 1rem' }}
              >
                Switch to {quizType === 'Pre-Assessment' ? 'Post-Assessment' : 'Pre-Assessment'}
              </button>

              <button
                type="button"
                onClick={() => navigate('/simulator')}
                style={{ padding: '0.65rem 1rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}
              >
                <ExternalLink size={17} />
                Try Live Scam Simulator
              </button>

              <button
                type="button"
                onClick={() => navigate('/emergency')}
                style={{ padding: '0.65rem 1rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}
              >
                <ShieldAlert size={17} />
                1930 Emergency Helpline Guide
              </button>

              <button
                type="button"
                onClick={() => navigate('/progress')}
                style={{ padding: '0.65rem 1rem' }}
              >
                View My Progress Dashboard
              </button>
            </div>
          </div>

          {/* Detailed Review Breakdown */}
          {showReview && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {QUIZ_QUESTIONS.map((q, idx) => {
                const userAns = answers[q.id];
                const isCorrect = userAns === q.correct;
                return (
                  <div
                    key={q.id}
                    style={{
                      padding: '1rem',
                      borderRadius: '10px',
                      border: `1px solid ${isCorrect ? '#22c55e' : '#ef4444'}`,
                      background: isCorrect ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.08)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', marginBottom: '0.4rem' }}>
                      {isCorrect ? <CheckCircle size={18} color="#22c55e" /> : <XCircle size={18} color="#ef4444" />}
                      <span>
                        Q{idx + 1}. {q.question}
                      </span>
                    </div>
                    <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                      <strong>Your Answer:</strong>{' '}
                      {userAns !== undefined ? q.options[userAns] : 'Not answered'}
                    </p>
                    {!isCorrect && (
                      <p style={{ margin: '0.25rem 0', fontSize: '0.9rem', color: '#4ade80' }}>
                        <strong>Correct Answer:</strong> {q.options[q.correct]}
                      </p>
                    )}
                    <p style={{ margin: '0.4rem 0 0', fontSize: '0.88rem', opacity: 0.9 }}>
                      <strong>Why:</strong> {q.explanation}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}