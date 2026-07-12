import React from 'react';
import { ShieldAlert, BarChart3, AlertTriangle, FileWarning, Zap, CheckSquare, MonitorSmartphone, CalendarCheck } from 'lucide-react';

export default function Dashboard({ user }) {
  
  if (user.role === 'employee') {
    return (
      <div className="main-content">
        <header className="animate-up">
          <h1 className="page-title">Employee Portal</h1>
        </header>
        <div className="dashboard-grid animate-up delay-1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '3rem', cursor: 'pointer' }} onClick={() => alert("Redirecting to your assets...")}>
            <MonitorSmartphone size={48} color="var(--primary)" style={{ marginBottom: '1rem' }} />
            <h2 style={{ marginBottom: '0.5rem' }}>View My Assigned Assets</h2>
            <p style={{ color: 'var(--text-muted)' }}>You have 2 items assigned to you.</p>
          </div>
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '3rem', cursor: 'pointer' }} onClick={() => alert("Opening booking modal...")}>
            <CalendarCheck size={48} color="var(--success)" style={{ marginBottom: '1rem' }} />
            <h2 style={{ marginBottom: '0.5rem' }}>Book a Resource</h2>
            <p style={{ color: 'var(--text-muted)' }}>Reserve meeting rooms or projectors.</p>
          </div>
        </div>
      </div>
    );
  }

  // Admin & Manager Dashboard (Enterprise Decision Center)
  return (
    <div className="main-content">
      <header className="animate-up">
        <h1 className="page-title">Enterprise Decision Center</h1>
        <div className="user-profile">
          <div className="avatar"></div>
          <div className="user-info">
            <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{user.name}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>{user.role} Role</div>
          </div>
        </div>
      </header>

      {/* Critical Alerts Bar */}
      <div className="dashboard-grid animate-up delay-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <div className="glass-card" style={{ padding: '1rem', borderLeft: '4px solid var(--danger)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <AlertTriangle color="var(--danger)" size={32} />
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>7 Assets</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Overdue for Return</div>
          </div>
        </div>
        <div className="glass-card" style={{ padding: '1rem', borderLeft: '4px solid var(--warning)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <FileWarning color="var(--warning)" size={32} />
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>3 Resources</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Double Booking Conflicts</div>
          </div>
        </div>
        <div className="glass-card" style={{ padding: '1rem', borderLeft: '4px solid var(--primary-light)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <ShieldAlert color="var(--primary-light)" size={32} />
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>2 Audits</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Pending Manager Verification</div>
          </div>
        </div>
        <div className="glass-card" style={{ padding: '1rem', borderLeft: '4px solid var(--success)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Zap color="var(--success)" size={32} />
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>₹2.4L</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Assets Under Repair</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        
        {/* Quarterly Audit Heatmap - Only Admin sees full details easily */}
        <div className="glass-card animate-up delay-2">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <BarChart3 size={20} /> Quarterly Audit Cycle Heatmap
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                <span>IT Department</span>
                <span style={{ color: 'var(--success)', fontWeight: 600 }}>85% Verified</span>
              </div>
              <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '85%', height: '100%', background: 'var(--success)' }}></div>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                <span>HR Department</span>
                <span style={{ color: 'var(--danger)', fontWeight: 600 }}>20% Verified</span>
              </div>
              <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '20%', height: '100%', background: 'var(--danger)' }}></div>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                <span>Sales Department</span>
                <span style={{ color: 'var(--warning)', fontWeight: 600 }}>45% Verified</span>
              </div>
              <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '45%', height: '100%', background: 'var(--warning)' }}></div>
              </div>
            </div>
          </div>
          <button 
            className="btn btn-secondary" 
            style={{ width: '100%', marginTop: '1.5rem' }}
            onClick={() => alert("Loading Discrepancy Report from database...")}
          >
            View Audit Discrepancy Report
          </button>
        </div>

        {/* Automatic Decision Engine Log */}
        <div className="glass-card animate-up delay-2">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <CheckSquare size={20} /> Automatic Decision Engine
          </h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '1rem', borderRadius: '12px', borderLeft: '3px solid var(--primary)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Just Now</div>
              <strong>Auto-Created Maintenance Request</strong>
              <div style={{ fontSize: '0.9rem', marginTop: '0.25rem' }}>Employee returned laptop marked as "Damaged". Skipped human review.</div>
            </li>
            <li style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '1rem', borderRadius: '12px', borderLeft: '3px solid var(--primary)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>2 hours ago</div>
              <strong>Auto-Notified Manager</strong>
              <div style={{ fontSize: '0.9rem', marginTop: '0.25rem' }}>5 warranties expire this week in IT Dept. Automated renewal reminder sent.</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
