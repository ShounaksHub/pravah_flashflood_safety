import { create } from 'zustand';
import type { Sensor } from '../types/hydrology';
import type { VillageRisk, RiskLevel } from '../types/risk';
import type { Alert } from '../types/alerts';
import type { CitizenReport, Road } from '../types/reports';
import type { NDRFTeam, DeploymentRecommendation } from '../types/alerts';
import { mockSensors } from '../data/mock/sensors';
import { mockVillages } from '../data/mock/villages';
import { mockAlerts, mockRoads } from '../data/mock/alerts';
import { mockNDRFTeams, mockDeploymentRecommendations, mockCitizenReports } from '../data/mock/ndrfTeams';
import { DEMO_ACCOUNTS, type DemoAccount } from '../data/mock/demoAccounts';
import type { UserRole } from '../types/reports';

export interface ApiEndpoint {
  id: string;
  name: string;
  url: string;
  status: 'CONNECTED' | 'DISCONNECTED' | 'ERROR';
  lastSync: string;
}

interface AppState {
  // Sensor data
  sensors: Sensor[];
  updateSensors: (sensors: Sensor[]) => void;

  // Village risk
  villages: VillageRisk[];
  updateVillages: (villages: VillageRisk[]) => void;

  // Alerts
  alerts: Alert[];
  updateAlerts: (alerts: Alert[]) => void;
  acknowledgeAlert: (id: string) => void;
  resolveAlert: (id: string) => void;
  createAlert: (alert: Omit<Alert, 'id' | 'issuedAt' | 'status'>) => string;

  // Roads
  roads: Road[];

  // NDRF
  ndrfTeams: NDRFTeam[];
  deploymentRecommendations: DeploymentRecommendation[];
  dispatchNDRFTeam: (teamId: string, village: string) => void;

  // Citizen reports
  citizenReports: CitizenReport[];
  addCitizenReport: (report: CitizenReport) => void;
  verifyCitizenReport: (id: string) => void;

  // User & Auth
  isAuthenticated: boolean;
  currentUser: DemoAccount | null;
  login: (account: DemoAccount) => void;
  logout: () => void;
  currentRole: UserRole;
  setRole: (role: UserRole) => void;

  // Simulation
  isSimulating: boolean;
  simulationPhase: number; // 0=normal, 1=escalating, 2=critical
  startSimulation: () => void;
  stopSimulation: () => void;
  advanceSimulation: () => void;

  // Connectivity
  isOnline: boolean;
  setOnline: (online: boolean) => void;

  // Sync time
  lastSync: string;
  updateLastSync: () => void;

  // Admin Auth & Config
  isAdminAuthenticated: boolean;
  setAdminAuthenticated: (auth: boolean) => void;
  
  apiEndpoints: ApiEndpoint[];
  toggleEndpointStatus: (id: string) => void;
  updateEndpointUrl: (id: string, url: string) => void;
  forceSyncEndpoint: (id: string) => void;
}

const initialEndpoints: ApiEndpoint[] = [
  { id: 'ep-1', name: 'DEMO • IMD Radar API (Sohra)', url: 'https://api.imd.gov.in/v1/radar/shillong', status: 'CONNECTED', lastSync: '1 min ago' },
  { id: 'ep-2', name: 'DEMO • CWC Hydrology Feed (Wahrew)', url: 'https://indiawater.gov.in/api/v2/gauge/wahrew', status: 'CONNECTED', lastSync: '5 mins ago' },
  { id: 'ep-3', name: 'DEMO • State PWD Road Status', url: 'https://pwd.meghalaya.gov.in/api/status/sh-11', status: 'CONNECTED', lastSync: '12 mins ago' },
  { id: 'ep-4', name: 'DEMO • NDRF Deployment Hook', url: 'https://ndrf.gov.in/webhook/deployments', status: 'CONNECTED', lastSync: 'Just now' },
];

