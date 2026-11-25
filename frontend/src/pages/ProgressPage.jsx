import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, TrendingUp, Trash2, Award } from 'lucide-react';
import { api } from '../services/api';
import { useApp } from '../context/AppContext';

export default function ProgressPage() {
  const { sessionId, progress, refreshProgress } = useApp();

  const pre = progress.pre_assessment;
  const post = progress.post_assessment;
  const improvement = progress.awareness_improvement;

  const handleReset = async () => {
    if (!window.confirm('Reset all your saved quiz attempts, completed modules, and checklist progress?')) return;
    try {
      await api.resetProgress(sessionId);
      await refreshProgress();
    } catch (_err) {
      // Ignore if backend is offline
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem' }}>
            <BarChart3 size={26} color="#20D4E5" style={{ display: 'inline', marginRight: 8 }} />
            Learning Progress & Impact Report
          </h1>
          <p style={{ color: 'var(--text-light)' }}>
            Track your completed modules and measure your improvement between Pre-Assessment and Post-Assessment.
          </p>
        </div>

        <button type="button" className="btn btn-outline" onClick={handleReset}>
          <Trash2 size={16} /> Reset My Progress
        </button>
      </div>

      {/* Pre vs Post Comparison Card */}
      <div className="card" style={{ borderColor: 'rgba(32, 212, 229, 0.4)' }}>
        <h2 style={{ fontSize: '1.35rem', marginBottom: '1rem' }}>
          <TrendingUp size={22} color="#20D4E5" style={{ display: 'inline', marginRight: 8 }} />
          Pre-Assessment vs. Post-Assessment Comparison
        </h2>

        <div className="grid-2" style={{ marginBottom: '1rem' }}>
          <div style={{ background: '#07182b', padding: '1.15rem', borderRadius: '14px', border: '1px solid var(--border-subtle)' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Pre-Assessment Score (Before Learning)</span>
            <h3 style={{ fontSize: '1.9rem', color: '#93c5fd', margin: '0.3rem 0' }}>
              {pre ? `${pre.percentage}% (${pre.score}/${pre.total_questions})` : 'Not Taken Yet'}
            </h3>
            {!pre && (
              <Link to="/quiz?mode=pre" style={{ color: 'var(--accent-cyan)', fontSize: '0.86rem' }}>
                Take Pre-Assessment Now →
              </Link>
            )}
          </div>

          <div style={{ background: '#07182b', padding: '1.15rem', borderRadius: '14px', border: '1px solid var(--border-subtle)' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Post-Assessment Score (After Learning)</span>
            <h3 style={{ fontSize: '1.9rem', color: '#6ee7b7', margin: '0.3rem 0' }}>
              {post ? `${post.percentage}% (${post.score}/${post.total_questions})` : 'Not Taken Yet'}
            </h3>
            {!post && (
              <Link to="/quiz?mode=post" style={{ color: 'var(--accent-cyan)', fontSize: '0.86rem' }}>
                Take Post-Assessment Now →
              </Link>
            )}
          </div>
        </div>

        {improvement !== null && (
          <div className={`alert-box ${improvement >= 0 ? '' : 'warning'}`} style={{ margin: 0 }}>
            <Award size={18} style={{ display: 'inline', marginRight: 6 }} />
            <strong>Awareness Growth:</strong>{' '}
            {improvement >= 0
              ? `Your cybersecurity awareness score improved by +${improvement}% after using CyberShield!`
              : `Your post-assessment changed by ${improvement}%. Review the Fraud Library and try again!`}
          </div>
        )}
      </div>

      {/* Quiz History Table */}
      <div className="card">
        <h2 style={{ fontSize: '1.3rem', marginBottom: '0.85rem' }}>Saved Quiz Attempts (SQLite Records)</h2>
        {progress.quiz_attempts?.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>No quiz attempts recorded yet. Take a quiz to see your history!</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.92rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--accent-cyan)' }}>
                  <th style={{ padding: '0.65rem' }}>Type</th>
                  <th style={{ padding: '0.65rem' }}>Difficulty</th>
                  <th style={{ padding: '0.65rem' }}>Score</th>
                  <th style={{ padding: '0.65rem' }}>Percentage</th>
                  <th style={{ padding: '0.65rem' }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {progress.quiz_attempts.map((attempt) => (
                  <tr key={attempt.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <td style={{ padding: '0.65rem', textTransform: 'uppercase', fontWeight: 600 }}>
                      {attempt.quiz_type}
                    </td>
                    <td style={{ padding: '0.65rem', textTransform: 'capitalize' }}>{attempt.difficulty}</td>
                    <td style={{ padding: '0.65rem' }}>
                      {attempt.score} / {attempt.total_questions}
                    </td>
                    <td style={{ padding: '0.65rem', color: '#6ee7b7', fontWeight: 700 }}>{attempt.percentage}%</td>
                    <td style={{ padding: '0.65rem', color: 'var(--text-muted)' }}>{attempt.created_at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}