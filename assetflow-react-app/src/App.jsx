import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Assets from './pages/Assets';
import AssetPassport from './pages/AssetPassport';
import Bookings from './pages/Bookings';
import Maintenance from './pages/Maintenance';
import Workflows from './pages/Workflows';

function App() {
  return (
    <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/workflows" element={<Workflows />} />
        <Route path="/assets" element={<Assets />} />
        <Route path="/asset/:id" element={<AssetPassport />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/maintenance" element={<Maintenance />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
