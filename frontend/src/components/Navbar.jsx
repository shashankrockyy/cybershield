import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ShieldCheck, Home, BookOpen, HelpCircle, BarChart3, PhoneCall } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const { lang, changeLanguage, t, backendOnline } = useApp();

  return (
    <>
      <header className="navbar">
        <div className="navbar-inner">
          <Link to="/" className="brand-link">
            <div className="brand-icon">
              <ShieldCheck size={24} strokeWidth={2.5} />
            </div>
            <div>
              <span className="brand-title">CYBERSHIELD</span>
              <span className="brand-sub">{t.brandTagline}</span>
            </div>
          </Link>

          <nav className="nav-links" aria-label="Main Navigation">
            <NavLink to="/" end className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              {t.nav.home}
            </NavLink>
            <NavLink to="/dashboard" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              {t.nav.dashboard}
            </NavLink>
            <NavLink to="/library" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              {t.nav.library}
            </NavLink>
            <NavLink to="/scam-or-not" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              {t.nav.scamOrNot}
            </NavLink>
            <NavLink to="/quiz" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              {t.nav.quiz}
            </NavLink>
            <NavLink to="/progress" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              {t.nav.progress}
            </NavLink>
            <NavLink to="/emergency" className="nav-item emergency-pill">
              <PhoneCall size={14} style={{ display: 'inline', marginRight: 4 }} />
              {t.nav.emergency}
            </NavLink>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div className="lang-switcher" role="group" aria-label="Language Selector">
              <button
                type="button"
                className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
                onClick={() => changeLanguage('en')}
              >
                EN
              </button>
              <button
                type="button"
                className={`lang-btn ${lang === 'kn' ? 'active' : ''}`}
                onClick={() => changeLanguage('kn')}
              >
                ಕನ್ನಡ
              </button>
              <button
                type="button"
                className={`lang-btn ${lang === 'hi' ? 'active' : ''}`}
                onClick={() => changeLanguage('hi')}
              >
                हिन्दी
              </button>
            </div>
          </div>
        </div>

        {!backendOnline && (
          <div
            style={{
              background: 'rgba(245, 158, 11, 0.16)',
              color: '#fcd34d',
              textAlign: 'center',
              fontSize: '0.8rem',
              padding: '0.35rem 1rem',
              borderTop: '1px solid rgba(245, 158, 11, 0.35)'
            }}
          >
            Backend API not detected on port 5000 — start <code>python app.py</code> in <code>backend/</code> to save scores to SQLite.
          </div>
        )}
      </header>

      {/* Mobile Bottom Dock */}
      <nav className="mobile-dock" aria-label="Mobile Quick Navigation">
        <NavLink to="/" end className={({ isActive }) => `dock-item ${isActive ? 'active' : ''}`}>
          <Home size={20} />
          <span>{t.nav.home}</span>
        </NavLink>
        <NavLink to="/dashboard" className={({ isActive }) => `dock-item ${isActive ? 'active' : ''}`}>
          <BookOpen size={20} />
          <span>{t.nav.dashboard}</span>
        </NavLink>
        <NavLink to="/quiz" className={({ isActive }) => `dock-item ${isActive ? 'active' : ''}`}>
          <HelpCircle size={20} />
          <span>{t.nav.quiz}</span>
        </NavLink>
        <NavLink to="/progress" className={({ isActive }) => `dock-item ${isActive ? 'active' : ''}`}>
          <BarChart3 size={20} />
          <span>{t.nav.progress}</span>
        </NavLink>
      </nav>
    </>
  );
}