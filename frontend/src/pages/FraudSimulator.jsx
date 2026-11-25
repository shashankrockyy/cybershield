import React, { useState } from 'react';
import { Gamepad2, ShieldAlert, CheckCircle, RotateCcw, Trophy } from 'lucide-react';

const SIMULATOR_LEVELS = [
  {
    id: 1,
    badge: 'Level 1 • OLX Marketplace Trap',
    character: 'Army Officer Buyer (Fake Profile)',
    message: '"Hello ji, I am posted at border and want to buy your study table for ₹6,000 right now. I am sending a QR code—scan it and enter your UPI PIN to receive ₹6,000 directly into your bank!"',
    choices: [
      { text: 'Scan QR & enter UPI PIN to claim ₹6,000', safe: false, outcome: 'TRAP TRIGGERED! ₹6,000 was deducted from your account instead of received. Entering a UPI PIN always sends money.' },
      { text: 'Refuse & say: "Send directly to my UPI ID/number, I will not scan any QR"', safe: true, outcome: 'NICE BLOCK! The scammer immediately disconnected because they knew you caught the QR trick.' },
      { text: 'Send ₹1 first to test if the QR works', safe: false, outcome: 'TRAP TRIGGERED! Once you engage and trust the flow, the scammer sends a ₹6,000 collect request disguised as a refund.' }
    ]
  },
  {
    id: 2,
    badge: 'Level 2 • Midnight Power Cut Panic',
    character: 'SMS from +91-91234XXXXX',
    message: '"URGENT: Your electricity connection will be disconnected tonight at 10:30 PM due to unpaid bill. Call our officer immediately at 91234XXXXX and download QuickSupport app."',
    choices: [
      { text: 'Call the number & install QuickSupport so power stays on', safe: false, outcome: 'HACKED! QuickSupport gave the scammer live screen-mirroring access to read your bank OTPs.' },
      { text: 'Ignore the SMS & check your official BESCOM/electricity board app', safe: true, outcome: 'SMART MOVE! Your official app showed ₹0 due. Real power boards never ask you to install remote-control apps.' }
    ]
  },
  {
    id: 3,
    badge: 'Level 3 • Fake Courier & "Digital Arrest"',
    character: 'Video Call: "Mumbai Cyber Narcotics"',
    message: '"A FedEx parcel to Taiwan with your Aadhaar number contains illegal passports. You are under Digital Arrest! Do not hang up or tell your family, transfer ₹45,000 to RBI Safe Account for verification."',
    choices: [
      { text: 'Stay on video call & transfer ₹45,000 to clear your name', safe: false, outcome: 'SCAMMED! There is no such thing as "Digital Arrest" or an "RBI Safe Verification Account".' },
      { text: 'Hang up immediately, block the caller & report on 1930', safe: true, outcome: 'BOSS LEVEL! You recognized the "Digital Arrest" script immediately and saved your savings.' }
    ]
  },
  {
    id: 4,
    badge: 'Level 4 • Free concert / IPL Ticket Link',
    character: 'Forwarded WhatsApp Group Message',
    message: '"FREE IPL Final VIP Pass Giveaway! Only 12 passes left! Login with your Instagram/Gmail password at http://ipl-vip-tickets-free.xyz to claim!"',
    choices: [
      { text: 'Login with Gmail password to grab the free ticket', safe: false, outcome: 'ACCOUNT STOLEN! That .xyz page was a credential harvester that hijacked your email and messaged all your contacts.' },
      { text: 'Never enter real passwords on giveaway links; delete the forward', safe: true, outcome: 'CLEAN DEFENSE! You avoided credential phishing and kept your accounts safe.' }
    ]
  },
  {
    id: 5,
    badge: 'Level 5 • Part-Time YouTube Like Task',
    character: 'Telegram Recruiter "Priya HR"',
    message: '"Congrats! You earned ₹300 for liking 3 videos! Now choose Prepaid Merchant Task: Deposit ₹5,000 and get ₹7,500 back in 10 minutes!"',
    choices: [
      { text: 'Invest ₹5,000 since they already paid ₹300 earlier', safe: false, outcome: 'FROZEN! The initial ₹300 was bait. Once you paid ₹5,000, they demanded ₹25,000 more to "unlock" your money.' },
      { text: 'Block the Telegram group — real jobs never ask employees to pay money', safe: true, outcome: 'VICTORY! You walked away unscathed without falling for the sunk-cost task trap.' }
    ]
  },
  {
    id: 6,
    badge: 'Level 6 • Friend Emergency on WhatsApp',
    character: 'Your Best Friend’s WhatsApp Number',
    message: '"Bro urgent!! Met with minor bike accident, hospital asking ₹12,000 advance right now. My UPI not working, send to this nurse QR code fast, will return tonight!"',
    choices: [
      { text: 'Send ₹12,000 right away without calling so you don’t delay treatment', safe: false, outcome: 'IMPERSONATION SCAM! Your friend’s WhatsApp was hacked, and the QR belonged to a fraudster.' },
      { text: 'Call your friend directly on a normal voice call to verify first', safe: true, outcome: 'HERO SAVE! Your friend answered from home completely fine and thanked you for alerting them that their WhatsApp was hacked!' }
    ]
  }
];

