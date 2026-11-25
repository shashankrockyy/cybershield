import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Award, ShieldCheck, BookOpen, UserCheck } from 'lucide-react';

export default function Dashboard({ user }) {
  const [progress, setProgress] = useState({
    quizzes_taken: 0,
    latest_score: null,
    checklist_completed: 0,
    history: []
  });

  useEffect(() => {
    fetch('/api/progress')
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data === 'object') {
          setProgress({
            quizzes_taken: data.quizzes_taken || 0,
            latest_score: data.latest_score || null,
            checklist_completed: data.checklist_completed || 0,
            history: Array.isArray(data.history) ? data.history : []
          });
        }
      })
      .catch(() => {});
  }, []);

  const protectionPercent = Math.min(100, Math.round((progress.checklist_completed / 8) * 100));

  return (
    <div style={{ maxWidth: '980px', margin: '0 auto', padding: '1.75rem 1.5rem' }}>
      <div className="card" style={{ padding: '1.5rem', marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.55rem' }}>
            <BarChart3 color="#38bdf8" /> Cyber Readiness Dashboard
          </h1>
          <p style={{ margin: '0.35rem 0 0', opacity: 0.85 }}>
            Tracking progress for {user?.avatar || '🛡️'} <strong>{user?.full_name || 'User'}</strong> ({user?.state || 'India'})
          </p>
        </div>

        <Link
          to="/profile"
          style={{
            padding: '0.6rem 1rem',
            borderRadius: '8px',
            border: '1px solid #38bdf8',
            color: '#38bdf8',
            fontWeight: 'bold',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}
        >
          <UserCheck size={17} /> Edit Profile & Password
        </Link>
      </div>

      {/* 3 Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <div className="card" style={{ padding: '1.35rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38bdf8', fontWeight: 'bold' }}>
            <BookOpen size={20} /> Quizzes Completed
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0' }}>{progress.quizzes_taken}</div>
          <Link to="/quiz" style={{ color: '#38bdf8', fontSize: '0.88rem' }}>Take Another Quiz →</Link>
        </div>

        <div className="card" style={{ padding: '1.35rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#22c55e', fontWeight: 'bold' }}>
            <Award size={20} /> Latest Quiz Score
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0' }}>
            {progress.latest_score ? `${progress.latest_score.score} / ${progress.latest_score.total}` : 'Not taken yet'}
          </div>
          <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>
            {progress.latest_score ? progress.latest_score.quiz_type : 'Complete the quiz to log your score'}
          </span>
        </div>

        <div className="card" style={{ padding: '1.35rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f59e0b', fontWeight: 'bold' }}>
            <ShieldCheck size={20} /> Security Checkup
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0' }}>
            {progress.checklist_completed} / 8 ({protectionPercent}%)
          </div>
          <Link to="/privacy" style={{ color: '#38bdf8', fontSize: '0.88rem' }}>Update Checkboxes →</Link>
        </div>
      </div>

      {/* Recent Quiz History */}
      <div className="card" style={{ padding: '1.5rem' }}>
        <h2 style={{ marginTop: 0, fontSize: '1.2rem' }}>Recent Assessment History</h2>
        {progress.history.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {progress.history.map((item) => (
              <div
                key={item.id}
                style={{
                  padding: '0.8rem 1rem',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.04)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <strong>{item.quiz_type}</strong>
                  <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{item.created_at}</div>
                </div>
                <div style={{ fontWeight: 'bold', color: '#38bdf8' }}>
                  {item.score} / {item.total}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ opacity: 0.8, marginBottom: 0 }}>
            No quiz attempts recorded yet. Head over to the <Link to="/quiz" style={{ color: '#38bdf8' }}>Pre-Assessment Quiz</Link> to see your score appear here!
          </p>
        )}
      </div>
    </div>
  );
}