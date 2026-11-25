import React from 'react';
import { ShieldCheck, Globe, HeartHandshake, Lock } from 'lucide-react';

export default function AboutUs() {
  return (
    <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="card">
        <span className="badge badge-cyan" style={{ marginBottom: '0.6rem' }}>
          COMMUNITY CYBER AWARENESS INITIATIVE
        </span>
        <h1 style={{ fontSize: '1.9rem', marginBottom: '0.6rem' }}>About CyberShield</h1>
        <p style={{ color: 'var(--text-light)', lineHeight: 1.75 }}>
          <strong>CyberShield — Smart Fraud Awareness & Cyber Safety Application</strong> is a community-focused
          educational platform built to empower everyday citizens—especially students, parents, shopkeepers, and
          senior citizens—to recognize and prevent digital fraud before financial loss occurs.
        </p>
      </div>

      <div className="grid-2">
        <div className="card">
          <HeartHandshake size={28} color="#20D4E5" style={{ marginBottom: '0.6rem' }} />
          <h3 style={{ marginBottom: '0.4rem' }}>Why We Built This</h3>
          <p style={{ color: 'var(--text-light)', fontSize: '0.92rem' }}>
            Rapid digital payment adoption has brought tremendous convenience alongside rising UPI, OTP, QR-code, and
            "Digital Arrest" scams. Practical, interactive practice is far more effective than passive warnings.
          </p>
        </div>

        <div className="card">
          <Globe size={28} color="#20D4E5" style={{ marginBottom: '0.6rem' }} />
          <h3 style={{ marginBottom: '0.4rem' }}>Multilingual Accessibility</h3>
          <p style={{ color: 'var(--text-light)', fontSize: '0.92rem' }}>
            Cyber safety belongs to everyone. CyberShield provides core guides, quizzes, daily tips, and emergency
            helpline steps in <strong>English</strong>, <strong>Kannada (ಕನ್ನಡ)</strong>, and{' '}
            <strong>Hindi (हिन्दी)</strong>.
          </p>
        </div>

        <div className="card">
          <Lock size={28} color="#10b981" style={{ marginBottom: '0.6rem' }} />
          <h3 style={{ marginBottom: '0.4rem' }}>Privacy & Ethical Design</h3>
          <p style={{ color: 'var(--text-light)', fontSize: '0.92rem' }}>
            Password Guardian evaluates sample passwords 100% inside your browser without storing or transmitting them.
            The Suspicious URL Checker inspects text heuristics locally without opening risky links.
          </p>
        </div>

        <div className="card">
          <ShieldCheck size={28} color="#20D4E5" style={{ marginBottom: '0.6rem' }} />
          <h3 style={{ marginBottom: '0.4rem' }}>Measurable Community Impact</h3>
          <p style={{ color: 'var(--text-light)', fontSize: '0.92rem' }}>
            Using built-in Pre-Assessment and Post-Assessment quizzes stored in SQLite, community workshops can measure
            real awareness improvement among participants.
          </p>
        </div>
      </div>
    </div>
  );
}