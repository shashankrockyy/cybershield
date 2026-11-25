import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/ProfilePage';
import CyberQuiz from './pages/CyberQuiz';
import PrivacyCheckup from './pages/PrivacyCheckup';
import FraudSimulator from './pages/FraudSimulator';
import UrlChecker from './pages/UrlChecker';
import ScamOrNot from './pages/ScamOrNot';
import FakePayment from './pages/FakePayment';
import ContactFeedback from './pages/ContactFeedback';

export default function App() {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('cybershield_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const handleLogout = () => {
    localStorage.removeItem('cybershield_user');
    setUser(null);
  };

  if (!user) {
    return <AuthPage onAuthSuccess={(loggedInUser) => setUser(loggedInUser)} />;
  }

  return (
    <BrowserRouter>
      {/* Top Navigation Bar with Home, Dashboard, All Modules & Profile */}
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
          padding: '0.85rem 1.5rem',
          background: 'rgba(15, 23, 42, 0.92)',
          borderBottom: '1px solid rgba(56, 189, 248, 0.25)'
        }}
      >
        <Link to="/" style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#38bdf8', textDecoration: 'none' }}>
          🛡️ CyberShield
        </Link>

        <div style={{ display: 'flex', gap: '0.9rem', flexWrap: 'wrap', alignItems: 'center', fontSize: '0.92rem' }}>
          <Link to="/" style={{ color: '#e2e8f0', textDecoration: 'none' }}>Home</Link>
          <Link to="/dashboard" style={{ color: '#e2e8f0', textDecoration: 'none' }}>Dashboard</Link>
          <Link to="/quiz" style={{ color: '#e2e8f0', textDecoration: 'none' }}>Quiz</Link>
          <Link to="/url-checker" style={{ color: '#e2e8f0', textDecoration: 'none' }}>Link Checker</Link>
          <Link to="/scam-or-not" style={{ color: '#e2e8f0', textDecoration: 'none' }}>Scam or Not</Link>
          <Link to="/simulator" style={{ color: '#e2e8f0', textDecoration: 'none' }}>Play Simulator</Link>
          <Link to="/fake-payment" style={{ color: '#e2e8f0', textDecoration: 'none' }}>Fake Payment</Link>
          <Link to="/privacy" style={{ color: '#e2e8f0', textDecoration: 'none' }}>Privacy Checkup</Link>
          <Link to="/feedback" style={{ color: '#e2e8f0', textDecoration: 'none' }}>Feedback</Link>

          <Link
            to="/profile"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.35rem 0.75rem',
              borderRadius: '8px',
              background: 'rgba(56, 189, 248, 0.15)',
              border: '1px solid #38bdf8',
              color: '#38bdf8',
              fontWeight: 'bold',
              textDecoration: 'none'
            }}
          >
            <span>{user?.avatar || '🛡️'}</span>
            <span>{user?.full_name || 'Profile'}</span>
          </Link>
        </div>
      </nav>

      {/* Main Page Routes */}
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
        <Route path="/quiz" element={<CyberQuiz />} />
        <Route path="/url-checker" element={<UrlChecker />} />
        <Route path="/scam-or-not" element={<ScamOrNot />} />
        <Route path="/simulator" element={<FraudSimulator />} />
        <Route path="/fake-payment" element={<FakePayment />} />
        <Route path="/privacy" element={<PrivacyCheckup />} />
        <Route path="/feedback" element={<ContactFeedback />} />
        <Route
          path="/profile"
          element={<ProfilePage user={user} onUserUpdate={(updated) => setUser(updated)} onLogout={handleLogout} />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}