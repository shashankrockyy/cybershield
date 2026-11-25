import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <strong style={{ color: '#fff', fontSize: '1rem' }}>CYBERSHIELD</strong>
            <p style={{ marginTop: '0.25rem' }}>
              Think Before You Click! Preventive Cyber Fraud Education for Students, Parents & Senior Citizens.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link to="/tips-stories" style={{ color: '#20D4E5' }}>Tips & Scam Stories</Link>
            <Link to="/about" style={{ color: '#20D4E5' }}>About Us</Link>
            <Link to="/contact" style={{ color: '#20D4E5' }}>Contact & Feedback</Link>
            <Link to="/emergency" style={{ color: '#fca5a5', fontWeight: 600 }}>Emergency 1930</Link>
          </div>
        </div>

        <div className="alert-box warning" style={{ margin: 0, fontSize: '0.82rem' }}>
          <ShieldAlert size={16} style={{ display: 'inline', marginRight: 6, verticalAlign: 'text-bottom' }} />
          <strong>Educational Disclaimer:</strong> CyberShield is strictly an educational and preventive awareness platform.
          All SMS, email, and payment screenshot examples are fictionalized for training. CyberShield does not guarantee
          website safety or replace official law-enforcement investigation. In case of cyber financial fraud, call{' '}
          <strong>1930</strong> or visit{' '}
          <a href="https://cybercrime.gov.in/" target="_blank" rel="noreferrer" style={{ color: '#20D4E5', textDecoration: 'underline' }}>
            cybercrime.gov.in
          </a>.
        </div>
      </div>
    </footer>
  );
}