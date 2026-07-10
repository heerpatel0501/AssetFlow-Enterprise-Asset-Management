import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Stethoscope, Leaf, ShieldAlert, Cpu, Activity, Clock, CheckCircle } from 'lucide-react';

export default function AssetPassport() {
  const { id } = useParams();
  const navigate = useNavigate();

  const isDell = id === 'DEL-LAT-05';
  
  return (
    <div className="main-content">
      <header className="animate-up">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button className="btn btn-secondary" onClick={() => navigate('/assets')} style={{ padding: '0.5rem' }}>
            <ArrowLeft size={20} />
          </button>
          <h1 className="page-title">Digital Asset Passport</h1>
        </div>
      </header>

      {/* Top Section: Details & Doctor */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr', gap: '1.5rem', marginBottom: '2rem' }}>
        
        {/* Profile Card */}
        <div className="glass-card animate-up delay-1">
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <div style={{ width: '120px', height: '120px', background: 'rgba(255,255,255,0.05)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Cpu size={64} color="var(--primary-light)" />
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{isDell ? 'Dell Latitude 7440' : 'MacBook Pro M3 Max'}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', color: 'var(--text-muted)' }}>
                <div><strong>ID:</strong> {id}</div>
                <div><strong>Assigned To:</strong> {isDell ? 'Riya' : 'Sarah Jenkins'}</div>
                <div><strong>Purchased:</strong> 15 Jan 2023</div>
                <div><strong>Age:</strong> {isDell ? '2.5 years' : '1.2 years'}</div>
                <div><strong>Maintenance:</strong> {isDell ? '2 Times' : '0 Times'}</div>
                <div><strong>Warranty:</strong> Ends in {isDell ? '84 Days' : '200 Days'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Rule-Based Asset Health Engine */}
        <div className="glass-card animate-up delay-2" style={{ borderLeft: '4px solid var(--warning)' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--warning)' }}>
            <Activity size={20} /> Asset Health Score Engine
          </h3>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1rem' }}>
            <div style={{ fontSize: '3rem', fontWeight: 700, color: isDell ? 'var(--warning)' : 'var(--success)' }}>
              {isDell ? '76' : '98'}<span style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}>/100</span>
            </div>
            
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Age Factor:</span> <span style={{ color: 'var(--warning)' }}>-10 pts</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Repairs (x2):</span> <span style={{ color: 'var(--danger)' }}>-14 pts</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Audit Condition:</span> <span style={{ color: 'var(--success)' }}>+0 pts</span>
              </div>
            </div>
          </div>
          
          {isDell && (
            <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '1rem', borderRadius: '12px' }}>
              <strong style={{ display: 'block', marginBottom: '0.25rem', color: 'var(--warning)' }}>Recommendation:</strong>
              Score dropping due to recurring repairs. Consider replacing battery within 30 days to improve health by +15 pts.
            </div>
          )}
        </div>
      </div>

      {/* Beautiful Timeline (Deep ERP History) */}
      <div className="glass-card animate-up delay-3" style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '2rem' }}>Complete Lifecycle History (ERP Audit Trail)</h3>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '24px', left: '0', right: '0', height: '2px', background: 'rgba(255,255,255,0.1)', zIndex: 0 }}></div>
          
          {[
            { step: 'Purchased', desc: 'Jan 2023', active: true },
            { step: 'Allocated to Raj', desc: 'Feb 2023', active: true },
            { step: 'Maintenance', desc: 'Aug 2024', active: true },
            { step: 'Transferred to Riya', desc: 'Dec 2024', active: true },
            { step: 'Audit Verified', desc: 'Feb 2025', active: true },
            { step: 'Retirement', desc: 'Predicted 2027', active: false },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1, width: '120px' }}>
              <div style={{ 
                width: '50px', height: '50px', borderRadius: '50%', 
                background: item.active ? 'var(--primary)' : 'var(--bg-dark)',
                border: item.active ? 'none' : '2px solid rgba(255,255,255,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '1rem',
                boxShadow: item.active ? '0 0 20px rgba(99, 102, 241, 0.4)' : 'none'
              }}>
                {item.active ? <CheckCircle size={24} color="white" /> : <Clock size={24} color="rgba(255,255,255,0.3)" />}
              </div>
              <div style={{ fontWeight: 600, textAlign: 'center', fontSize: '0.9rem', color: item.active ? 'white' : 'var(--text-muted)' }}>{item.step}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}
