import React from 'react';

const mockBookings = [
  { id: 'BK-1002', resource: 'Meeting Room B', user: 'Riya', date: 'Today, 2:00 PM', status: 'Upcoming' },
  { id: 'BK-1003', resource: 'Company Car (Toyota)', user: 'Rahul', date: 'Tomorrow, 9:00 AM', status: 'Upcoming' },
  { id: 'BK-1004', resource: 'Projector Pro 4K', user: 'Sarah Jenkins', date: 'Today, 10:00 AM', status: 'In Progress' },
];

export default function Bookings() {
  return (
    <div className="main-content">
      <header className="animate-up">
        <h1 className="page-title">Resource Bookings</h1>
      </header>

      <div className="actions-bar animate-up delay-1">
        <button className="btn btn-primary">+ New Booking</button>
      </div>

      <div className="glass-card animate-up delay-2">
        <div className="table-container">
          <table style={{ width: '100%', textAlign: 'left' }}>
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Resource</th>
                <th>Booked By</th>
                <th>Date & Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {mockBookings.map((bk) => (
                <tr key={bk.id}>
                  <td style={{ fontFamily: 'monospace', color: 'var(--primary-light)' }}>{bk.id}</td>
                  <td style={{ fontWeight: 500 }}>{bk.resource}</td>
                  <td>{bk.user}</td>
                  <td>{bk.date}</td>
                  <td>
                    <span className={`status-badge ${bk.status === 'In Progress' ? 'status-active' : 'status-maintenance'}`}>
                      {bk.status}
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
