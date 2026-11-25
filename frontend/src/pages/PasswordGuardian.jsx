import React, { useState } from 'react';
import { Lock, Eye, EyeOff, ShieldAlert, CheckCircle2, XCircle } from 'lucide-react';

export default function PasswordGuardian() {
  const [samplePwd, setSamplePwd] = useState('');
  const [showPwd, setShowPwd] = useState(false);

  const checks = {
    length12: samplePwd.length >= 12,
    length8: samplePwd.length >= 8,
    upper: /[A-Z]/.test(samplePwd),
    lower: /[a-z]/.test(samplePwd),
    digit: /[0-9]/.test(samplePwd),
    special: /[^A-Za-z0-9]/.test(samplePwd),
    notCommon:
      samplePwd.length > 0 &&
      !['123456', 'password', 'qwerty', 'admin', '12345678', 'welcome', 'india123'].includes(
        samplePwd.toLowerCase()
      )
  };

  let score = 0;
  if (checks.length8) score += 20;
  if (checks.length12) score += 20;
  if (checks.upper) score += 15;
  if (checks.lower) score += 15;
  if (checks.digit) score += 15;
  if (checks.special) score += 15;
  if (!checks.notCommon && samplePwd.length > 0) score = 10;

  let strengthLabel = 'Enter a sample password';
  let strengthColor = '#94a3b8';
  if (samplePwd.length > 0) {
    if (score < 45) {
      strengthLabel = 'Weak';
      strengthColor = '#ef4444';
    } else if (score < 80) {
      strengthLabel = 'Medium';
      strengthColor = '#f59e0b';
    } else {
      strengthLabel = 'Strong';
      strengthColor = '#10b981';
    }
  }

  return (
    <div style={{ maxWidth: 820, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ fontSize: '1.8rem' }}>Password Guardian</h1>
        <p style={{ color: 'var(--text-light)' }}>
          Learn how attackers crack weak passwords and test password patterns safely in your browser.
        </p>
      </div>

      {/* Strict Privacy Warning */}
      <div className="alert-box danger" style={{ margin: 0 }}>
        <ShieldAlert size={18} style={{ display: 'inline', marginRight: 6 }} />
        <strong>Privacy Notice:</strong> Do <strong>NOT</strong> enter your real banking, email, or personal account
        passwords here. Test only made-up sample passwords. All checks run 100% locally in your browser—nothing is ever
        sent to any server or stored in a database.
      </div>

      {/* Strength Tester Card */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
        <label htmlFor="pwd-demo" style={{ fontWeight: 600 }}>
          Test a Sample Password Pattern
        </label>
        <div style={{ position: 'relative' }}>
          <input
            id="pwd-demo"
            type={showPwd ? 'text' : 'password'}
            className="input-field"
            style={{ paddingRight: '3rem' }}
            placeholder="Try e.g. BlueTiger#2026!Sky"
            value={samplePwd}
            onChange={(e) => setSamplePwd(e.target.value)}
            autoComplete="off"
          />
          <button
            type="button"
            onClick={() => setShowPwd((s) => !s)}
            aria-label="Toggle password visibility"
            style={{
              position: 'absolute',
              right: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer'
            }}
          >
            {showPwd ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
            <span>Strength Classification:</span>
            <strong style={{ color: strengthColor }}>{strengthLabel}</strong>
          </div>
          <div className="progress-track">
            <div
              style={{
                width: `${samplePwd.length ? score : 0}%`,
                height: '100%',
                background: strengthColor,
                transition: 'all 0.3s ease'
              }}
            />
          </div>
        </div>

        {/* Checklist */}
        <div className="grid-2" style={{ gap: '0.6rem', fontSize: '0.9rem' }}>
          {[
            { ok: checks.length12, text: 'At least 12 characters long (recommended)' },
            { ok: checks.upper, text: 'Contains uppercase letters (A–Z)' },
            { ok: checks.lower, text: 'Contains lowercase letters (a–z)' },
            { ok: checks.digit, text: 'Contains numbers (0–9)' },
            { ok: checks.special, text: 'Contains special symbols (!@#$%^&*)' },
            { ok: checks.notCommon, text: 'Not a common dictionary word or sequence' }
          ].map((rule, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {rule.ok ? <CheckCircle2 size={18} color="#10b981" /> : <XCircle size={18} color="#64748b" />}
              <span style={{ color: rule.ok ? '#fff' : 'var(--text-muted)' }}>{rule.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Educational Best Practices */}
      <div className="grid-2">
        <div className="card">
          <h3 style={{ color: 'var(--accent-cyan)', marginBottom: '0.5rem' }}>
            <Lock size={18} style={{ display: 'inline', marginRight: 6 }} />
            Common Password Mistakes
          </h3>
          <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-light)', fontSize: '0.92rem' }}>
            <li>Using your name, phone number, or date of birth.</li>
            <li>Reusing the same password across social media and banking.</li>
            <li>Saving passwords in plain WhatsApp chats or unencrypted notes.</li>
          </ul>
        </div>

        <div className="card">
          <h3 style={{ color: '#6ee7b7', marginBottom: '0.5rem' }}>Why Two-Factor Authentication (2FA) Matters</h3>
          <p style={{ color: 'var(--text-light)', fontSize: '0.92rem' }}>
            Even a strong password can be stolen via phishing or data breaches. Enabling 2FA (Authenticator app or SMS
            code) adds a mandatory second lock so attackers cannot enter your account with just a password.
          </p>
        </div>
      </div>
    </div>
  );
}