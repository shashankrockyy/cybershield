import React, { useState } from 'react';
import { Receipt, CheckCircle, XCircle, RotateCcw } from 'lucide-react';

const PAYMENT_CASES = [
  {
    id: 1,
    title: 'Case 1: Shop Counter UPI Payment',
    app: 'GPay / PhonePe Receipt',
    amount: '₹2,450.00',
    status: 'Paid to Merchant • 11:42 PM',
    utr: 'UPI Ref: 632189451022',
    clue: 'Customer shows a screenshot on their phone, but your shop soundbox did not announce the payment and your bank SMS did not arrive. Notice the font of "₹2,450.00" is slightly misaligned and pasted over a ₹24.50 receipt.',
    isFake: true,
    reason: 'Edited amount font & zero confirmation on merchant soundbox/bank app—classic Fake UPI Spoof App receipt.'
  },
  {
    id: 2,
    title: 'Case 2: Instant Bank Credit Verification',
    app: 'BHIM / Bank Passbook Entry',
    amount: '₹1,200.00',
    status: 'Credited to A/C XX4891',
    utr: 'UTR: 632199804312',
    clue: 'You opened your own banking/UPI app independently and verified the ₹1,200 credit entry with a valid 12-digit UTR number.',
    isFake: false,
    reason: 'Verified directly inside your own banking app rather than trusting a screenshot on the sender’s phone.'
  },
  {
    id: 3,
    title: 'Case 3: "Payment Processing / Pending" Screenshot',
    app: 'Paytm Spoof Screen',
    amount: '₹8,500.00',
    status: 'Payment Processing... (Will credit in 24 hrs)',
    utr: 'Ref: N/A',
    clue: 'A buyer buying an old phone shows a yellow "Processing" screen with no UTR number and insists on taking the phone now because "server is slow".',
    isFake: true,
    reason: 'UPI is instant. Fake payment apps display fake "Processing" animations with missing UTR IDs to walk away with goods before you notice.'
  },
  {
    id: 4,
    title: 'Case 4: Fake "Money Received" SMS from 10-Digit Mobile Number',
    app: 'SMS Inbox',
    amount: '₹15,000.00',
    status: 'Credited Rs 15000.00 to your SBI A/c',
    utr: 'Sender: +91-88901XXXXX',
    clue: 'The SMS says ₹15,000 is credited, but the sender is a regular 10-digit mobile number instead of an official bank header like VM-SBIUPI.',
    isFake: true,
    reason: 'Banks never send transaction alerts from personal 10-digit mobile numbers.'
  },
  {
    id: 5,
    title: 'Case 5: UPI Collect Request Disguised as Cashback',
    app: 'UPI Notification',
    amount: '₹4,999.00',
    status: 'Request from: Amazon_Cashback_Team@ybl — "Enter PIN to Claim"',
    utr: 'Collect Request',
    clue: 'The screen asks you to click "Pay" and enter your 6-digit UPI PIN to claim a ₹4,999 reward.',
    isFake: true,
    reason: 'Any screen asking you to click "Pay" and enter your UPI PIN is pulling money OUT of your account.'
  },
  {
    id: 6,
    title: 'Case 6: Official Bank Header + Live Statement Match',
    app: 'Official Bank SMS (AX-ICICIB) + App',
    amount: '₹3,100.00',
    status: 'Acct XX902 credited with Rs 3,100.00 via UPI',
    utr: 'UPI Ref: 632200194821',
    clue: 'Sender ID uses an official DLT bank header (AX-ICICIB) and your account balance visibly increased by ₹3,100.',
    isFake: false,
    reason: 'Official DLT sender header plus real balance increase in your own bank account confirms the payment is genuine.'
  }
];

export default function FakePayment() {
  const [index, setIndex] = useState(0);
  const [guess, setGuess] = useState(null);
  const [score, setScore] = useState(0);

  const item = PAYMENT_CASES[index];

  const handleGuess = (val) => {
    if (guess !== null) return;
    setGuess(val);
    if (val === item.isFake) setScore((s) => s + 1);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1.5rem' }}>
      <div className="card" style={{ padding: '1.5rem', marginBottom: '1.25rem' }}>
        <h1 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.55rem' }}>
          <Receipt color="#38bdf8" /> Spot the Fake Payment Screenshot
        </h1>
        <p style={{ margin: '0.35rem 0 0', opacity: 0.85 }}>
          Inspect 6 payment receipts & alerts to separate genuine credits from spoof apps • Score: {score} / {PAYMENT_CASES.length}
        </p>
      </div>

      <div className="card" style={{ padding: '1.75rem' }}>
        <div style={{ fontSize: '0.85rem', color: '#38bdf8', fontWeight: 'bold' }}>
          {item.title} ({index + 1} of {PAYMENT_CASES.length})
        </div>

        {/* Simulated Receipt Card */}
        <div style={{ margin: '1rem 0', padding: '1.25rem', borderRadius: '12px', background: 'rgba(15, 23, 42, 0.75)', border: '1px dashed rgba(56,189,248,0.45)' }}>
          <div style={{ fontSize: '0.85rem', opacity: 0.75 }}>{item.app}</div>
          <div style={{ fontSize: '1.85rem', fontWeight: 'bold', margin: '0.35rem 0', color: '#38bdf8' }}>{item.amount}</div>
          <div style={{ fontWeight: 'bold' }}>{item.status}</div>
          <div style={{ fontSize: '0.85rem', opacity: 0.75, marginTop: '0.25rem' }}>{item.utr}</div>
          <p style={{ marginTop: '0.85rem', marginBottom: 0, fontSize: '0.92rem', lineHeight: 1.5 }}>{item.clue}</p>
        </div>

        <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => handleGuess(true)}
            style={{ flex: 1, padding: '0.75rem', fontWeight: 'bold', border: guess === true ? '2px solid #38bdf8' : undefined }}
          >
            🚨 Fake / Scam Payment
          </button>
          <button
            type="button"
            onClick={() => handleGuess(false)}
            style={{ flex: 1, padding: '0.75rem', fontWeight: 'bold', border: guess === false ? '2px solid #38bdf8' : undefined }}
          >
            ✅ Genuine Payment
          </button>
        </div>

        {guess !== null && (
          <div style={{ marginTop: '1.25rem', padding: '1rem', borderRadius: '10px', border: `1px solid ${guess === item.isFake ? '#22c55e' : '#ef4444'}`, background: guess === item.isFake ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontWeight: 'bold' }}>
              {guess === item.isFake ? <CheckCircle color="#22c55e" size={18} /> : <XCircle color="#ef4444" size={18} />}
              <span>{guess === item.isFake ? 'Correct!' : 'Not quite!'} {item.reason}</span>
            </div>

            <div style={{ marginTop: '0.85rem' }}>
              {index + 1 < PAYMENT_CASES.length ? (
                <button type="button" onClick={() => { setIndex((i) => i + 1); setGuess(null); }} style={{ padding: '0.55rem 1.1rem', fontWeight: 'bold' }}>
                  Next Receipt →
                </button>
              ) : (
                <button type="button" onClick={() => { setIndex(0); setGuess(null); setScore(0); }} style={{ padding: '0.55rem 1.1rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontWeight: 'bold' }}>
                  <RotateCcw size={16} /> Restart All 6 Cases
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}