export default function FraudSimulator() {
  const [step, setStep] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = SIMULATOR_LEVELS[step];

  const handleChoose = (choice) => {
    if (selectedChoice) return;
    setSelectedChoice(choice);
    if (choice.safe) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (step + 1 < SIMULATOR_LEVELS.length) {
      setStep((s) => s + 1);
      setSelectedChoice(null);
    } else {
      setFinished(true);
    }
  };

  const restart = () => {
    setStep(0);
    setSelectedChoice(null);
    setScore(0);
    setFinished(false);
  };

  return (
    <div style={{ maxWidth: '820px', margin: '0 auto', padding: '1.5rem' }}>
      <div className="card" style={{ padding: '1.5rem', marginBottom: '1.25rem' }}>
        <h1 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.55rem' }}>
          <Gamepad2 color="#38bdf8" /> Interactive Scam & Play Simulator
        </h1>
        <p style={{ margin: '0.35rem 0 0', opacity: 0.85 }}>
          Roleplay 6 real-world cyber traps and see what happens based on your choices • Safe Decisions: {score} / {SIMULATOR_LEVELS.length}
        </p>
      </div>

      {!finished ? (
        <div className="card" style={{ padding: '1.75rem' }}>
          <div style={{ fontSize: '0.85rem', color: '#38bdf8', fontWeight: 'bold', marginBottom: '0.4rem' }}>
            {current.badge}
          </div>
          <div style={{ fontWeight: 'bold', marginBottom: '0.75rem' }}>Incoming From: {current.character}</div>

          <div style={{ padding: '1rem', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', borderLeft: '4px solid #38bdf8', marginBottom: '1.25rem', lineHeight: 1.5 }}>
            {current.message}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {current.choices.map((ch, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleChoose(ch)}
                style={{
                  textAlign: 'left',
                  padding: '0.9rem 1rem',
                  borderRadius: '10px',
                  border: selectedChoice === ch ? `2px solid ${ch.safe ? '#22c55e' : '#ef4444'}` : '1px solid rgba(255,255,255,0.2)',
                  cursor: 'pointer'
                }}
              >
                {ch.text}
              </button>
            ))}
          </div>

          {selectedChoice && (
            <div
              style={{
                marginTop: '1.25rem',
                padding: '1rem',
                borderRadius: '10px',
                border: `1px solid ${selectedChoice.safe ? '#22c55e' : '#ef4444'}`,
                background: selectedChoice.safe ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', marginBottom: '0.35rem' }}>
                {selectedChoice.safe ? <CheckCircle color="#22c55e" size={19} /> : <ShieldAlert color="#ef4444" size={19} />}
                <span>{selectedChoice.outcome}</span>
              </div>
              <button type="button" onClick={handleNext} style={{ marginTop: '0.6rem', padding: '0.55rem 1.1rem', fontWeight: 'bold' }}>
                {step + 1 < SIMULATOR_LEVELS.length ? 'Next Level →' : 'See Final Rank'}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
          <Trophy size={52} color="#38bdf8" style={{ margin: '0 auto 0.5rem' }} />
          <h2>Simulation Complete!</h2>
          <p style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#38bdf8' }}>
            You survived {score} out of {SIMULATOR_LEVELS.length} scam traps!
          </p>
          <button type="button" onClick={restart} style={{ marginTop: '1rem', padding: '0.7rem 1.25rem', display: 'inline-flex', alignItems: 'center', gap: '0.45rem', fontWeight: 'bold' }}>
            <RotateCcw size={17} /> Play Again
          </button>
        </div>
      )}
    </div>
  );
}