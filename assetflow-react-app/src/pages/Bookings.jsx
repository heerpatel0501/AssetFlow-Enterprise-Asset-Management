import React, { useState } from 'react';
import Modal from '../components/Modal';
import Toast from '../components/Toast';

const initialBookings = [
  { id: 'BK-1002', resource: 'Meeting Room B', user: 'Riya', date: 'Today, 2:00 PM', status: 'Upcoming' },
  { id: 'BK-1003', resource: 'Company Car (Toyota)', user: 'Rahul', date: 'Tomorrow, 9:00 AM', status: 'Upcoming' },
  { id: 'BK-1004', resource: 'Projector Pro 4K', user: 'Sarah Jenkins', date: 'Today, 10:00 AM', status: 'In Progress' },
];

export default function Bookings({ user }) {
  const [bookings, setBookings] = useState(initialBookings);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const [formData, setFormData] = useState({
    resource: '', date: '', startTime: '', endTime: '', purpose: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.resource || !formData.date || !formData.startTime || !formData.endTime) return;

    if (formData.endTime <= formData.startTime) {
      alert("End time must be after start time.");
      return;
    }

    const newBooking = {
      id: `BK-${Math.floor(Math.random() * 1000 + 2000)}`,
      resource: formData.resource,
      user: user ? user.name : 'Employee',
      date: `${formData.date}, ${formData.startTime}`,
      status: 'Upcoming'
    };

    setBookings([newBooking, ...bookings]);
    setIsModalOpen(false);
    setToastMessage('Resource Booked Successfully');
    setFormData({ resource: '', date: '', startTime: '', endTime: '', purpose: '' });
  };

  return (
    <div className="main-content">
      <header className="animate-up">
        <h1 className="page-title">Resource Bookings</h1>
      </header>

      <div className="actions-bar animate-up delay-1">
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>+ New Booking</button>
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
              {bookings.map((bk) => (
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Book a Resource">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Resource *</label>
            <select required className="form-input" value={formData.resource} onChange={e => setFormData({...formData, resource: e.target.value})}>
              <option value="">Select Resource</option>
              <option value="Meeting Room A">Meeting Room A</option>
              <option value="Meeting Room B">Meeting Room B</option>
              <option value="Projector Pro 4K">Projector Pro 4K</option>
              <option value="Company Car (Toyota)">Company Car (Toyota)</option>
              <option value="Conference Hall">Conference Hall</option>
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">Booking Date *</label>
            <input required type="date" className="form-input" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Start Time *</label>
              <input required type="time" className="form-input" value={formData.startTime} onChange={e => setFormData({...formData, startTime: e.target.value})} />
            </div>
            <div className="form-group">
              <label className="form-label">End Time *</label>
              <input required type="time" className="form-input" value={formData.endTime} onChange={e => setFormData({...formData, endTime: e.target.value})} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Purpose</label>
            <input type="text" className="form-input" value={formData.purpose} onChange={e => setFormData({...formData, purpose: e.target.value})} placeholder="e.g. Client Meeting" />
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Book Resource</button>
          </div>
        </form>
      </Modal>

      <Toast message={toastMessage} onClose={() => setToastMessage('')} />
    </div>
  );
}
