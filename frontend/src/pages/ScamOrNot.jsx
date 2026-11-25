import React, { useState, useEffect } from 'react';
import { ShieldAlert, CheckCircle, XCircle, RotateCcw, MessageSquareWarning } from 'lucide-react';

const FALLBACK_SCENARIOS = [
  {
    id: 1,
    type: 'SMS',
    sender: 'VM-HDFCBK-ALERT',
    content: 'Dear Customer, your KYC is expiring today. Update immediately at http://hdfc-kyc-update99.xyz or your account will be suspended.',
    isScam: true,
    explanation: 'Banks never send .xyz links or threaten immediate same-day suspension via SMS.'
  },
  {
    id: 2,
    type: 'WhatsApp',
    sender: '+91 98210-XXXXX',
    content: 'Hi! I accidentally sent ₹2,000 to your UPI ID by mistake. Please scan this QR code and enter your PIN to refund it quickly.',
    isScam: true,
    explanation: 'Entering a UPI PIN on a QR code sends money out of your account—never refunds it.'
  },
  {
    id: 3,
    type: 'Email',
    sender: 'no-reply@accounts.google.com',
    content: 'Security alert: A new sign-in was detected on Windows. If this was you, you do not need to do anything. Otherwise, visit myaccount.google.com.',
    isScam: false,
    explanation: 'Legitimate domain (accounts.google.com), no forced link click, and no request for passwords or OTPs.'
  },
  {
    id: 4,
    type: 'Video Call',
    sender: 'CBI Cyber Cell HQ',
    content: 'Your Aadhaar was used to ship an illegal parcel to Mumbai. Stay on Skype video call under "Digital Arrest" and transfer ₹50,000 for RBI verification.',
    isScam: true,
    explanation: '"Digital Arrest" does not exist in Indian law. Police never demand money over video calls.'
  },
  {
    id: 5,
    type: 'Official App Alert',
    sender: 'UIDAI / mAadhaar',
    content: 'Your Aadhaar biometric lock has been enabled successfully. You can unlock it anytime using the official mAadhaar app or myaadhaar.uidai.gov.in.',
    isScam: false,
    explanation: 'Informational confirmation referencing only the official .gov.in portal with zero sensitive data requests.'
  },
  {
    id: 6,
    type: 'Telegram',
    sender: 'HR_Amazon_WorkFromHome',
    content: 'Earn ₹4,500/day liking YouTube videos! Complete 3 tasks and deposit ₹5,000 in our VIP merchant account to unlock ₹12,000 commission.',
    isScam: true,
    explanation: 'Classic prepaid task scam—real jobs never ask you to deposit money to withdraw earnings.'
  }
];

export default function ScamOrNot() {
  const [scenarios, setScenarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    fetch('/api/scam-or-not')
      .then((res) => {
        if (!res.ok) throw new Error('Backend route not found');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setScenarios(data);
        } else {
          setScenarios(FALLBACK_SCENARIOS);
        }
      })
      .catch(() => {
        setScenarios(FALLBACK_SCENARIOS);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ maxWidth: '780px', margin: '2rem auto', padding: '1.5rem', textAlign: 'center' }}>
        Loading scenarios...
      </div>
    );
  }

  const current = scenarios[currentIndex];

  const handleGuess = (guessIsScam) => {
    if (userAnswer !== null) return;
    setUserAnswer(guessIsScam);
    if (guessIsScam === current.isScam) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < scenarios.length) {
      setCurrentIndex((prev) => prev + 1);
      setUserAnswer(null);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setUserAnswer(null);
    setScore(0);
    setFinished(false);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1.5rem' }}>
      <div className="card" style={{ padding: '1.5rem', marginBottom: '1.25rem' }}>
        <h1 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.55rem' }}>
          <MessageSquareWarning color="#38bdf8" /> Scam or Not? Challenge
        </h1>
        <p style={{ margin: '0.35rem 0 0', opacity: 0.85 }}>
          Inspect real-world messages, calls, and alerts • Score: {score} / {scenarios.length}
        </p>
      </div>

      {!finished ? (
        <div className="card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: '#38bdf8', fontWeight: 'bold' }}>
              Scenario {currentIndex + 1} of {scenarios.length} • {current.type}
            </span>
            <span style={{ fontSize: '0.82rem', opacity: 0.75 }}>From: {current.sender}</span>
          </div>

          <div
            style={{
              padding: '1.15rem',
              borderRadius: '10px',
              background: 'rgba(255,255,255,0.05)',
              borderLeft: '4px solid #38bdf8',
              fontSize: '1.02rem',
              lineHeight: 1.55,
              marginBottom: '1.35rem'
            }}
          >
            "{current.content}"
          </div>

          <div style={{ display: 'flex', gap: '0.9rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => handleGuess(true)}
              style={{
                flex: 1,
                padding: '0.8rem',
                fontWeight: 'bold',
                border: userAnswer === true ? '2px solid #ef4444' : undefined
              }}
            >
              🚨 It's a SCAM
            </button>
            <button
              type="button"
              onClick={() => handleGuess(false)}
              style={{
                flex: 1,
                padding: '0.8rem',
                fontWeight: 'bold',
                border: userAnswer === false ? '2px solid #22c55e' : undefined
              }}
            >
              ✅ Safe / Legitimate
            </button>
          </div>

          {userAnswer !== null && (
            <div
              style={{
                marginTop: '1.25rem',
                padding: '1rem',
                borderRadius: '10px',
                border: `1px solid ${userAnswer === current.isScam ? '#22c55e' : '#ef4444'}`,
                background: userAnswer === current.isScam ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', marginBottom: '0.35rem' }}>
                {userAnswer === current.isScam ? (
                  <>
                    <CheckCircle color="#22c55e" size={19} />
                    <span>Spot on! This is {current.isScam ? 'a SCAM' : 'LEGITIMATE'}.</span>
                  </>
                ) : (
                  <>
                    <XCircle color="#ef4444" size={19} />
                    <span>Watch out! This is actually {current.isScam ? 'a SCAM' : 'LEGITIMATE'}.</span>
                  </>
                )}
              </div>
              <p style={{ margin: '0.3rem 0 0.85rem', fontSize: '0.92rem', opacity: 0.92 }}>
                {current.explanation}
              </p>
              <button type="button" onClick={handleNext} style={{ padding: '0.55rem 1.15rem', fontWeight: 'bold' }}>
                {currentIndex + 1 < scenarios.length ? 'Next Scenario →' : 'View Final Score'}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
          <ShieldAlert size={48} color="#38bdf8" style={{ margin: '0 auto 0.5rem' }} />
          <h2>Challenge Completed!</h2>
          <p style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#38bdf8' }}>
            You identified {score} out of {scenarios.length} scenarios correctly!
          </p>
          <button
            type="button"
            onClick={handleRestart}
            style={{
              marginTop: '1rem',
              padding: '0.7rem 1.25rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontWeight: 'bold'
            }}
          >
            <RotateCcw size={17} /> Play Again
          </button>
        </div>
      )}
    </div>
  );
}