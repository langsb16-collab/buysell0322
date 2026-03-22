import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import PIM from './pages/PIM';
import OMS from './pages/OMS';
import Sourcing from './pages/Sourcing';
import B2B from './pages/B2B';
import Marketplace from './pages/Marketplace';
import GrowthEngine from './pages/GrowthEngine';
import { LanguageProvider } from './LanguageContext';

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/growth" element={<GrowthEngine />} />
            <Route path="/pim" element={<PIM />} />
            <Route path="/oms" element={<OMS />} />
            <Route path="/sourcing" element={<Sourcing />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/b2b" element={<B2B />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </LanguageProvider>
  );
}
