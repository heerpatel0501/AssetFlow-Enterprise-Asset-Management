import React, { useState } from 'react';
import Modal from '../components/Modal';
import Toast from '../components/Toast';

const initialMaintenance = [
  { id: 'MN-904', asset: 'Dell PowerEdge R750', issue: 'Overheating / Fan Failure', priority: 'High', status: 'In Progress' },
  { id: 'MN-905', asset: 'Office Printer X1', issue: 'Paper Jam Error 42', priority: 'Low', status: 'Assigned' },
  { id: 'MN-906', asset: 'Dell Latitude 7440', issue: 'Battery Performance Reduced', priority: 'Medium', status: 'Open' },
];

export default function Maintenance() {
  const [requests, setRequests] = useState(initialMaintenance);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  const [formData, setFormData] = useState({
    asset: '', issue: '', priority: 'Medium', date: '', description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.asset || !formData.issue) return;

    const newRequest = {
      id: `MN-${Math.floor(Math.random() * 1000 + 1000)}`,
      asset: formData.asset,
      issue: formData.issue,
      priority: formData.priority,
      status: 'Open'
    };

    setRequests([newRequest, ...requests]);
    setIsModalOpen(false);
    setToastMessage('Maintenance Request Submitted Successfully');
    setFormData({ asset: '', issue: '', priority: 'Medium', date: '', description: '' });
  };

  return (
    <div className="main-content">
      <header className="animate-up">
        <h1 className="page-title">Maintenance Requests</h1>
      </header>

      <div className="actions-bar animate-up delay-1">
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>+ Raise Request</button>
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
              {requests.map((mn) => (
                <tr key={mn.id}>
                  <td style={{ fontFamily: 'monospace', color: 'var(--primary-light)' }}>{mn.id}</td>
                  <td style={{ fontWeight: 500 }}>{mn.asset}</td>
                  <td>{mn.issue}</td>
                  <td style={{ color: mn.priority === 'High' ? 'var(--danger)' : mn.priority === 'Medium' ? 'var(--warning)' : 'var(--success)' }}>{mn.priority}</td>
                  <td>
                    <span className={`status-badge ${mn.status === 'In Progress' ? 'status-maintenance' : mn.status === 'Open' ? 'status-inactive' : 'status-active'}`}>
                      {mn.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Raise Maintenance Request">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Asset *</label>
            <input required type="text" className="form-input" value={formData.asset} onChange={e => setFormData({...formData, asset: e.target.value})} placeholder="e.g. Dell Latitude 7440" />
          </div>
          <div className="form-group">
            <label className="form-label">Issue Title *</label>
            <input required type="text" className="form-input" value={formData.issue} onChange={e => setFormData({...formData, issue: e.target.value})} placeholder="e.g. Screen Flickering" />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Priority</label>
              <select className="form-input" value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value})}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Preferred Date</label>
              <input type="date" className="form-input" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea className="form-input" rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Describe the issue in detail..."></textarea>
          </div>

          <div className="form-group">
            <label className="form-label">Upload Image (Optional)</label>
            <input type="file" className="form-input" accept="image/*" />
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Submit Request</button>
          </div>
        </form>
      </Modal>

      <Toast message={toastMessage} onClose={() => setToastMessage('')} />
    </div>
  );
}
