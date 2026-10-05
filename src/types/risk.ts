// ─── Risk Types ───
export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH';

export interface VillageRisk {
  id: string;
  name: string;
  block: string;
  district: string;
  latitude: number;
  longitude: number;
  riskLevel: RiskLevel;
  floodProbability: number;
  slopeProbability: number;
  combinedScore: number;
  leadTimeMinutes: number;
  populationExposure: number;
  householdsAtRisk: number;
  nearestShelter: string;
  shelterDistanceKm: number;
  roadAccessible: boolean;
  elevation: number;
  slope: number;
  twi: number;
  streamProximityM: number;
  lastUpdated: string;
  riskReasons: string[];
}

export interface RiskForecast {
  timestamp: string;
  floodProbability: number;
  slopeProbability: number;
  riskLevel: RiskLevel;
  leadTimeMinutes: number;
}

export interface RiskEngineInput {
  rainfall: number;
  antecedentRainfall72h: number;
  riverLevel: number;
  riverLevelDangerRatio: number;
  soilMoistureSaturation: number;
  slope: number;
  twi: number;
  flowAccumulation: number;
  streamProximityM: number;
  elevation: number;
}

export interface RiskEngineOutput {
  floodProbability: number;
  slopeProbability: number;
  combinedScore: number;
  riskLevel: RiskLevel;
  leadTimeMinutes: number;
  reasons: string[];
}
