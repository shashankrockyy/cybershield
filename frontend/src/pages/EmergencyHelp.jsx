import React, { useEffect } from 'react';
import { PhoneCall, ExternalLink, ShieldAlert, FileCheck2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

const SPECIFIC_GUIDES = [
  {
    title: 'UPI & QR Code Fraud',
    steps: [
      'Dial 1930 immediately and provide the 12-digit UTR (Transaction Reference) number.',
      'Open your UPI app (BHIM/GPay/PhonePe) -> Transaction History -> Report Fraud / Raise Dispute.',
      'Call your bank’s official helpline to freeze outgoing UPI debits if your PIN was compromised.'
    ]
  },
  {
    title: 'OTP & Net-Banking Fraud',
    steps: [
      'Immediately call your bank’s 24x7 fraud desk (from the back of your debit/credit card) to block cards and net banking.',
      'Dial 1930 within the Golden Hour to place a lien on the recipient account.',
      'Uninstall any remote-access app (AnyDesk, TeamViewer, QuickSupport) if installed.'
    ]
  },
  {
    title: 'Digital Arrest / Fake Police Call',
    steps: [
      'Disconnect the Skype/WhatsApp video call immediately—police never arrest via video call.',
      'Do NOT transfer money to any "RBI verification" or "CBI safe" bank account.',
      'Take screenshots of the caller’s number and profile, then report on cybercrime.gov.in and 1930.'
    ]
  },
  {
    title: 'Social Media Account Hacking',
    steps: [
      'Alert your close friends and family via phone call/SMS not to send money if your hacked account messages them.',
      'Use the official platform’s "Hacked Account / Recover Account" flow and reset your password.',
      'Enable Two-Factor Authentication (2FA) and review active login sessions.'
    ]
  },
  {
    title: 'Online Shopping / Fake Website Fraud',
    steps: [
      'Save order receipts, website URLs, seller phone numbers, and payment UTRs.',
      'Report the merchant UPI/account on 1930 (if money was lost) and file a complaint on cybercrime.gov.in.',
      'If paid via credit card, immediately raise a chargeback dispute with your card issuer.'
    ]
  },
  {
    title: 'Malicious APK / Phone Compromise',
    steps: [
      'Turn on Airplane Mode / disconnect mobile data & Wi-Fi immediately to stop remote control.',
      'Go to Settings -> Apps and uninstall any unknown recently installed APK.',
      'From a DIFFERENT clean device, change your email and banking passwords, then call 1930.'
    ]
  }
];

export default function EmergencyHelp() {
  const { t, completeModule } = useApp();

  useEffect(() => {
    completeModule('emergency');
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Critical Red Alert Hero */}
      <section
        className="card"
        style={{
          background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.25), rgba(12, 35, 60, 0.95))',
          borderColor: 'var(--danger)'
        }}
      >
        <span className="badge badge-danger" style={{ marginBottom: '0.75rem' }}>
          <ShieldAlert size={14} /> GOLDEN HOUR RAPID RESPONSE
        </span>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.4rem' }}>{t.emergency.title}</h1>
        <p style={{ color: 'var(--text-light)', marginBottom: '1.25rem' }}>{t.emergency.subtitle}</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
          <a href="tel:1930" className="btn btn-danger" style={{ fontSize: '1.15rem', padding: '0.9rem 1.6rem' }}>
            <PhoneCall size={22} />
            {t.emergency.helplineTitle}: {t.emergency.helplineNumber}
          </a>

          <a
            href={t.emergency.portalUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
            style={{ fontSize: '1rem', padding: '0.9rem 1.4rem' }}
          >
            {t.emergency.portalLabel}
            <ExternalLink size={18} />
          </a>
        </div>
      </section>

      {/* 5 Immediate Universal Steps */}
      <section className="card">
        <h2 style={{ fontSize: '1.35rem', marginBottom: '0.85rem', color: 'var(--accent-cyan)' }}>
          <FileCheck2 size={22} style={{ display: 'inline', marginRight: 8 }} />
          Immediate Action Checklist (First 60 Minutes)
        </h2>
        <ol style={{ paddingLeft: '1.35rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', color: 'var(--text-light)' }}>
          {t.emergency.steps.map((step, idx) => (
            <li key={idx} style={{ fontSize: '0.98rem' }}>
              {step}
            </li>
          ))}
        </ol>

        <div className="alert-box" style={{ marginTop: '1rem', marginBottom: 0 }}>
          <strong>Financial vs. Non-Financial Cybercrime:</strong> For <strong>financial loss</strong> (UPI, bank,
          card, investment scam), dial <strong>1930</strong> immediately so banks can freeze the money trail. For{' '}
          <strong>non-financial cybercrimes</strong> (cyberbullying, account hacking, identity impersonation), file
          directly on{' '}
          <a href="https://cybercrime.gov.in/" target="_blank" rel="noreferrer" style={{ color: '#20D4E5', textDecoration: 'underline' }}>
            https://cybercrime.gov.in/
          </a>.
        </div>
      </section>

      {/* Specific Fraud-Type Recovery Guides */}
      <section>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Fraud-Specific Emergency Instructions</h2>
        <div className="grid-2">
          {SPECIFIC_GUIDES.map((guide, i) => (
            <div key={i} className="card">
              <h3 style={{ color: '#fca5a5', marginBottom: '0.6rem', fontSize: '1.1rem' }}>{guide.title}</h3>
              <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-light)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {guide.steps.map((s, idx) => (
                  <li key={idx}>{s}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}