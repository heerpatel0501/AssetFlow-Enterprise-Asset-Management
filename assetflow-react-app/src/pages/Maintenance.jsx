import React from 'react';

const mockMaintenance = [
  { id: 'MN-904', asset: 'Dell PowerEdge R750', issue: 'Overheating / Fan Failure', priority: 'High', status: 'In Progress' },
  { id: 'MN-905', asset: 'Office Printer X1', issue: 'Paper Jam Error 42', priority: 'Low', status: 'Assigned' },
  { id: 'MN-906', asset: 'Dell Latitude 7440', issue: 'Battery Performance Reduced', priority: 'Medium', status: 'Open' },
];

export default function Maintenance() {
  return (
    <div className="main-content">
      <header className="animate-up">
        <h1 className="page-title">Maintenance Requests</h1>
      </header>

      <div className="actions-bar animate-up delay-1">
        <button className="btn btn-primary">+ Raise Request</button>
      </div>

      <div className="glass-card animate-up delay-2">
        <div className="table-container">
          <table style={{ width: '100%', textAlign: 'left' }}>
            <thead>
              <tr>
                <th>Req ID</th>
                <th>Asset</th>
                <th>Reported Issue</th>
                <th>Priority</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {mockMaintenance.map((mn) => (
                <tr key={mn.id}>
                  <td style={{ fontFamily: 'monospace', color: 'var(--primary-light)' }}>{mn.id}</td>
                  <td style={{ fontWeight: 500 }}>{mn.asset}</td>
                  <td>{mn.issue}</td>
                  <td style={{ color: mn.priority === 'High' ? 'var(--danger)' : 'var(--warning)' }}>{mn.priority}</td>
                  <td>
                    <span className={`status-badge ${mn.status === 'In Progress' ? 'status-maintenance' : 'status-inactive'}`}>
                      {mn.status}
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
