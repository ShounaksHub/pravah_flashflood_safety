import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAppStore } from './hooks/useAppStore';
import OpeningAuthGateway from './pages/auth/OpeningAuthGateway';
import RoleGuard from './components/layout/RoleGuard';
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
  const { isAuthenticated } = useAppStore();

  return (
    <BrowserRouter>
      {!isAuthenticated ? (
        <OpeningAuthGateway />
      ) : (
        <Routes>
          <Route path="/login" element={<OpeningAuthGateway />} />

        {/* Operational Dashboard Routes */}
        <Route path="/" element={<AppShell />}>
          <Route index element={<Navigate to="/command" replace />} />
          <Route path="command" element={<CommandDashboard />} />
          <Route path="dashboard" element={<CommandDashboard />} />
          <Route path="map" element={<GISMapPage />} />
          <Route path="forecast" element={<ForecastPage />} />
          <Route path="risk" element={<RiskAssessmentPage />} />
          
          {/* Role Guarded Operational Consoles */}
          <Route path="ndrf" element={
            <RoleGuard routePath="/ndrf" requiredClearance="LEVEL 3 — TACTICAL FORCE COMMAND">
              <NDRFPage />
            </RoleGuard>
          } />
          
          <Route path="resources" element={<ResourcesPage />} />
          <Route path="roads" element={<RoadsPage />} />
          
          <Route path="catchment" element={
            <RoleGuard routePath="/catchment" requiredClearance="LEVEL 3 or LEVEL 4 COMMAND">
              <CatchmentPage />
            </RoleGuard>
          } />
          
          <Route path="alerts" element={
            <RoleGuard routePath="/alerts" requiredClearance="LEVEL 4 — STATUTORY COMMAND">
              <AlertsPage />
            </RoleGuard>
          } />
          
          <Route path="sitrep" element={
            <RoleGuard routePath="/sitrep" requiredClearance="LEVEL 4 — STATUTORY COMMAND">
              <SitRepPage />
            </RoleGuard>
          } />
          
          <Route path="reports" element={<CitizenReportsPage />} />
          
          <Route path="system" element={
            <RoleGuard routePath="/system" requiredClearance="LEVEL 4 or LEVEL 5 ROOT">
              <SystemHealthPage />
            </RoleGuard>
          } />
        </Route>

        {/* Admin Dashboard Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/command" replace />} />
      </Routes>
      )}
    </BrowserRouter>
  );
}
