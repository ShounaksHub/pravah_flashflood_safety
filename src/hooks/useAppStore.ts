import { create } from 'zustand';
import type { Sensor } from '../types/hydrology';
import type { VillageRisk } from '../types/risk';
import type { Alert } from '../types/alerts';
import type { CitizenReport, Road } from '../types/reports';
import type { NDRFTeam, DeploymentRecommendation } from '../types/alerts';
import { mockSensors } from '../data/mock/sensors';
import { mockVillages } from '../data/mock/villages';
import { mockAlerts, mockRoads } from '../data/mock/alerts';
import { mockNDRFTeams, mockDeploymentRecommendations, mockCitizenReports } from '../data/mock/ndrfTeams';
import { DEMO_ACCOUNTS, type DemoAccount } from '../data/mock/demoAccounts';
import type { UserRole } from '../types/reports';
import {
  type ScenarioPhase,
  type ScenarioMode,
  type ScenarioStatus,
  type ScenarioEvent,
  applyScenarioPhase,
} from '../data/scenarios/flashFloodScenario';

export interface ApiEndpoint {
  id: string;
  name: string;
  url: string;
  status: 'CONNECTED' | 'DISCONNECTED' | 'ERROR';
  lastSync: string;
}

interface AppState {
  // Scenario Simulator State Machine
  scenarioMode: ScenarioMode;
  scenarioStatus: ScenarioStatus;
  scenarioPhase: ScenarioPhase;
  scenarioElapsedSeconds: number;
  scenarioEventLog: ScenarioEvent[];
  catchmentActiveStage: number;

  startScenario: (mode?: ScenarioMode) => void;
  pauseScenario: () => void;
  resumeScenario: () => void;
  advanceScenario: () => void;
  jumpToPhase: (phase: ScenarioPhase) => void;
  resetScenario: () => void;
  setScenarioMode: (mode: ScenarioMode) => void;
  setCatchmentActiveStage: (stage: number) => void;

  // Sensor data
  sensors: Sensor[];
  updateSensors: (sensors: Sensor[]) => void;

  // Village risk
  villages: VillageRisk[];
  updateVillages: (villages: VillageRisk[]) => void;

  // Alerts
  alerts: Alert[];
  updateAlerts: (alerts: Alert[]) => void;
  addAlert: (alert: Alert) => void;
  acknowledgeAlert: (id: string) => void;
  resolveAlert: (id: string) => void;
  createAlert: (alert: Omit<Alert, 'id' | 'issuedAt' | 'status'>) => string;

  // Roads
  roads: Road[];

  // NDRF
  ndrfTeams: NDRFTeam[];
  deploymentRecommendations: DeploymentRecommendation[];
  deployNDRFTeam: (teamId: string, targetLocation?: string) => void;
  dispatchNDRFTeam: (teamId: string, village: string) => void;

