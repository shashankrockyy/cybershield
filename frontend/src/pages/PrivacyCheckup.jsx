import React, { useState, useEffect } from 'react';
import { CheckSquare, Square, ShieldCheck, RotateCcw } from 'lucide-react';

const CHECKLIST_ITEMS = [
  { id: '2fa_email', category: 'Account Security', title: 'Enable Two-Factor Authentication (2FA) on primary Email & Banking apps', desc: 'Blocks unauthorized logins even if your password is leaked.' },
  { id: 'upi_pin_rule', category: 'Payment Safety', title: 'Never enter UPI PIN or scan QR codes to receive money', desc: 'UPI PIN is strictly for debiting funds from your account.' },
  { id: 'whatsapp_2step', category: 'Social Media', title: 'Turn on 6-digit Two-Step Verification PIN in WhatsApp', desc: 'Prevents SIM-swap or OTP hijacking of your WhatsApp account.' },
  { id: 'aadhaar_lock', category: 'Identity Protection', title: 'Lock Aadhaar Biometrics via mAadhaar app or myaadhaar.uidai.gov.in', desc: 'Stops unauthorized AePS biometric withdrawals.' },
  { id: 'app_permissions', category: 'Device Hygiene', title: 'Revoke SMS, Contacts & Accessibility permissions from unknown apps', desc: 'Prevents spyware and fake loan apps from reading OTPs.' },
  { id: 'screen_share', category: 'Device Hygiene', title: 'Uninstall remote-access apps (AnyDesk / TeamViewer) unless needed for work', desc: 'Scammers use these apps to view your screen and steal OTPs.' },
  { id: 'unique_passwords', category: 'Account Security', title: 'Use unique 14+ character passphrases for banking, email, and social accounts', desc: 'Prevents one data breach from compromising all your accounts.' },
  { id: 'social_privacy', category: 'Social Media', title: 'Set Instagram/Facebook profiles & phone number visibility to Private/Friends', desc: 'Stops scammers from harvesting personal details for impersonation.' }
];

export default function PrivacyCheckup() {
  const [checked, setChecked] = useState({});

  useEffect(() => {
    fetch('/api/checklist')
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data === 'object') setChecked(data);
      })
      .catch(() => {});
  }, []);

  const handleToggle = async (itemId) => {
    const nextValue = !checked[itemId];
    setChecked((prev) => ({ ...prev, [itemId]: nextValue }));

    try {
      await fetch('/api/checklist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item_id: itemId, completed: nextValue })
      });
    } catch {
      // Keeps local toggle working even if backend is offline
    }
  };

  const completedCount = CHECKLIST_ITEMS.filter((item) => checked[item.id]).length;
  const percent = Math.round((completedCount / CHECKLIST_ITEMS.length) * 100);

  return (
    <div style={{ maxWidth: '820px', margin: '0 auto', padding: '1.5rem' }}>
      <div className="card" style={{ padding: '1.5rem', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.55rem' }}>
              <ShieldCheck color="#38bdf8" /> Privacy & Security Checkup
            </h1>
            <p style={{ margin: '0.35rem 0 0', opacity: 0.85 }}>
              Click each box below to tick off your completed security protections ({completedCount} of {CHECKLIST_ITEMS.length} done)
            </p>
          </div>
          <div style={{ fontSize: '1.35rem', fontWeight: 'bold', color: '#38bdf8' }}>{percent}% Protected</div>
        </div>

        {/* Progress Bar */}
        <div style={{ height: '10px', background: 'rgba(255,255,255,0.12)', borderRadius: '999px', marginTop: '1rem', overflow: 'hidden' }}>
          <div style={{ width: `${percent}%`, height: '100%', background: '#38bdf8', transition: 'width 0.25s ease' }} />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
        {CHECKLIST_ITEMS.map((item) => {
          const isDone = Boolean(checked[item.id]);
          return (
            <div
              key={item.id}
              onClick={() => handleToggle(item.id)}
              role="checkbox"
              aria-checked={isDone}
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleToggle(item.id); }}
              className="card"
              style={{
                padding: '1rem 1.25rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.9rem',
                border: isDone ? '1px solid #22c55e' : '1px solid rgba(255,255,255,0.15)',
                background: isDone ? 'rgba(34, 197, 94, 0.08)' : undefined
              }}
            >
              <div style={{ marginTop: '0.15rem', color: isDone ? '#22c55e' : '#94a3b8' }}>
                {isDone ? <CheckSquare size={22} /> : <Square size={22} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.78rem', color: '#38bdf8', fontWeight: 'bold' }}>{item.category}</div>
                <div style={{ fontWeight: 'bold', textDecoration: isDone ? 'line-through' : 'none', opacity: isDone ? 0.8 : 1 }}>
                  {item.title}
                </div>
                <div style={{ fontSize: '0.86rem', opacity: 0.8, marginTop: '0.25rem' }}>{item.desc}</div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => CHECKLIST_ITEMS.forEach((item) => { if (checked[item.id]) handleToggle(item.id); })}
        style={{ marginTop: '1.25rem', padding: '0.6rem 1rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
      >
        <RotateCcw size={16} /> Reset All Checkboxes
      </button>
    </div>
  );
}