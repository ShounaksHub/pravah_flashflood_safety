// ─── Sensor Types ───
export type SensorType = 'rainfall' | 'river' | 'soil-moisture' | 'water-depth';
export type SensorStatus = 'online' | 'offline' | 'warning';

export interface Sensor {
  id: string;
  name: string;
  type: SensorType;
  location: string;
  block: string;
  latitude: number;
  longitude: number;
  value: number;
  previousValue: number;
  unit: string;
  threshold: number;
  status: SensorStatus;
  updatedAt: string;
}

// ─── Hydrology Types ───
export interface RainfallReading {
  timestamp: string;
  stationId: string;
  stationName: string;
  value: number;
  unit: string;
  cumulative24h: number;
  intensity: 'light' | 'moderate' | 'heavy' | 'very-heavy' | 'extremely-heavy';
}

export interface RiverLevel {
  timestamp: string;
  stationId: string;
  stationName: string;
  river: string;
  level: number;
  previousLevel: number;
  dangerLevel: number;
  warningLevel: number;
  unit: string;
  trend: 'rising' | 'steady' | 'falling';
  dischargeRate: number;
}

export interface SoilMoisture {
  timestamp: string;
  stationId: string;
  location: string;
  value: number;
  saturationPercent: number;
  depth: string;
  status: 'dry' | 'normal' | 'wet' | 'saturated';
}

export interface HydrologyTimeSeries {
  time: string;
  value: number;
  threshold?: number;
}
