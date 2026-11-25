import React, { useState } from 'react';
import { Search, CheckCircle, BookOpen } from 'lucide-react';
import { FRAUD_LIBRARY_ITEMS } from '../data/staticModules';
import { useApp } from '../context/AppContext';

export default function FraudLibrary() {
  const { completeModule, progress } = useApp();
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(FRAUD_LIBRARY_ITEMS[0].id);

  const filtered = FRAUD_LIBRARY_ITEMS.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.definition.toLowerCase().includes(query.toLowerCase())
  );

  const activeItem =
    filtered.find((item) => item.id === selectedId) || filtered[0] || FRAUD_LIBRARY_ITEMS[0];

  const isCompleted = progress.completed_modules?.includes('library');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem' }}>Cyber Fraud Awareness Library (12 Categories)</h1>
          <p style={{ color: 'var(--text-light)' }}>
            Simple, practical guides explaining how common scams operate and how to stop them.
          </p>
        </div>

        <button
          type="button"
          className={`btn ${isCompleted ? 'btn-success' : 'btn-primary'}`}
          onClick={() => completeModule('library')}
        >
          <CheckCircle size={18} />
          {isCompleted ? 'Library Completed ✓' : 'Mark Library as Studied'}
        </button>
      </div>

      {/* Search Bar */}
      <div style={{ position: 'relative', maxWidth: 460 }}>
        <Search
          size={18}
          color="#94a3b8"
          style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }}
        />
        <input
          type="text"
          className="input-field"
          style={{ paddingLeft: '2.5rem' }}
          placeholder="Search UPI, Digital Arrest, QR, OTP, KYC..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Topic Selector Pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {filtered.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`btn ${activeItem.id === item.id ? 'btn-primary' : 'btn-outline'}`}
            style={{ padding: '0.45rem 0.85rem', fontSize: '0.84rem' }}
            onClick={() => setSelectedId(item.id)}
          >
            {item.title}
          </button>
        ))}
      </div>

      {/* Detailed Guide Card */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <BookOpen size={24} color="#20D4E5" />
          <h2 style={{ fontSize: '1.45rem', color: 'var(--accent-cyan)' }}>{activeItem.title}</h2>
        </div>

        <div>
          <strong>Definition:</strong>
          <p style={{ color: 'var(--text-light)', marginTop: '0.25rem' }}>{activeItem.definition}</p>
        </div>

        <div>
          <strong>How the Scam Works:</strong>
          <p style={{ color: 'var(--text-light)', marginTop: '0.25rem' }}>{activeItem.howItWorks}</p>
        </div>

        <div>
          <strong>Common Warning Signs:</strong>
          <ul style={{ paddingLeft: '1.3rem', marginTop: '0.3rem', color: 'var(--text-light)' }}>
            {activeItem.warningSigns.map((sign, i) => (
              <li key={i} style={{ marginBottom: '0.25rem' }}>{sign}</li>
            ))}
          </ul>
        </div>

        <div className="alert-box warning" style={{ margin: 0 }}>
          <strong>Realistic Fictional Example:</strong> {activeItem.example}
        </div>

        <div className="grid-2">
          <div className="alert-box" style={{ margin: 0 }}>
            <strong style={{ color: '#6ee7b7' }}>How to Prevent It:</strong>
            <p style={{ marginTop: '0.3rem' }}>{activeItem.prevention}</p>
          </div>
          <div className="alert-box danger" style={{ margin: 0 }}>
            <strong style={{ color: '#fca5a5' }}>What to Do If Victimized:</strong>
            <p style={{ marginTop: '0.3rem' }}>{activeItem.victimAction}</p>
          </div>
        </div>
      </div>
    </div>
  );
}