export const useAppStore = create<AppState>((set, get) => ({
  sensors: mockSensors,
  updateSensors: (sensors) => set({ sensors }),

  villages: mockVillages,
  updateVillages: (villages) => set({ villages }),

  alerts: mockAlerts,
  updateAlerts: (alerts) => set({ alerts }),
  acknowledgeAlert: (id) => set((state) => ({
    alerts: state.alerts.map((a) => a.id === id ? { ...a, status: 'ACKNOWLEDGED' as const, acknowledgedBy: state.currentUser?.name || 'Current Officer', acknowledgedAt: new Date().toISOString() } : a),
  })),
  resolveAlert: (id) => set((state) => ({
    alerts: state.alerts.map((a) => a.id === id ? { ...a, status: 'RESOLVED' as const } : a),
  })),
  createAlert: (alert) => {
    const id = `ALT-${Date.now().toString().slice(-8)}`;
    const newAlert: Alert = { ...alert, id, issuedAt: new Date().toISOString(), status: 'ACTIVE' };
    set((state) => ({ alerts: [newAlert, ...state.alerts] }));
    return id;
  },

  roads: mockRoads,

  ndrfTeams: mockNDRFTeams,
  deploymentRecommendations: mockDeploymentRecommendations,
  dispatchNDRFTeam: (teamId, village) => set((state) => ({
    ndrfTeams: state.ndrfTeams.map((team) => team.id === teamId
      ? { ...team, status: 'EN_ROUTE' as const, assignedVillage: village, currentLocation: `En route to ${village}`, lastUpdate: new Date().toISOString() }
      : team
    ),
  })),

  citizenReports: mockCitizenReports,
  addCitizenReport: (report) => set((state) => ({
    citizenReports: [report, ...state.citizenReports],
  })),
  verifyCitizenReport: (id) => set((state) => ({
    citizenReports: state.citizenReports.map((report) => report.id === id
      ? { ...report, status: 'VERIFIED' as const, verifiedBy: state.currentUser?.name || 'Current Officer' }
      : report
    ),
  })),

  isAuthenticated: false,
  currentUser: null,
  currentRole: 'DISTRICT_EMERGENCY_OFFICER',
  login: (account) => set({
    isAuthenticated: true,
    currentUser: account,
    currentRole: account.role,
    isAdminAuthenticated: account.role === 'ADMIN',
  }),
  logout: () => set({
    isAuthenticated: false,
    currentUser: null,
    isAdminAuthenticated: false,
  }),
  setRole: (role) => {
    const matchedAccount = DEMO_ACCOUNTS.find(a => a.role === role) || null;
    set({
      currentRole: role,
      currentUser: matchedAccount,
      isAdminAuthenticated: role === 'ADMIN',
    });
  },

  isSimulating: true,
  simulationPhase: 0,
  startSimulation: () => set({ isSimulating: true }),
  stopSimulation: () => set({ isSimulating: false }),
  advanceSimulation: () => {
    const state = get();
    const phase = Math.min(state.simulationPhase + 1, 2);

    // Simulate sensor changes
    const sensors = state.sensors.map((s) => {
      let delta = (Math.random() - 0.3) * 3;
      if (phase >= 1) delta = Math.abs(delta) * (1 + phase * 0.5);
      const newValue = Math.max(0, +(s.value + delta).toFixed(1));
      const newStatus = newValue > s.threshold * 0.9 ? 'warning' as const : newValue > s.threshold ? 'warning' as const : 'online' as const;
      return { ...s, previousValue: s.value, value: newValue, status: newStatus, updatedAt: new Date().toISOString() };
    });

    // Simulate village risk changes
    const villages = state.villages.map((v) => {
      const boost = phase * 0.05;
      const newFlood = Math.min(0.99, v.floodProbability + (Math.random() - 0.3) * 0.03 + boost);
      const newSlope = Math.min(0.99, v.slopeProbability + (Math.random() - 0.3) * 0.02 + boost * 0.5);
      const combined = Math.max(newFlood, newSlope) * 0.7 + Math.min(newFlood, newSlope) * 0.3;
      let riskLevel: RiskLevel = 'LOW';
      if (combined >= 0.7) riskLevel = 'VERY_HIGH';
      else if (combined >= 0.5) riskLevel = 'HIGH';
      else if (combined >= 0.3) riskLevel = 'MEDIUM';
      const leadTime = Math.max(15, Math.round(180 * (1 - combined * 0.8)));
      return { ...v, floodProbability: +newFlood.toFixed(2), slopeProbability: +newSlope.toFixed(2), combinedScore: +combined.toFixed(2), riskLevel, leadTimeMinutes: leadTime, lastUpdated: new Date().toISOString() };
    });

    set({ sensors, villages, simulationPhase: phase, lastSync: new Date().toISOString() });
  },

  isOnline: true,
  setOnline: (online) => set({ isOnline: online }),

  lastSync: new Date().toISOString(),
  updateLastSync: () => set({ lastSync: new Date().toISOString() }),

  isAdminAuthenticated: false,
  setAdminAuthenticated: (auth) => set({ isAdminAuthenticated: auth }),

  apiEndpoints: initialEndpoints,
  toggleEndpointStatus: (id) => set((state) => ({
    apiEndpoints: state.apiEndpoints.map(ep => 
      ep.id === id 
        ? { ...ep, status: ep.status === 'CONNECTED' ? 'DISCONNECTED' : 'CONNECTED' }
        : ep
    )
  })),
  updateEndpointUrl: (id, url) => set((state) => ({
    apiEndpoints: state.apiEndpoints.map(ep => 
      ep.id === id ? { ...ep, url } : ep
    )
  })),
  forceSyncEndpoint: (id) => set((state) => ({
    apiEndpoints: state.apiEndpoints.map(ep => 
      ep.id === id ? { ...ep, lastSync: 'Just now' } : ep
    )
  })),
}));
