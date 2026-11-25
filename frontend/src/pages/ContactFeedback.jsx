import React, { useState, useEffect } from 'react';
import { MessageSquarePlus, Send, CheckCircle } from 'lucide-react';

export default function ContactFeedback() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Report a New Scam Pattern');
  const [topic, setTopic] = useState('Quiz & Simulator');
  const [rating, setRating] = useState('5 - Extremely Helpful');
  const [followUp, setFollowUp] = useState('Share in Community Scam Alerts');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [entries, setEntries] = useState([]);

  const loadEntries = () => {
    fetch('/api/feedback')
      .then((res) => res.json())
      .then((data) => { if (Array.isArray(data)) setEntries(data); })
      .catch(() => {});
  };

  useEffect(() => {
    loadEntries();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name || 'Community Member', category, topic, rating, follow_up: followUp, message })
      });
    } catch {}

    setSubmitted(true);
    setMessage('');
    loadEntries();
  };

  return (
    <div style={{ maxWidth: '820px', margin: '0 auto', padding: '1.5rem' }}>
      <div className="card" style={{ padding: '1.75rem', marginBottom: '1.5rem' }}>
        <h1 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.55rem' }}>
          <MessageSquarePlus color="#38bdf8" /> Community Feedback & Scam Reporting
        </h1>
        <p style={{ opacity: 0.85 }}>
          Submit feedback, suggest new quiz scenarios, report a suspicious link/scam you encountered, or request a feature.
        </p>

        {submitted && (
          <div style={{ padding: '0.85rem', borderRadius: '8px', background: 'rgba(34,197,94,0.15)', border: '1px solid #22c55e', color: '#86efac', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle size={18} /> Thank you! Your submission has been recorded.
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.95rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.88rem' }}>Your Name (Optional)</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: '8px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.88rem' }}>Submission Type</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px' }}>
                <option value="Report a New Scam Pattern">Report a New Scam Pattern</option>
                <option value="Suggest New Quiz / Simulator Question">Suggest New Quiz / Simulator Question</option>
                <option value="Website Feature Request">Website Feature Request</option>
                <option value="Bug / Link Checker Issue">Bug / Link Checker Issue</option>
                <option value="General Appreciation / Review">General Appreciation / Review</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.88rem' }}>Module / Topic</label>
              <select value={topic} onChange={(e) => setTopic(e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px' }}>
                <option value="Quiz & Simulator">Quiz & Simulator</option>
                <option value="Suspicious Link Checker">Suspicious Link Checker</option>
                <option value="Scam or Not Game">Scam or Not Game</option>
                <option value="Spot Fake Payment">Spot Fake Payment</option>
                <option value="Privacy Checkup">Privacy Checkup</option>
                <option value="Overall CyberShield Platform">Overall CyberShield Platform</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.88rem' }}>Experience Rating</label>
              <select value={rating} onChange={(e) => setRating(e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px' }}>
                <option value="5 - Extremely Helpful">⭐⭐⭐⭐⭐ (5/5) Extremely Helpful</option>
                <option value="4 - Very Good">⭐⭐⭐⭐ (4/5) Very Good</option>
                <option value="3 - Good">⭐⭐⭐ (3/5) Good</option>
                <option value="2 - Needs Improvement">⭐⭐ (2/5) Needs Improvement</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.88rem' }}>Preferred Action</label>
            <select value={followUp} onChange={(e) => setFollowUp(e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px' }}>
              <option value="Share in Community Scam Alerts">Add to Community Scam Alerts</option>
              <option value="Include in Next Quiz Update">Include in Next Quiz Update</option>
              <option value="Team Review Only">For Team Review Only</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.88rem' }}>Details / Message</label>
            <textarea
              rows={4}
              required
              placeholder="Describe the scam message, suggestion, or feedback in detail..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ width: '100%', padding: '0.7rem', borderRadius: '8px' }}
            />
          </div>

          <button type="submit" style={{ padding: '0.75rem 1.25rem', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <Send size={17} /> Submit Feedback
          </button>
        </form>
      </div>

      {entries.length > 0 && (
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ marginTop: 0 }}>Recent Community Submissions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {entries.map((item) => (
              <div key={item.id} style={{ padding: '0.85rem', borderRadius: '8px', background: 'rgba(255,255,255,0.04)' }}>
                <div style={{ fontSize: '0.82rem', color: '#38bdf8', fontWeight: 'bold' }}>
                  {item.name} • {item.category} ({item.topic})
                </div>
                <p style={{ margin: '0.35rem 0 0', fontSize: '0.9rem' }}>{item.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}