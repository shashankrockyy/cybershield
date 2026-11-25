import React, { useState } from 'react';
import { Sparkles, BookMarked, Users, RefreshCw } from 'lucide-react';
import { MYTHS_VS_FACTS, SCAM_STORIES } from '../data/staticModules';
import { useApp } from '../context/AppContext';

export default function TipsAndStories() {
  const { t } = useApp();
  const [tipIndex, setTipIndex] = useState(0);

  const nextTip = () => {
    setTipIndex((i) => (i + 1) % t.dailyTips.length);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.8rem' }}>Daily Cyber Safety Tips, Myths & Scam Stories</h1>
        <p style={{ color: 'var(--text-light)' }}>
          Real-world lessons, common misconceptions, and dedicated safety advice for parents and senior citizens.
        </p>
      </div>

      {/* Interactive Tip Rotator */}
      <section className="card" style={{ borderColor: 'rgba(32, 212, 229, 0.45)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.65rem' }}>
          <span className="badge badge-cyan">
            <Sparkles size={14} /> SAFETY TIP #{tipIndex + 1} OF {t.dailyTips.length}
          </span>
          <button type="button" className="btn btn-outline" style={{ padding: '0.4rem 0.85rem', fontSize: '0.84rem' }} onClick={nextTip}>
            <RefreshCw size={15} /> Next Safety Tip
          </button>
        </div>
        <p style={{ fontSize: '1.1rem', fontWeight: 500 }}>{t.dailyTips[tipIndex]}</p>
      </section>

      {/* Myth vs Fact */}
      <section>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Cybersecurity: Myth vs. Fact</h2>
        <div className="grid-2">
          {MYTHS_VS_FACTS.map((item, idx) => (
            <div key={idx} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <div className="alert-box danger" style={{ margin: 0 }}>
                <strong>{item.myth}</strong>
              </div>
              <div className="alert-box" style={{ margin: 0 }}>
                <strong style={{ color: '#6ee7b7' }}>{item.fact}</strong>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Anonymised Case Studies */}
      <section>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>
          <BookMarked size={22} color="#20D4E5" style={{ display: 'inline', marginRight: 8 }} />
          Anonymised Scam Case Studies
        </h2>
        <div className="grid-2">
          {SCAM_STORIES.map((story, idx) => (
            <div key={idx} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <span className="badge badge-warning">{story.victimProfile}</span>
              <h3 style={{ fontSize: '1.15rem' }}>{story.title}</h3>
              <p style={{ color: 'var(--text-light)', fontSize: '0.92rem' }}>{story.story}</p>
              <div className="alert-box" style={{ margin: 0, fontSize: '0.88rem' }}>
                <strong>Lesson Learned:</strong> {story.takeaway}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Guide for Parents & Senior Citizens */}
      <section className="card" style={{ borderColor: 'rgba(16, 185, 129, 0.4)' }}>
        <h2 style={{ fontSize: '1.35rem', color: '#6ee7b7', marginBottom: '0.75rem' }}>
          <Users size={22} style={{ display: 'inline', marginRight: 8 }} />
          Special Cyber Safety Guide for Parents & Elderly Citizens
        </h2>
        <ul style={{ paddingLeft: '1.3rem', color: 'var(--text-light)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li>
            <strong>Pause Before Panicking:</strong> Scammers target seniors with fake electricity cuts, pension blocks, or
            "police arrest" threats. Always hang up and call a trusted family member first.
          </li>
          <li>
            <strong>Never Install Remote Support Apps:</strong> Do not download AnyDesk, TeamViewer, or QuickSupport on
            the advice of any phone caller.
          </li>
          <li>
            <strong>Protect Children Online:</strong> Teach children never to share school names, home addresses, or
            personal photos in gaming chats or with online strangers.
          </li>
          <li>
            <strong>Keep Helpline 1930 Written Near the Phone:</strong> Quick reporting within 1 hour can stop bank loss.
          </li>
        </ul>
      </section>
    </div>
  );
}