// ─── Road Types ───
export type RoadStatus = 'OPEN' | 'RESTRICTED' | 'AT_RISK' | 'BLOCKED';

export interface Road {
  id: string;
  name: string;
  type: 'NH' | 'SH' | 'MDR' | 'ODR' | 'VR';
  status: RoadStatus;
  from: string;
  to: string;
  blockagePoint?: string;
  reason?: string;
  alternateRoute?: string;
  estimatedClearance?: string;
  lastUpdated: string;
}

// ─── Shelter Types ───
export interface Shelter {
  id: string;
  name: string;
  type: 'SCHOOL' | 'COMMUNITY_HALL' | 'GOVT_BUILDING' | 'RELIEF_CAMP';
  location: string;
  block: string;
  latitude: number;
  longitude: number;
  capacity: number;
  currentOccupancy: number;
  facilities: string[];
  contactPerson: string;
  contactPhone: string;
  status: 'OPEN' | 'FULL' | 'STANDBY' | 'CLOSED';
}

// ─── Citizen Report Types ───
export type ReportCategory = 'RISING_WATER' | 'STREAM_OVERFLOW' | 'ROAD_BLOCKAGE' | 'LANDSLIDE' | 'SLOPE_CRACK' | 'INFRASTRUCTURE_DAMAGE';
export type ReportSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type ReportStatus = 'PENDING' | 'VERIFIED' | 'ACTIONED' | 'RESOLVED' | 'PENDING_SYNC';

export interface CitizenReport {
  id: string;
  category: ReportCategory;
  severity: ReportSeverity;
  title: string;
  description: string;
  location: string;
  latitude: number;
  longitude: number;
  reportedBy: string;
  reportedAt: string;
  status: ReportStatus;
  photoUrl?: string;
  verifiedBy?: string;
}

// ─── User Roles ───
export type UserRole = 'DISTRICT_EMERGENCY_OFFICER' | 'NDRF_OFFICER' | 'FIELD_OFFICER' | 'ADMIN';

export interface AppUser {
  id: string;
  name: string;
  designation: string;
  role: UserRole;
  department: string;
  jurisdiction: string;
}

// ─── Catchment Types ───
export interface CatchmentNode {
  id: string;
  name: string;
  type: 'source' | 'tributary' | 'main_channel' | 'village';
  latitude: number;
  longitude: number;
  estimatedArrivalMinutes?: number;
  distanceKm?: number;
  riskLevel?: string;
  population?: number;
}

// ─── SitRep Types ───
export interface SitRepData {
  id: string;
  generatedAt: string;
  incident: string;
  location: string;
  time: string;
  rainfall: string;
  riverLevel: string;
  riskSummary: string;
  affectedVillages: string[];
  criticalRoads: string[];
  populationExposure: number;
  ndrfRecommendation: string;
  resources: string;
  actionsTaken: string[];
  pendingActions: string[];
}
