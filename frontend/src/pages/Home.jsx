import React from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  BookOpen,
  Link2,
  MessageSquareWarning,
  Gamepad2,
  Receipt,
  ShieldCheck,
  BarChart3,
  PhoneCall,
  ArrowRight
} from 'lucide-react';

const MODULES = [
  {
    title: 'Pre-Assessment Cyber Quiz',
    desc: 'Test your awareness across 10 real-world UPI, OTP, phishing, and password scenarios.',
    path: '/quiz',
    icon: BookOpen,
    tag: '10 Questions'
  },
  {
    title: 'Suspicious Link Checker',
    desc: 'Scan any SMS, email, or WhatsApp URL for phishing keywords, raw IPs, and spoofed domains.',
    path: '/url-checker',
    icon: Link2,
    tag: 'Live Scanner'
  },
  {
    title: 'Scam or Not? Challenge',
    desc: 'Inspect real SMS, WhatsApp, and "Digital Arrest" messages to spot the trap.',
    path: '/scam-or-not',
    icon: MessageSquareWarning,
    tag: '6 Scenarios'
  },
  {
    title: 'Play & Fraud Simulator',
    desc: 'Roleplay interactive scam traps (OLX QR, power cut, Telegram tasks) and see the outcome.',
    path: '/simulator',
    icon: Gamepad2,
    tag: 'Interactive'
  },
  {
    title: 'Spot the Fake Payment',
    desc: 'Compare genuine UPI credits against fake payment spoof apps and collect requests.',
    path: '/fake-payment',
    icon: Receipt,
    tag: '6 Cases'
  },
  {
    title: 'Privacy & Security Checkup',
    desc: 'Tick off 8 essential device, Aadhaar, WhatsApp, and banking protections.',
    path: '/privacy',
    icon: ShieldCheck,
    tag: 'Checklist'
  }
];

export default function Home({ user }) {
  return (
    <div style={{ maxWidth: '1040px', margin: '0 auto', padding: '1.75rem 1.5rem' }}>
      {/* Hero Section */}
      <div
        className="card"
        style={{
          padding: '2.25rem',
          marginBottom: '1.5rem',
          background: 'linear-gradient(135deg, rgba(15,23,42,0.95), rgba(30,58,138,0.45))',
          border: '1px solid rgba(56,189,248,0.35)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#38bdf8', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          <Shield size={22} /> Welcome back, {user?.avatar || '🛡️'} {user?.full_name || 'Cyber Defender'}!
        </div>
        <h1 style={{ margin: '0 0 0.75rem', fontSize: '2rem', lineHeight: 1.25 }}>
          Stay One Step Ahead of Online Scams & Digital Fraud
        </h1>
        <p style={{ margin: '0 0 1.4rem', opacity: 0.88, maxWidth: '720px', lineHeight: 1.6 }}>
          Practice spotting fake UPI screenshots, phishing links, OTP traps, and "Digital Arrest" calls in a safe, interactive training lab built for everyday internet users.
        </p>

        <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
          <Link
            to="/quiz"
            style={{
              padding: '0.75rem 1.3rem',
              borderRadius: '8px',
              background: '#38bdf8',
              color: '#0f172a',
              fontWeight: 'bold',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem'
            }}
          >
            Start Cyber Quiz <ArrowRight size={17} />
          </Link>
          <Link
            to="/dashboard"
            style={{
              padding: '0.75rem 1.3rem',
              borderRadius: '8px',
              border: '1px solid #38bdf8',
              color: '#38bdf8',
              fontWeight: 'bold',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem'
            }}
          >
            <BarChart3 size={17} /> View My Dashboard
          </Link>
        </div>
      </div>

      {/* National Cyber Helpline Banner */}
      <div
        style={{
          padding: '0.95rem 1.25rem',
          borderRadius: '10px',
          background: 'rgba(239, 68, 68, 0.12)',
          border: '1px solid rgba(239, 68, 68, 0.45)',
          marginBottom: '1.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <PhoneCall color="#f87171" size={20} />
          <span>
            <strong>Victim of Financial Cyber Fraud?</strong> Call National Cyber Helpline <strong>1930</strong> immediately or report at <strong>cybercrime.gov.in</strong>.
          </span>
        </div>
      </div>

      {/* Interactive Modules Grid */}
      <h2 style={{ marginBottom: '1rem', fontSize: '1.35rem' }}>Explore CyberShield Modules</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '1rem' }}>
        {MODULES.map((mod) => {
          const IconComponent = mod.icon;
          return (
            <Link
              key={mod.path}
              to={mod.path}
              className="card"
              style={{
                padding: '1.35rem',
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid rgba(255,255,255,0.12)'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <IconComponent size={26} color="#38bdf8" />
                  <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.55rem', borderRadius: '999px', background: 'rgba(56,189,248,0.15)', color: '#38bdf8', fontWeight: 'bold' }}>
                    {mod.tag}
                  </span>
                </div>
                <h3 style={{ margin: '0 0 0.45rem', fontSize: '1.1rem' }}>{mod.title}</h3>
                <p style={{ margin: 0, fontSize: '0.88rem', opacity: 0.8, lineHeight: 1.5 }}>{mod.desc}</p>
              </div>

              <div style={{ marginTop: '1rem', color: '#38bdf8', fontWeight: 'bold', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                Open Module <ArrowRight size={15} />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}