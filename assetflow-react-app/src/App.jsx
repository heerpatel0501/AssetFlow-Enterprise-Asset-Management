import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Assets from './pages/Assets';
import AssetPassport from './pages/AssetPassport';
import Bookings from './pages/Bookings';
import Maintenance from './pages/Maintenance';
import Workflows from './pages/Workflows';
import Login from './pages/Login';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Try to load user from local storage
    const savedUser = localStorage.getItem('assetflow_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('assetflow_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('assetflow_user');
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <BrowserRouter>
      <div style={{ display: 'flex', width: '100%' }}>
        <Sidebar user={user} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Dashboard user={user} />} />
          
          {/* Admin / Manager Routes */}
          {(user.role === 'admin' || user.role === 'manager') && (
            <>
              <Route path="/workflows" element={<Workflows user={user} />} />
              <Route path="/assets" element={<Assets user={user} />} />
              <Route path="/asset/:id" element={<AssetPassport user={user} />} />
              <Route path="/maintenance" element={<Maintenance user={user} />} />
            </>
          )}

          {/* Employee Routes (Restricted) */}
          {user.role === 'employee' && (
            <>
              <Route path="/my-assets" element={<Assets user={user} isEmployeeView />} />
            </>
          )}

          {/* Shared Routes */}
          <Route path="/bookings" element={<Bookings user={user} />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
