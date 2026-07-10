import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Mic } from 'lucide-react';

const mockAssets = [
  { id: 'MAC-2026-01', name: 'MacBook Pro M3 Max', category: 'Hardware / Laptops', assignedTo: 'Sarah Jenkins', status: 'Active', age: '1.2 years' },
  { id: 'DEL-LAT-05', name: 'Dell Latitude 7440', category: 'Hardware / Laptops', assignedTo: 'Riya', status: 'Active', age: '2.5 years' },
  { id: 'SRV-DB-04', name: 'Dell PowerEdge R750', category: 'Hardware / Servers', assignedTo: 'Data Center A', status: 'Maintenance', age: '3.1 years' },
  { id: 'SFW-ADO-01', name: 'Adobe Creative Cloud', category: 'Software / Licenses', assignedTo: 'Design Team', status: 'Active', age: '0.5 years' },
];

export default function Assets() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  return (
    <div className="main-content">
      <header className="animate-up">
        <h1 className="page-title">Asset Management</h1>
      </header>

      {/* Smart Search Bar */}
      <div className="glass-card animate-up delay-1" style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder='Smart Search: Try "Show Dell laptops older than 3 years"' 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white', fontSize: '1rem' }}
          />
        </div>
        <button className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem' }} onClick={() => alert("Listening for voice command...")}>
          <Mic size={20} /> Voice Search
        </button>
        <button className="btn btn-primary" style={{ padding: '1rem 2rem' }}>Register Asset</button>
      </div>

      {/* Asset Table */}
      <div className="glass-card animate-up delay-2">
        <div className="table-container">
          <table style={{ width: '100%', textAlign: 'left' }}>
            <thead>
              <tr>
                <th>Asset Tag</th>
                <th>Asset Name</th>
                <th>Category</th>
                <th>Age</th>
                <th>Assigned To</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {mockAssets.map((asset) => (
                <tr 
                  key={asset.id} 
                  style={{ cursor: 'pointer', transition: 'background 0.2s' }} 
                  onClick={() => navigate(`/asset/${asset.id}`)}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(99, 102, 241, 0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ fontFamily: 'monospace', color: 'var(--primary-light)' }}>{asset.id}</td>
                  <td style={{ fontWeight: 500 }}>{asset.name}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{asset.category}</td>
                  <td>{asset.age}</td>
                  <td>{asset.assignedTo}</td>
                  <td>
                    <span className={`status-badge ${asset.status === 'Active' ? 'status-active' : 'status-maintenance'}`}>
                      {asset.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
