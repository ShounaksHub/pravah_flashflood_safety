import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import CommandDashboard from './pages/CommandDashboard';
import GISMapPage from './pages/GISMapPage';
import ForecastPage from './pages/ForecastPage';
import RiskAssessmentPage from './pages/RiskAssessmentPage';
import NDRFPage from './pages/NDRFPage';
import ResourcesPage from './pages/ResourcesPage';
import RoadsPage from './pages/RoadsPage';
import CatchmentPage from './pages/CatchmentPage';
import AlertsPage from './pages/AlertsPage';
import SitRepPage from './pages/SitRepPage';
import CitizenReportsPage from './pages/CitizenReportsPage';
import SystemHealthPage from './pages/SystemHealthPage';
import AdminLayout from './components/layout/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Operational Dashboard Routes */}
        <Route path="/" element={<AppShell />}>
          <Route index element={<Navigate to="/command" replace />} />
          <Route path="command" element={<CommandDashboard />} />
          <Route path="dashboard" element={<CommandDashboard />} />
          <Route path="map" element={<GISMapPage />} />
          <Route path="forecast" element={<ForecastPage />} />
          <Route path="risk" element={<RiskAssessmentPage />} />
          <Route path="ndrf" element={<NDRFPage />} />
          <Route path="resources" element={<ResourcesPage />} />
          <Route path="roads" element={<RoadsPage />} />
          <Route path="catchment" element={<CatchmentPage />} />
          <Route path="alerts" element={<AlertsPage />} />
          <Route path="sitrep" element={<SitRepPage />} />
          <Route path="reports" element={<CitizenReportsPage />} />
          <Route path="system" element={<SystemHealthPage />} />
        </Route>

        {/* Admin Dashboard Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/command" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
