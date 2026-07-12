import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, MonitorSmartphone, CalendarCheck, Wrench, GitPullRequest, LogOut } from 'lucide-react';

export default function Sidebar({ user, onLogout }) {
  return (
    <aside className="sidebar">
      <div className="logo" style={{ marginBottom: '1rem' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
          <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
        AssetFlow
      </div>

      <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', marginBottom: '1rem' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Logged in as</div>
        <div style={{ fontWeight: 600, color: 'var(--primary-light)' }}>{user.name}</div>
        <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', marginTop: '0.25rem', display: 'inline-block', padding: '0.1rem 0.5rem', background: 'rgba(99, 102, 241, 0.2)', borderRadius: '10px' }}>{user.role}</div>
      </div>

      <nav className="nav-items" style={{ flex: 1 }}>
        <NavLink to="/" className={({isActive}) => isActive ? "nav-item active" : "nav-item"} end>
          <LayoutDashboard size={20} /> Dashboard
        </NavLink>
        
        {/* Admin and Manager Links */}
        {(user.role === 'admin' || user.role === 'manager') && (
          <>
            <NavLink to="/workflows" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
              <GitPullRequest size={20} /> Approvals
            </NavLink>
            <NavLink to="/assets" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
              <MonitorSmartphone size={20} /> Asset Management
            </NavLink>
            <NavLink to="/maintenance" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
              <Wrench size={20} /> Maintenance
            </NavLink>
          </>
        )}

        {/* Employee Links */}
        {user.role === 'employee' && (
          <NavLink to="/my-assets" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <MonitorSmartphone size={20} /> My Assets
          </NavLink>
        )}

        {/* Shared */}
        <NavLink to="/bookings" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <CalendarCheck size={20} /> Book Resource
        </NavLink>
      </nav>

      <button className="nav-item" onClick={onLogout} style={{ border: 'none', background: 'transparent', cursor: 'pointer', width: '100%', textAlign: 'left', color: 'var(--danger)' }}>
        <LogOut size={20} /> Logout
      </button>
    </aside>
  );
}
