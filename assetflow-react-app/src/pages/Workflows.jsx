import React, { useState } from 'react';
import { GitPullRequest, Settings, CheckCircle, XCircle } from 'lucide-react';

export default function Workflows() {
  const [transferStatus, setTransferStatus] = useState('Pending');

  const handleApprove = () => {
    setTransferStatus('Approved');
    alert("Transfer Request Approved! Database synced and Rahul has been notified.");
  };

  const handleReject = () => {
    setTransferStatus('Rejected');
    alert("Transfer Request Rejected! Priya keeps the asset.");
  };

  return (
    <div className="main-content">
      <header className="animate-up">
        <h1 className="page-title">Enterprise Workflows & Approvals</h1>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
        
        {/* Conflict Resolution Queue */}
        <div className="glass-card animate-up delay-1">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: 'var(--warning)' }}>
            <GitPullRequest size={20} /> Conflict Resolution Queue
          </h3>
          
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid var(--warning)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <strong style={{ fontSize: '1.1rem' }}>Asset Allocation Conflict</strong>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>Asset: MacBook Pro (MAC-2026-01)</div>
              </div>
              <span className={`status-badge ${transferStatus === 'Pending' ? 'status-maintenance' : transferStatus === 'Approved' ? 'status-active' : 'status-inactive'}`}>
                {transferStatus === 'Pending' ? 'Pending Manager Approval' : transferStatus}
              </span>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '1rem', alignItems: 'center', background: 'var(--bg-dark)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Currently With</div>
                <strong>Sarah Jenkins</strong>
              </div>
              <div style={{ color: 'var(--primary-light)' }}>➔ Transfer Request ➔</div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Requested By</div>
                <strong>Rahul (IT)</strong>
              </div>
            </div>
            
            {transferStatus === 'Pending' && (
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button className="btn btn-primary" onClick={handleApprove} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={16} /> Approve Transfer</button>
                <button className="btn btn-secondary" onClick={handleReject} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--danger)', borderColor: 'var(--danger)' }}><XCircle size={16} /> Reject</button>
              </div>
            )}
          </div>
        </div>

        {/* Smart Approval Rules */}
        <div className="glass-card animate-up delay-2">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: 'var(--primary-light)' }}>
            <Settings size={20} /> Smart Approval Engine Rules
          </h3>
          <div className="table-container">
            <table style={{ width: '100%', textAlign: 'left' }}>
              <thead>
                <tr>
                  <th>Trigger Condition</th>
                  <th>Automated Action</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Asset Value &gt; ₹80,000</td>
                  <td>Require Dept Head + Asset Manager Approval</td>
                  <td><span className="status-badge status-active">Active</span></td>
                </tr>
                <tr>
                  <td>Asset Returned marked "Damaged"</td>
                  <td>Auto-Create Maintenance Request (Priority: High)</td>
                  <td><span className="status-badge status-active">Active</span></td>
                </tr>
                <tr>
                  <td>Warranty Expires in &lt; 30 Days</td>
                  <td>Auto-Notify IT Manager</td>
                  <td><span className="status-badge status-active">Active</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
