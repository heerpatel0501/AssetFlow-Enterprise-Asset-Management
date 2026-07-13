import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Mic } from 'lucide-react';
import Modal from '../components/Modal';
import Toast from '../components/Toast';

const initialAssets = [
  { id: 'MAC-2026-01', name: 'MacBook Pro M3 Max', category: 'Hardware / Laptops', assignedTo: 'Sarah Jenkins', status: 'Active', age: '1.2 years' },
  { id: 'DEL-LAT-05', name: 'Dell Latitude 7440', category: 'Hardware / Laptops', assignedTo: 'Riya', status: 'Active', age: '2.5 years' },
  { id: 'SRV-DB-04', name: 'Dell PowerEdge R750', category: 'Hardware / Servers', assignedTo: 'Data Center A', status: 'Maintenance', age: '3.1 years' },
  { id: 'SFW-ADO-01', name: 'Adobe Creative Cloud', category: 'Software / Licenses', assignedTo: 'Design Team', status: 'Active', age: '0.5 years' },
];

export default function Assets({ user, isEmployeeView }) {
  const navigate = useNavigate();
  const [assets, setAssets] = useState(initialAssets);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isListening, setIsListening] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '', id: '', category: '', brand: '', assignedTo: 'Unassigned', status: 'Active'
  });

  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Browser does not support Voice Search. Try using Chrome.");
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    
    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setSearch(speechResult);
      setIsListening(false);
    };
    
    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };
    
    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  const handleRegisterAsset = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.category) return;

    const newAsset = {
      id: formData.id || `AST-${Math.floor(Math.random() * 10000)}`,
      name: formData.name,
      category: formData.category,
      assignedTo: formData.assignedTo,
      status: formData.status,
      age: '0 years'
    };

    setAssets([newAsset, ...assets]);
    setIsModalOpen(false);
    setToastMessage('Asset Registered Successfully');
    setFormData({ name: '', id: '', category: '', brand: '', assignedTo: 'Unassigned', status: 'Active' });
  };

  // Filter for employee view or search
  const filteredAssets = assets.filter(asset => {
    if (isEmployeeView && asset.assignedTo !== user?.name) return false;
    return asset.name.toLowerCase().includes(search.toLowerCase()) || 
           asset.category.toLowerCase().includes(search.toLowerCase()) ||
           asset.id.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="main-content">
      <header className="animate-up">
        <h1 className="page-title">{isEmployeeView ? 'My Assigned Assets' : 'Asset Management'}</h1>
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
        <button 
          className="btn btn-secondary" 
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem', color: isListening ? 'var(--danger)' : 'white' }} 
          onClick={handleVoiceSearch}
        >
          <Mic size={20} className={isListening ? "animate-pulse" : ""} /> {isListening ? 'Listening...' : 'Voice Search'}
        </button>
        
        {(!isEmployeeView && (user?.role === 'admin' || user?.role === 'manager')) && (
          <button className="btn btn-primary" style={{ padding: '1rem 2rem' }} onClick={() => setIsModalOpen(true)}>Register Asset</button>
        )}
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
              {filteredAssets.map((asset) => (
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
          {filteredAssets.length === 0 && (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>No assets found.</div>
          )}
        </div>
      </div>

      {/* Register Asset Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Register New Asset">
        <form onSubmit={handleRegisterAsset}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Asset Name *</label>
              <input required type="text" className="form-input" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Dell Monitor 27" />
            </div>
            <div className="form-group">
              <label className="form-label">Asset ID (Auto-generated if empty)</label>
              <input type="text" className="form-input" value={formData.id} onChange={e => setFormData({...formData, id: e.target.value})} placeholder="AST-XXXX" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Category *</label>
              <select required className="form-input" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                <option value="">Select Category</option>
                <option value="Hardware / Laptops">Hardware / Laptops</option>
                <option value="Hardware / Monitors">Hardware / Monitors</option>
                <option value="Hardware / Peripherals">Hardware / Peripherals</option>
                <option value="Software / Licenses">Software / Licenses</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Brand</label>
              <input type="text" className="form-input" value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} placeholder="e.g. Dell" />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Upload Asset Image</label>
            <input type="file" className="form-input" accept="image/*" />
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Asset</button>
          </div>
        </form>
      </Modal>

      <Toast message={toastMessage} onClose={() => setToastMessage('')} />
    </div>
  );
}
