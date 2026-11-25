import React, { useState } from 'react';
import { UserCheck, Lock, LogOut, Save, CheckCircle } from 'lucide-react';

const AVATARS = ['🛡️', '🕵️‍♀️', '🧑‍💻', '🦸‍♂️', '🦊', '🐯', '👩‍🎓', '👨‍🎓'];
const INDIAN_STATES = [
  'Karnataka', 'Maharashtra', 'Tamil Nadu', 'Telangana', 'Andhra Pradesh',
  'Kerala', 'Delhi NCR', 'Gujarat', 'Rajasthan', 'West Bengal', 'Uttar Pradesh', 'Other'
];

export default function ProfilePage({ user, onUserUpdate, onLogout }) {
  const [fullName, setFullName] = useState(user?.full_name || '');
  const [avatar, setAvatar] = useState(user?.avatar || '🛡️');
  const [age, setAge] = useState(user?.age || '');
  const [gender, setGender] = useState(user?.gender || 'Female');
  const [stateName, setStateName] = useState(user?.state || 'Karnataka');
  const [profileMsg, setProfileMsg] = useState('');
  const [profileErr, setProfileErr] = useState('');

  // Change Password States
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passMsg, setPassMsg] = useState('');
  const [passErr, setPassErr] = useState('');

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setProfileMsg('');
    setProfileErr('');

    try {
      const res = await fetch('/api/auth/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: user.identifier,
          full_name: fullName,
          avatar,
          age,
          gender,
          state: stateName
        })
      });
      const data = await res.json();
      if (!res.ok) {
        setProfileErr(data.error || 'Failed to update profile.');
      } else {
        localStorage.setItem('cybershield_user', JSON.stringify(data.user));
        if (onUserUpdate) onUserUpdate(data.user);
        setProfileMsg('Profile details saved successfully!');
      }
    } catch {
      setProfileErr('Cannot connect to server. Ensure Flask backend is running.');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPassMsg('');
    setPassErr('');

    if (newPassword.length < 4) {
      setPassErr('New password must be at least 4 characters.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setPassErr('New passwords do not match.');
      return;
    }

    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: user.identifier,
          current_password: currentPassword,
          new_password: newPassword
        })
      });
      const data = await res.json();
      if (!res.ok) {
        setPassErr(data.error || 'Could not change password.');
      } else {
        setPassMsg('Password updated successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
      }
    } catch {
      setPassErr('Cannot connect to server. Ensure Flask backend is running.');
    }
  };

  return (
    <div style={{ maxWidth: '820px', margin: '0 auto', padding: '1.5rem' }}>
      {/* Top Profile Banner */}
      <div className="card" style={{ padding: '1.5rem', marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ fontSize: '2.75rem', background: 'rgba(56,189,248,0.15)', width: '68px', height: '68px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #38bdf8' }}>
            {avatar}
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.45rem' }}>{user?.full_name}</h1>
            <p style={{ margin: '0.2rem 0 0', opacity: 0.8, fontSize: '0.9rem' }}>
              {user?.identifier} • {user?.state || 'India'} {user?.age ? `• Age ${user.age}` : ''}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onLogout}
          style={{ padding: '0.65rem 1.1rem', display: 'flex', alignItems: 'center', gap: '0.45rem', fontWeight: 'bold', border: '1px solid #ef4444', color: '#fca5a5' }}
        >
          <LogOut size={17} /> Logout
        </button>
      </div>

      {/* Edit Profile & Avatar */}
      <div className="card" style={{ padding: '1.75rem', marginBottom: '1.25rem' }}>
        <h2 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem' }}>
          <UserCheck color="#38bdf8" /> Personal Profile & Avatar
        </h2>

        {profileErr && <div style={{ color: '#fca5a5', marginBottom: '0.75rem' }}>{profileErr}</div>}
        {profileMsg && (
          <div style={{ color: '#86efac', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <CheckCircle size={16} /> {profileMsg}
          </div>
        )}

        <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '0.95rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.88rem' }}>Profile Avatar</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '0.45rem' }}>
              {AVATARS.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setAvatar(item)}
                  style={{
                    fontSize: '1.45rem',
                    padding: '0.4rem',
                    borderRadius: '8px',
                    border: avatar === item ? '2px solid #38bdf8' : '1px solid rgba(255,255,255,0.2)',
                    background: avatar === item ? 'rgba(56,189,248,0.2)' : 'transparent'
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.88rem' }}>Full Name</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: '8px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.88rem' }}>Registered Email / Phone</label>
              <input
                type="text"
                disabled
                value={user?.identifier || ''}
                style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', opacity: 0.65 }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.85rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.88rem' }}>Age</label>
              <input
                type="number"
                min="10"
                max="100"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: '8px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.88rem' }}>Gender</label>
              <select value={gender} onChange={(e) => setGender(e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px' }}>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.88rem' }}>State / UT</label>
              <select value={stateName} onChange={(e) => setStateName(e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px' }}>
                {INDIAN_STATES.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" style={{ padding: '0.7rem 1.2rem', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '0.45rem', alignSelf: 'flex-start' }}>
            <Save size={17} /> Save Profile Changes
          </button>
        </form>
      </div>

      {/* Change Password Section */}
      <div className="card" style={{ padding: '1.75rem' }}>
        <h2 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem' }}>
          <Lock color="#38bdf8" /> Change Account Password
        </h2>

        {passErr && <div style={{ color: '#fca5a5', marginBottom: '0.75rem' }}>{passErr}</div>}
        {passMsg && (
          <div style={{ color: '#86efac', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <CheckCircle size={16} /> {passMsg}
          </div>
        )}

        <form onSubmit={handleChangePassword} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.88rem' }}>Current Password</label>
            <input
              type="password"
              required
              placeholder="Enter your current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              style={{ width: '100%', padding: '0.6rem', borderRadius: '8px' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.88rem' }}>New Password</label>
              <input
                type="password"
                required
                placeholder="Min 4 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: '8px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.88rem' }}>Confirm New Password</label>
              <input
                type="password"
                required
                placeholder="Re-enter new password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: '8px' }}
              />
            </div>
          </div>

          <button type="submit" style={{ padding: '0.7rem 1.2rem', fontWeight: 'bold', alignSelf: 'flex-start' }}>
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}