import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, MonitorSmartphone, CalendarCheck, Wrench, GitPullRequest } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
          <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
        AssetFlow
      </div>
      <nav className="nav-items">
        <NavLink to="/" className={({isActive}) => isActive ? "nav-item active" : "nav-item"} end>
          <LayoutDashboard size={20} /> Decision Center
        </NavLink>
        <NavLink to="/workflows" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <GitPullRequest size={20} /> Approvals
        </NavLink>
        <NavLink to="/assets" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <MonitorSmartphone size={20} /> Assets
        </NavLink>
        <NavLink to="/bookings" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <CalendarCheck size={20} /> Bookings
        </NavLink>
        <NavLink to="/maintenance" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <Wrench size={20} /> Maintenance
        </NavLink>
      </nav>
    </aside>
  );
}
