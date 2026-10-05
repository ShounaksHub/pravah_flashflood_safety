// ─── Alert Types ───
export type AlertSeverity = 'CRITICAL' | 'WARNING' | 'ADVISORY' | 'INFO';
export type AlertStatus = 'ACTIVE' | 'ACKNOWLEDGED' | 'ESCALATED' | 'RESOLVED';
export type AlertType = 'FLASH_FLOOD' | 'RIVER_BREACH' | 'LANDSLIDE' | 'CLOUDBURST' | 'ROAD_CUT' | 'SENSOR_FAILURE' | 'EVACUATION';

export interface Alert {
  id: string;
  type: AlertType;
  severity: AlertSeverity;
  title: string;
  description: string;
  location: string;
  block: string;
  latitude: number;
  longitude: number;
  issuedAt: string;
  expiresAt: string;
  status: AlertStatus;
  acknowledgedBy?: string;
  acknowledgedAt?: string;
  leadTimeMinutes?: number;
  recommendedAction: string;
  affectedPopulation: number;
  source: string;
}

// ─── NDRF Types ───
export type TeamStatus = 'DEPLOYED' | 'STANDBY' | 'EN_ROUTE' | 'RESTING';
export type TeamType = 'NDRF' | 'SDRF' | 'LOCAL_POLICE' | 'FIRE_SERVICE';

export interface NDRFTeam {
  id: string;
  name: string;
  type: TeamType;
  battalion: string;
  status: TeamStatus;
  personnel: number;
  equipment: string[];
  baseLocation: string;
  currentLocation: string;
  latitude: number;
  longitude: number;
  assignedVillage?: string;
  estimatedTravelMinutes?: number;
  contactOfficer: string;
  lastUpdate: string;
}

export interface DeploymentRecommendation {
  priority: number;
  village: string;
  riskLevel: string;
  population: number;
  leadTimeMinutes: number;
  roadStatus: string;
  nearestTeam: string;
  estimatedTravelMinutes: number;
  recommendedAction: string;
  reasoning: string;
}
