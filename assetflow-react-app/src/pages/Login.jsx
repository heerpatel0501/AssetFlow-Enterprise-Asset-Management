import React, { useState } from 'react';
import { Shield, User, Lock } from 'lucide-react';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.toLowerCase() === 'heer' || username.toLowerCase() === 'admin') {
      onLogin({ name: 'Heer Patel', role: 'admin' });
    } else if (username.toLowerCase() === 'priya' || username.toLowerCase() === 'manager') {
      onLogin({ name: 'Priya', role: 'manager' });
    } else if (username.toLowerCase() === 'rahul' || username.toLowerCase() === 'employee') {
      onLogin({ name: 'Rahul', role: 'employee' });
    } else {
      alert("Invalid credentials. Try 'heer', 'priya', or 'rahul'.");
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-dark)' }}>
      <div className="glass-card animate-up" style={{ width: '100%', maxWidth: '400px', padding: '3rem 2rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Shield size={32} color="white" />
          </div>
        </div>
        <h2 style={{ marginBottom: '0.5rem', fontSize: '1.8rem' }}>AssetFlow Login</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Enterprise Decision Center</p>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ position: 'relative' }}>
            <User size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Username (heer, priya, rahul)" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white', fontSize: '1rem' }}
              required
            />
          </div>
          <div style={{ position: 'relative' }}>
            <Lock size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="password" 
              placeholder="Password (any)" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white', fontSize: '1rem' }}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', padding: '1rem', fontSize: '1.1rem' }}>Secure Login</button>
        </form>
        
        <div style={{ marginTop: '2rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Demo Roles: <strong>heer</strong> (Admin) | <strong>priya</strong> (Manager) | <strong>rahul</strong> (Employee)
        </div>
      </div>
    </div>
  );
}