  // Citizen reports
  citizenReports: CitizenReport[];
  addCitizenReport: (report: CitizenReport) => void;
  verifyCitizenReport: (id: string, verifiedBy?: string) => void;

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

let scenarioIntervalId: ReturnType<typeof setInterval> | null = null;

const initialSensorsSnapshot = JSON.stringify(mockSensors);
const initialVillagesSnapshot = JSON.stringify(mockVillages);
const initialAlertsSnapshot = JSON.stringify(mockAlerts);
const initialRoadsSnapshot = JSON.stringify(mockRoads);
const initialNDRFTeamsSnapshot = JSON.stringify(mockNDRFTeams);
const initialRecommendationsSnapshot = JSON.stringify(mockDeploymentRecommendations);

export const useAppStore = create<AppState>((set, get) => ({
  sensors: mockSensors,
  updateSensors: (sensors) => set({ sensors }),

  villages: mockVillages,
  updateVillages: (villages) => set({ villages }),

  alerts: mockAlerts,
  updateAlerts: (alerts) => set({ alerts }),
  addAlert: (alert) => set((state) => ({
    alerts: [alert, ...state.alerts],
  })),
  acknowledgeAlert: (id) => set((state) => ({
    alerts: state.alerts.map((a) => a.id === id ? {
      ...a,
      status: 'ACKNOWLEDGED' as const,
      acknowledgedBy: state.currentUser?.name || 'Current Officer',
      acknowledgedAt: new Date().toISOString()
    } : a),
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
  deployNDRFTeam: (teamNameOrId, targetLocation) => set((state) => ({
    ndrfTeams: state.ndrfTeams.map(t => (t.id === teamNameOrId || t.name.toLowerCase().includes(teamNameOrId.toLowerCase())) ? {
      ...t,
      status: 'DEPLOYED' as const,
      currentLocation: targetLocation || 'En Route (SH-11 Detour)',
    } : t),
    deploymentRecommendations: state.deploymentRecommendations.map(r => (r.nearestTeam.toLowerCase().includes(teamNameOrId.toLowerCase()) || r.village.toLowerCase().includes(teamNameOrId.toLowerCase())) ? {
      ...r,
      recommendedAction: 'Unit deployed and en route to sector',
    } : r),
  })),
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
  verifyCitizenReport: (id, verifiedBy) => set((state) => ({
    citizenReports: state.citizenReports.map(r => r.id === id ? {
      ...r,
      status: 'VERIFIED' as const,
      verifiedBy: verifiedBy || state.currentUser?.name || 'Current Officer',
      verifiedAt: new Date().toISOString(),
    } : r),
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

  // Scenario State Machine
  scenarioMode: 'GUIDED',
  scenarioStatus: 'IDLE',
  scenarioPhase: 0,
  scenarioElapsedSeconds: 0,
  scenarioEventLog: [
    {
      id: 'evt-init',
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }),
      timeOffsetSec: 0,
      phase: 0,
      title: 'Operational Baseline Initialized',
      detail: 'Multi-source telemetry network operational • East Khasi Hills EOC monitoring active',
      type: 'system',
    },
  ],
  catchmentActiveStage: 0,

  startScenario: (mode) => {
    if (scenarioIntervalId) {
      clearInterval(scenarioIntervalId);
      scenarioIntervalId = null;
    }

    const currentMode = mode || get().scenarioMode;
    const isFresh = get().scenarioPhase === 0 && get().scenarioElapsedSeconds === 0;

    let currentState = get();
    if (isFresh) {
      const result = applyScenarioPhase(0, currentState, 0);
      set({
        sensors: result.sensors,
        villages: result.villages,
        alerts: result.alerts,
        roads: result.roads,
        ndrfTeams: result.ndrfTeams,
        deploymentRecommendations: result.deploymentRecommendations,
        catchmentActiveStage: 0,
        scenarioEventLog: [...result.newEvents, ...currentState.scenarioEventLog].slice(0, 50),
        lastSync: new Date().toISOString(),
      });
      currentState = get();
    }

    set({
      scenarioMode: currentMode,
      scenarioStatus: 'RUNNING',
    });

    if (currentMode === 'GUIDED') {
      scenarioIntervalId = setInterval(() => {
        const state = get();
        if (state.scenarioStatus !== 'RUNNING') return;

        const newElapsed = state.scenarioElapsedSeconds + 1;
        const currentPhase = state.scenarioPhase;

        let targetPhase: ScenarioPhase = currentPhase;
        if (currentPhase === 0 && newElapsed >= 5) {
          targetPhase = 1;
        } else if (currentPhase === 1 && newElapsed >= 15) {
          targetPhase = 2;
        } else if (currentPhase === 2 && newElapsed >= 25) {
          targetPhase = 3;
        } else if (currentPhase === 3 && newElapsed >= 35) {
          if (scenarioIntervalId) {
            clearInterval(scenarioIntervalId);
            scenarioIntervalId = null;
          }
          set({
            scenarioStatus: 'COMPLETED',
            scenarioElapsedSeconds: 35,
            lastSync: new Date().toISOString(),
          });
          return;
        }

        if (targetPhase !== currentPhase) {
          const result = applyScenarioPhase(targetPhase, state, newElapsed);
          set({
            scenarioPhase: targetPhase,
            scenarioElapsedSeconds: newElapsed,
            sensors: result.sensors,
            villages: result.villages,
            alerts: result.alerts,
            roads: result.roads,
            ndrfTeams: result.ndrfTeams,
            deploymentRecommendations: result.deploymentRecommendations,
            catchmentActiveStage: targetPhase,
            scenarioEventLog: [...result.newEvents, ...state.scenarioEventLog].slice(0, 50),
            lastSync: new Date().toISOString(),
          });
        } else {
          set({ scenarioElapsedSeconds: newElapsed });
        }
      }, 1000);
    }
  },

  pauseScenario: () => {
    if (scenarioIntervalId) {
      clearInterval(scenarioIntervalId);
      scenarioIntervalId = null;
    }
    set({ scenarioStatus: 'PAUSED' });
  },

  resumeScenario: () => {
    const { scenarioMode } = get();
    set({ scenarioStatus: 'RUNNING' });

    if (scenarioIntervalId) {
      clearInterval(scenarioIntervalId);
      scenarioIntervalId = null;
    }

    if (scenarioMode === 'GUIDED') {
      scenarioIntervalId = setInterval(() => {
        const state = get();
        if (state.scenarioStatus !== 'RUNNING') return;

        const newElapsed = state.scenarioElapsedSeconds + 1;
        const currentPhase = state.scenarioPhase;

        let targetPhase: ScenarioPhase = currentPhase;
        if (currentPhase === 0 && newElapsed >= 5) {
          targetPhase = 1;
        } else if (currentPhase === 1 && newElapsed >= 15) {
          targetPhase = 2;
        } else if (currentPhase === 2 && newElapsed >= 25) {
          targetPhase = 3;
        } else if (currentPhase === 3 && newElapsed >= 35) {
          if (scenarioIntervalId) {
            clearInterval(scenarioIntervalId);
            scenarioIntervalId = null;
          }
          set({
            scenarioStatus: 'COMPLETED',
            scenarioElapsedSeconds: 35,
            lastSync: new Date().toISOString(),
          });
          return;
        }

        if (targetPhase !== currentPhase) {
          const result = applyScenarioPhase(targetPhase, state, newElapsed);
          set({
            scenarioPhase: targetPhase,
            scenarioElapsedSeconds: newElapsed,
            sensors: result.sensors,
            villages: result.villages,
            alerts: result.alerts,
            roads: result.roads,
            ndrfTeams: result.ndrfTeams,
            deploymentRecommendations: result.deploymentRecommendations,
            catchmentActiveStage: targetPhase,
            scenarioEventLog: [...result.newEvents, ...state.scenarioEventLog].slice(0, 50),
            lastSync: new Date().toISOString(),
          });
        } else {
          set({ scenarioElapsedSeconds: newElapsed });
        }
      }, 1000);
    }
  },

  advanceScenario: () => {
    const state = get();
    const nextPhase = (Math.min(state.scenarioPhase + 1, 3)) as ScenarioPhase;
    const phaseOffsetSec = nextPhase === 1 ? 5 : nextPhase === 2 ? 15 : 25;
    const result = applyScenarioPhase(nextPhase, state, phaseOffsetSec);

    set({
      scenarioPhase: nextPhase,
      scenarioElapsedSeconds: phaseOffsetSec,
      scenarioStatus: nextPhase === 3 ? 'COMPLETED' : state.scenarioStatus === 'IDLE' ? 'PAUSED' : state.scenarioStatus,
      sensors: result.sensors,
      villages: result.villages,
      alerts: result.alerts,
      roads: result.roads,
      ndrfTeams: result.ndrfTeams,
      deploymentRecommendations: result.deploymentRecommendations,
      catchmentActiveStage: nextPhase,
      scenarioEventLog: [...result.newEvents, ...state.scenarioEventLog].slice(0, 50),
      lastSync: new Date().toISOString(),
    });
  },

  jumpToPhase: (phase: ScenarioPhase) => {
    const state = get();
    const phaseOffsetSec = phase === 0 ? 0 : phase === 1 ? 5 : phase === 2 ? 15 : 25;
    const result = applyScenarioPhase(phase, state, phaseOffsetSec);

    set({
      scenarioPhase: phase,
      scenarioElapsedSeconds: phaseOffsetSec,
      scenarioStatus: phase === 3 ? 'COMPLETED' : state.scenarioStatus === 'IDLE' ? 'PAUSED' : state.scenarioStatus,
      sensors: result.sensors,
      villages: result.villages,
      alerts: result.alerts,
      roads: result.roads,
      ndrfTeams: result.ndrfTeams,
      deploymentRecommendations: result.deploymentRecommendations,
      catchmentActiveStage: phase,
      scenarioEventLog: [...result.newEvents, ...state.scenarioEventLog].slice(0, 50),
      lastSync: new Date().toISOString(),
    });
  },

  resetScenario: () => {
    if (scenarioIntervalId) {
      clearInterval(scenarioIntervalId);
      scenarioIntervalId = null;
    }

    set({
      sensors: JSON.parse(initialSensorsSnapshot),
      villages: JSON.parse(initialVillagesSnapshot),
      alerts: JSON.parse(initialAlertsSnapshot),
      roads: JSON.parse(initialRoadsSnapshot),
      ndrfTeams: JSON.parse(initialNDRFTeamsSnapshot),
      deploymentRecommendations: JSON.parse(initialRecommendationsSnapshot),
      scenarioStatus: 'IDLE',
      scenarioPhase: 0,
      scenarioElapsedSeconds: 0,
      catchmentActiveStage: 0,
      scenarioEventLog: [
        {
          id: `evt-reset-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }),
          timeOffsetSec: 0,
          phase: 0,
          title: 'Simulation Reset to Baseline',
          detail: 'Pristine mock telemetry restored • Baseline monitoring active across East Khasi Hills',
          type: 'system',
        },
      ],
      lastSync: new Date().toISOString(),
    });
  },

  setScenarioMode: (mode: ScenarioMode) => {
    set({ scenarioMode: mode });
  },

  setCatchmentActiveStage: (stage: number) => {
    set({ catchmentActiveStage: stage });
  },

  // Backward compatibility aliases
  isSimulating: false,
  simulationPhase: 0,
  startSimulation: () => get().startScenario(),
  stopSimulation: () => get().pauseScenario(),
  advanceSimulation: () => {
    get().advanceScenario();
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
