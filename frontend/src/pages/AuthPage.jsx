import React, { useState } from 'react';
import { Shield, Phone, Mail, Lock, User, KeyRound, CheckCircle, ArrowRight } from 'lucide-react';

const AVATARS = ['🛡️', '🕵️‍♀️', '🧑‍💻', '🦸‍♂️', '🦊', '🐯', '👩‍🎓', '👨‍🎓'];
const INDIAN_STATES = [
  'Karnataka', 'Maharashtra', 'Tamil Nadu', 'Telangana', 'Andhra Pradesh',
  'Kerala', 'Delhi NCR', 'Gujarat', 'Rajasthan', 'West Bengal', 'Uttar Pradesh', 'Other'
];

export default function AuthPage({ onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState(1); // Step 1: Credentials + OTP | Step 2: Profile Setup (Sign Up)
  const [fullName, setFullName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [demoOtpHint, setDemoOtpHint] = useState('');
  const [password, setPassword] = useState('');

  // Personal Profile Details
  const [avatar, setAvatar] = useState('🛡️');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Female');
  const [stateName, setStateName] = useState('Karnataka');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    setError('');
    if (!identifier.trim()) {
      setError('Please enter your email or phone number first.');
      return;
    }
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Could not send verification code.');
      } else {
        setOtpSent(true);
        setDemoOtpHint(data.demo_otp || '');
      }
    } catch {
      setError('Cannot connect to server. Ensure Flask backend is running.');
    }
  };

  const handleNextOrLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!otpSent || !otp.trim()) {
      setError('Please click "Send Verification Code" and enter the 6-digit code.');
      return;
    }

    if (!isLogin && step === 1) {
      if (!fullName.trim() || password.length < 4) {
        setError('Enter your name and a password (min 4 characters).');
        return;
      }
      setStep(2); // Move to Profile Picture & Personal Details step
      return;
    }

    setLoading(true);
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
    const payload = isLogin
      ? { identifier, password, otp }
      : { full_name: fullName, identifier, password, otp, avatar, age, gender, state: stateName };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Authentication failed.');
      } else {
        localStorage.setItem('cybershield_user', JSON.stringify(data.user));
        onAuthSuccess(data.user);
      }
    } catch {
      setError('Cannot connect to server. Ensure Flask backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
      <div className="card" style={{ maxWidth: '460px', width: '100%', padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <Shield size={42} color="#38bdf8" style={{ margin: '0 auto 0.4rem' }} />
          <h2 style={{ margin: 0 }}>
            {isLogin ? 'CyberShield Login' : step === 1 ? 'Create Account (Step 1 of 2)' : 'Setup Your Profile (Step 2 of 2)'}
          </h2>
          <p style={{ opacity: 0.8, fontSize: '0.88rem', marginTop: '0.35rem' }}>
            {isLogin
              ? 'Verify your phone/email and password to enter'
              : step === 1
              ? 'Verify your email or phone number first'
              : 'Choose your profile avatar and personal details'}
          </p>
        </div>

        {/* Mode Toggle */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <button
            type="button"
            onClick={() => { setIsLogin(true); setStep(1); setError(''); }}
            style={{ flex: 1, padding: '0.6rem', fontWeight: 'bold', opacity: isLogin ? 1 : 0.6 }}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => { setIsLogin(false); setStep(1); setError(''); }}
            style={{ flex: 1, padding: '0.6rem', fontWeight: 'bold', opacity: !isLogin ? 1 : 0.6 }}
          >
            Sign Up
          </button>
        </div>

        {error && (
          <div style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid #ef4444', color: '#fca5a5', padding: '0.7rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.88rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleNextOrLogin} style={{ display: 'flex', flexDirection: 'column', gap: '0.95rem' }}>
          {step === 1 ? (
            <>
              {!isLogin && (
                <div>
                  <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.88rem' }}>Full Name</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <User size={18} />
                    <input
                      type="text"
                      required
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      style={{ width: '100%', padding: '0.6rem', borderRadius: '8px' }}
                    />
                  </div>
                </div>
              )}

              <div>
                <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.88rem' }}>Email or Phone Number</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {identifier.includes('@') ? <Mail size={18} /> : <Phone size={18} />}
                  <input
                    type="text"
                    required
                    placeholder="e.g., 9876543210 or name@gmail.com"
                    value={identifier}
                    onChange={(e) => { setIdentifier(e.target.value); setOtpSent(false); }}
                    style={{ flex: 1, padding: '0.6rem', borderRadius: '8px' }}
                  />
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    style={{ padding: '0.6rem 0.75rem', fontSize: '0.82rem', fontWeight: 'bold', whiteSpace: 'nowrap' }}
                  >
                    {otpSent ? 'Resend Code' : 'Send Code'}
                  </button>
                </div>
              </div>

              {otpSent && (
                <div style={{ padding: '0.75rem', borderRadius: '8px', background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.35)' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem', fontSize: '0.85rem', color: '#7dd3fc' }}>
                    <CheckCircle size={15} /> Enter 6-Digit Verification Code {demoOtpHint && `(Code: ${demoOtpHint})`}
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <KeyRound size={18} />
                    <input
                      type="text"
                      required
                      maxLength={6}
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', letterSpacing: '0.2rem', fontWeight: 'bold' }}
                    />
                  </div>
                </div>
              )}

              <div>
                <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.88rem' }}>Password</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Lock size={18} />
                  <input
                    type="password"
                    required
                    placeholder="Enter password (min 4 characters)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ width: '100%', padding: '0.6rem', borderRadius: '8px' }}
                  />
                </div>
              </div>
            </>
          ) : (
            /* Step 2: Profile Picture & Personal Details */
            <>
              <div>
                <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.88rem', fontWeight: 'bold' }}>
                  Choose Profile Picture / Avatar
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                  {AVATARS.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setAvatar(item)}
                      style={{
                        fontSize: '1.65rem',
                        padding: '0.5rem',
                        borderRadius: '10px',
                        border: avatar === item ? '2px solid #38bdf8' : '1px solid rgba(255,255,255,0.2)',
                        background: avatar === item ? 'rgba(56,189,248,0.2)' : 'transparent'
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.88rem' }}>Age</label>
                  <input
                    type="number"
                    required
                    min="10"
                    max="100"
                    placeholder="e.g., 19"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    style={{ width: '100%', padding: '0.6rem', borderRadius: '8px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.88rem' }}>Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    style={{ width: '100%', padding: '0.6rem', borderRadius: '8px' }}
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Non-binary">Non-binary</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.88rem' }}>State / UT</label>
                <select
                  value={stateName}
                  onChange={(e) => setStateName(e.target.value)}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '8px' }}
                >
                  {INDIAN_STATES.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>
            </>
          )}

          <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.4rem' }}>
            {!isLogin && step === 2 && (
              <button type="button" onClick={() => setStep(1)} style={{ padding: '0.7rem 1rem' }}>
                ← Back
              </button>
            )}
            <button
              type="submit"
              disabled={loading}
              style={{ flex: 1, padding: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.45rem', fontWeight: 'bold' }}
            >
              {loading
                ? 'Please wait...'
                : isLogin
                ? 'Verify & Login'
                : step === 1
                ? 'Continue to Profile Setup'
                : 'Complete Sign Up'}
              <ArrowRight size={17} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}