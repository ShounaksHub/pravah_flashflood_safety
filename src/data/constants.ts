/** Application-wide constants */

export const APP_NAME = 'Pravah Command';
export const APP_SUBTITLE = 'Early Warning & Decision Support System | District Emergency Operations Centre';
export const APP_VERSION = 'v4.2-EOC';
export const PROBLEM_STATEMENT = 'SIH26192';
export const TEAM_NAME = 'Doomscrollers1';
export const TEAM_ID = '188825';

export const JURISDICTION = {
  state: 'Meghalaya',
  district: 'East Khasi Hills',
};

export const HELPLINE = '1077 / 112';

export const DEMO_LABELS = {
  DEMO_DATA: '[DEMO DATA: For Operational Simulation & Validation]',
  SIMULATED: 'SIMULATED SENSOR STREAM',
  PROTOTYPE: 'PROTOTYPE',
  VALIDATION_TARGET: 'VALIDATION TARGET',
  AI_ASSISTED: 'AI-ASSISTED RECOMMENDATION',
} as const;

export const BLOCKS = [
  'Mawsynram C&RD Block',
  'Shella Bholaganj C&RD Block',
  'Sohra (Cherrapunji) Block',
  'Pynursla Block',
  'Mylliem (Shillong Urban)',
] as const;

export const MAP_CENTER: [number, number] = [25.30, 91.70];
export const MAP_ZOOM = 11;

export const RISK_COLORS: Record<string, string> = {
  VERY_HIGH: '#b91c1c',
  HIGH: '#ea580c',
  MEDIUM: '#ca8a04',
  LOW: '#16a34a',
};

export const SEVERITY_COLORS: Record<string, string> = {
  CRITICAL: '#b91c1c',
  WARNING: '#ea580c',
  ADVISORY: '#ca8a04',
  WATCH: '#16a34a',
};

export const RISK_BG_COLORS: Record<string, string> = {
  VERY_HIGH: '#fef2f2',
  HIGH: '#fff7ed',
  MEDIUM: '#fefce8',
  LOW: '#f0fdf4',
};

export const RISK_BORDER_COLORS: Record<string, string> = {
  VERY_HIGH: '#fecaca',
  HIGH: '#fed7aa',
  MEDIUM: '#fef08a',
  LOW: '#bbf7d0',
};

export const SIMULATION_INTERVAL_MS = 5000;
