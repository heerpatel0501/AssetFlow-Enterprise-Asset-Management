import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, BarChart3, AlertTriangle, FileWarning, Zap, CheckSquare, MonitorSmartphone, CalendarCheck, Clock, ShieldCheck } from 'lucide-react';

export default function Dashboard({ user }) {
  const navigate = useNavigate();

  if (user.role === 'employee') {
    return (
      <div className="main-content">
        <header className="animate-up">
          <h1 className="page-title">Employee Portal</h1>
          <div className="user-profile">
            <div className="avatar"></div>
            <div className="user-info">
              <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{user.name}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>IT Department</div>
            </div>
          </div>
        </header>

        {/* Employee Metrics Bar */}
        <div className="dashboard-grid animate-up delay-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
          <div className="glass-card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--primary-light)' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MonitorSmartphone size={16} /> Assets Assigned
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 700 }}>2</div>
            <div style={{ color: 'var(--success)', fontSize: '0.8rem', marginTop: '0.5rem' }}>All in Good Health</div>
          </div>
          
          <div className="glass-card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--warning)' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={16} /> Pending Maintenance
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 700 }}>0</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.5rem' }}>No open tickets</div>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--success)' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CalendarCheck size={16} /> Upcoming Bookings
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 700 }}>1</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.5rem' }}>Company Car (Tomorrow)</div>
          </div>
        </div>

        {/* Quick Action Hub */}
        <h3 className="animate-up delay-2" style={{ marginBottom: '1.5rem' }}>Quick Actions</h3>
        <div className="dashboard-grid animate-up delay-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div 
            className="glass-card" 
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '3rem', cursor: 'pointer', transition: 'all 0.3s' }} 
            onClick={() => navigate('/my-assets')}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--primary-light)'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
          >
            <ShieldCheck size={48} color="var(--primary-light)" style={{ marginBottom: '1rem' }} />
            <h2 style={{ marginBottom: '0.5rem' }}>Manage My Assets</h2>
            <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>View warranty details, request repairs, or return devices.</p>
          </div>
          
          <div 
            className="glass-card" 
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '3rem', cursor: 'pointer', transition: 'all 0.3s' }} 
            onClick={() => navigate('/bookings')}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--success)'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
          >
            <CalendarCheck size={48} color="var(--success)" style={{ marginBottom: '1rem' }} />
            <h2 style={{ marginBottom: '0.5rem' }}>Book a Resource</h2>
            <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>Reserve meeting rooms, vehicles, or shared projectors.</p>
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
