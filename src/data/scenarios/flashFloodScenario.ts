/**
 * PRAVAH Flash-Flood Scenario Engine (Deterministic Prototype Simulation)
 *
 * IMPORTANT PROTOTYPE NOTICE:
 * This is a deterministic demonstration scenario for hackathon judging and operational workflow validation.
 * All outputs are SIMULATED and do not represent real-time IMD/CWC data or real-world emergency orders.
 */

import type { Sensor } from '../../types/hydrology';
import type { VillageRisk } from '../../types/risk';
import type { Alert, NDRFTeam, DeploymentRecommendation } from '../../types/alerts';
import type { Road } from '../../types/reports';
import { computeRisk } from '../../utils/riskCalculation';

export type ScenarioPhase = 0 | 1 | 2 | 3;
export type ScenarioMode = 'GUIDED' | 'MANUAL';
export type ScenarioStatus = 'IDLE' | 'RUNNING' | 'PAUSED' | 'COMPLETED';

export interface ScenarioEvent {
  id: string;
  timestamp: string;
  timeOffsetSec: number;
  phase: ScenarioPhase;
  title: string;
  detail: string;
  type: 'sensor' | 'risk' | 'alert' | 'ndrf' | 'catchment' | 'road' | 'system';
}

export interface ScenarioPhaseMetadata {
  phase: ScenarioPhase;
  label: string;
  shortLabel: string;
  bannerTitle: string;
  bannerSubtitle: string;
  durationSeconds: number; // Duration in Guided Mode
  leadTimeDisplay: string;
  leadTimeMinutes: number;
  overallRiskTier: 'MEDIUM' | 'HIGH' | 'VERY_HIGH';
  catchmentStageIndex: number;
  statusBadge: string;
}

export const SCENARIO_PHASES_META: Record<ScenarioPhase, ScenarioPhaseMetadata> = {
  0: {
    phase: 0,
    label: 'BASELINE CONDITIONS',
    shortLabel: 'Phase 0 • Baseline',
    bannerTitle: 'BASELINE MONSOON CONDITIONS — NORMAL MONITORING ACTIVE',
    bannerSubtitle: 'Ambient orographic precipitation across East Khasi Hills. Infiltration normal, Wahrew stream within safe banks.',
    durationSeconds: 5,
    leadTimeDisplay: '95–120 MIN',
    leadTimeMinutes: 112,
    overallRiskTier: 'MEDIUM',
    catchmentStageIndex: 0,
    statusBadge: 'STANDBY',
  },
  1: {
    phase: 1,
    label: 'PRECIPITATION INTENSIFICATION',
    shortLabel: 'Phase 1 • Escalation',
    bannerTitle: 'UPSTREAM RAINFALL ESCALATING — AWS WARNING THRESHOLD CROSSED',
    bannerSubtitle: 'Convective rainfall cell intensifying over Mawsynram ridge (68 mm/hr). Soil saturation rising rapidly.',
    durationSeconds: 10,
    leadTimeDisplay: '60–90 MIN',
    leadTimeMinutes: 72,
    overallRiskTier: 'HIGH',
    catchmentStageIndex: 1,
    statusBadge: 'MONITORED',
  },
  2: {
    phase: 2,
    label: 'UPSTREAM FLASH-FLOOD TRIGGER',
    shortLabel: 'Phase 2 • Trigger',
    bannerTitle: 'FLASH-FLOOD TRIGGER DETECTED — IMMEDIATE DOWNSTREAM RISK',
    bannerSubtitle: 'Heavy cloudburst rate (104 mm/hr) and 86% soil saturation triggering rapid runoff into Wahrew gorge.',
    durationSeconds: 10,
    leadTimeDisplay: '35–45 MIN',
    leadTimeMinutes: 38,
    overallRiskTier: 'VERY_HIGH',
    catchmentStageIndex: 2,
    statusBadge: 'ACTION REQUIRED',
  },
  3: {
    phase: 3,
    label: 'CRITICAL DOWNSTREAM IMPACT WINDOW',
    shortLabel: 'Phase 3 • Critical Evac',
    bannerTitle: 'CRITICAL RESPONSE WINDOW — EVACUATION REVIEW REQUIRED',
    bannerSubtitle: 'Wahrew danger mark breached (10.9m). Mawsynram lowland causeways overtopping in 22 min. Road cut confirmed.',
    durationSeconds: 10,
    leadTimeDisplay: '15–35 MIN',
    leadTimeMinutes: 22,
    overallRiskTier: 'VERY_HIGH',
    catchmentStageIndex: 3,
    statusBadge: 'CRITICAL RESPONSE',
  },
};

/**
 * Deterministic environmental snapshot per phase
 */
interface PhaseEnvSnapshot {
  rainfallByBlock: {
    mawsynram: number;
    sohra: number;
    shella: number;
    pynursla: number;
  };
  soilSaturation: number; // 0–1
  riverWahrewLevel: number; // meters
  riverWahrewDangerRatio: number;
  riverUmiewLevel: number;
  riverUmiewDangerRatio: number;
  antecedentRainfall72h: number;
}

const PHASE_ENV_DATA: Record<ScenarioPhase, PhaseEnvSnapshot> = {
  0: {
    rainfallByBlock: { mawsynram: 42.0, sohra: 36.8, shella: 24.0, pynursla: 18.0 },
    soilSaturation: 0.68,
    riverWahrewLevel: 4.8,
    riverWahrewDangerRatio: 0.46, // 4.8 / 10.5
    riverUmiewLevel: 3.2,
    riverUmiewDangerRatio: 0.36,  // 3.2 / 9.0
    antecedentRainfall72h: 65,
  },
  1: {
    rainfallByBlock: { mawsynram: 68.0, sohra: 56.0, shella: 38.0, pynursla: 26.0 },
    soilSaturation: 0.78,
    riverWahrewLevel: 6.8,
    riverWahrewDangerRatio: 0.65,
    riverUmiewLevel: 4.8,
    riverUmiewDangerRatio: 0.53,
    antecedentRainfall72h: 110,
  },
  2: {
    rainfallByBlock: { mawsynram: 104.0, sohra: 88.0, shella: 52.0, pynursla: 34.0 },
    soilSaturation: 0.86,
    riverWahrewLevel: 8.8,
    riverWahrewDangerRatio: 0.84, // Approaching 10.5m danger threshold
    riverUmiewLevel: 7.2,
    riverUmiewDangerRatio: 0.80,
    antecedentRainfall72h: 165,
  },
  3: {
    rainfallByBlock: { mawsynram: 142.0, sohra: 118.0, shella: 78.0, pynursla: 44.0 },
    soilSaturation: 0.93,
    riverWahrewLevel: 10.9,
    riverWahrewDangerRatio: 1.04, // Breaching 10.5m danger mark!
    riverUmiewLevel: 9.3,
    riverUmiewDangerRatio: 1.03,  // Breaching 9.0m danger mark!
    antecedentRainfall72h: 220,
  },
};

/**
 * Deterministic Alert definitions generated by the Scenario Engine
 */
export const SCENARIO_ALERTS: Record<2 | 3, Alert> = {
  2: {
    id: 'ALT-SCENARIO-PHASE2',
    type: 'FLASH_FLOOD',
    severity: 'CRITICAL',
    title: 'FLASH FLOOD SURGE TRIGGER — Mawsynram Catchment',
    description: 'DEMO SCENARIO: Cloudburst intensity (104 mm/hr) and 86% soil saturation triggering rapid Wahrew runoff. Upstream gauge surging +0.8m/hr. Immediate lowland flood hazard.',
    location: 'Mawsynram Sub-Basin',
    block: 'Mawsynram C&RD Block',
    latitude: 25.2972,
    longitude: 91.5822,
    issuedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 4 * 3600000).toISOString(),
    status: 'ACTIVE',
    leadTimeMinutes: 38,
    recommendedAction: 'Alert village councils. Evacuate low-lying Wahrew stream banks. Prepare NDRF Alpha Team staging.',
    affectedPopulation: 1420,
    source: 'PRAVAH Demo Scenario Engine',
  },
  3: {
    id: 'ALT-SCENARIO-PHASE3',
    type: 'EVACUATION',
    severity: 'CRITICAL',
    title: 'RED ALERT: Evacuation Window Active — Mawsynram & Wahrew Basin',
    description: 'DEMO SCENARIO: Wahrew river danger mark breached (10.9m). Mawsynram lowland causeways overtopping in 22 min. Emergency evacuation advisory active under DM Act Sec 30.',
    location: 'Mawsynram & Wahrew Lowlands',
    block: 'Mawsynram C&RD Block',
    latitude: 25.2972,
    longitude: 91.5822,
    issuedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 6 * 3600000).toISOString(),
    status: 'ACTIVE',
    leadTimeMinutes: 22,
    recommendedAction: 'Immediate evacuation to Mawsynram LP School. Deploy NDRF swiftwater rescue teams via SH-11 detour.',
    affectedPopulation: 4200,
    source: 'PRAVAH Demo Scenario Engine',
  },
};

/**
 * Apply a deterministic scenario phase to the entire PRAVAH application state.
 * Feeds simulated environmental variables into the actual computeRisk() engine.
 */
export function applyScenarioPhase(
  targetPhase: ScenarioPhase,
  state: {
    sensors: Sensor[];
    villages: VillageRisk[];
    alerts: Alert[];
    roads: Road[];
    ndrfTeams: NDRFTeam[];
    deploymentRecommendations: DeploymentRecommendation[];
  },
  elapsedSeconds: number = 0
): {
  sensors: Sensor[];
  villages: VillageRisk[];
  alerts: Alert[];
  roads: Road[];
  ndrfTeams: NDRFTeam[];
  deploymentRecommendations: DeploymentRecommendation[];
  newEvents: ScenarioEvent[];
} {
  const env = PHASE_ENV_DATA[targetPhase];
  const nowStr = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  const newEvents: ScenarioEvent[] = [];

  const addEvent = (title: string, detail: string, type: ScenarioEvent['type']) => {
    newEvents.push({
      id: `evt-${targetPhase}-${Date.now()}-${Math.random().toString().slice(2, 6)}`,
      timestamp: nowStr,
      timeOffsetSec: elapsedSeconds,
      phase: targetPhase,
      title,
      detail,
      type,
    });
  };

  // 1. UPDATE SENSORS
  const sensors = state.sensors.map((s) => {
    let newValue = s.value;
    let newStatus = s.status;

    if (s.id === 'AWS-001') {
      newValue = env.rainfallByBlock.mawsynram;
      newStatus = newValue >= s.threshold ? 'warning' : 'online';
    } else if (s.id === 'AWS-002') {
      newValue = env.rainfallByBlock.sohra;
      newStatus = newValue >= s.threshold ? 'warning' : 'online';
    } else if (s.id === 'AWS-003') {
      newValue = env.rainfallByBlock.shella;
      newStatus = newValue >= s.threshold ? 'warning' : 'online';
    } else if (s.id === 'AWS-004') {
      newValue = env.rainfallByBlock.pynursla;
      newStatus = newValue >= s.threshold ? 'warning' : 'online';
    } else if (s.id === 'RVR-001') {
      newValue = env.riverWahrewLevel;
      newStatus = env.riverWahrewDangerRatio >= 0.8 ? 'warning' : 'online';
    } else if (s.id === 'RVR-002') {
      newValue = env.riverUmiewLevel;
      newStatus = env.riverUmiewDangerRatio >= 0.8 ? 'warning' : 'online';
    } else if (s.id === 'SM-001') {
      newValue = Math.round(env.soilSaturation * 100);
      newStatus = newValue >= 85 ? 'warning' : 'online';
    } else if (s.id === 'SM-002') {
      newValue = Math.round((env.soilSaturation - 0.06) * 100);
      newStatus = newValue >= 85 ? 'warning' : 'online';
    } else if (s.id === 'WD-001') {
      newValue = targetPhase === 0 ? 0.8 : targetPhase === 1 ? 1.4 : targetPhase === 2 ? 2.1 : 2.8;
      newStatus = newValue >= 2.5 ? 'warning' : 'online';
    }

    return {
      ...s,
      previousValue: s.value,
      value: +(newValue.toFixed(1)),
      status: newStatus,
      updatedAt: new Date().toISOString(),
    };
  });

  // Log sensor events
  if (targetPhase === 0) {
    addEvent('Telemetry Reset to Baseline', 'Mawsynram AWS: 42 mm/hr • Wahrew Gauge: 4.8m (Normal)', 'sensor');
  } else if (targetPhase === 1) {
    addEvent('Precipitation Escalation Detected', 'Mawsynram AWS: 68 mm/hr (Threshold: 50 mm/hr Exceeded)', 'sensor');
    addEvent('Soil Moisture Infiltration Rising', 'SM-001: 78% Saturation (+10% in last hour)', 'sensor');
  } else if (targetPhase === 2) {
    addEvent('Cloudburst Trigger Rate Recorded', 'Mawsynram AWS: 104 mm/hr • Antecedent: 165mm', 'sensor');
    addEvent('Wahrew River Surge', 'Stage: 8.8m (+2.0m surge approaching 10.5m danger mark)', 'sensor');
  } else if (targetPhase === 3) {
    addEvent('Extreme Cloudburst Inundation', 'Mawsynram AWS: 142 mm/hr • Soil Saturation: 93%', 'sensor');
    addEvent('Wahrew Danger Mark Breached', 'Stage: 10.9m / 10.5m (DANGER LEVEL EXCEEDED by +0.4m)', 'sensor');
  }

  // 2. RECALCULATE VILLAGES USING THE ACTUAL computeRisk() ENGINE
  const villages = state.villages.map((v) => {
    // Determine block rainfall
    const blockKey = v.block.toLowerCase().includes('mawsynram')
      ? 'mawsynram'
      : v.block.toLowerCase().includes('sohra')
      ? 'sohra'
      : v.block.toLowerCase().includes('shella')
      ? 'shella'
      : 'pynursla';
    const rainfall = env.rainfallByBlock[blockKey];

    // Determine river danger ratio
    const riverDangerRatio = v.block.toLowerCase().includes('mawsynram')
      ? env.riverWahrewDangerRatio
      : v.block.toLowerCase().includes('sohra')
      ? (env.riverWahrewDangerRatio * 0.6 + env.riverUmiewDangerRatio * 0.4)
      : v.block.toLowerCase().includes('shella')
      ? Math.min(1.0, env.riverWahrewDangerRatio * 0.85)
      : 0.35;

    // Call existing explainable risk computation
    const computed = computeRisk({
      rainfall,
      antecedentRainfall72h: env.antecedentRainfall72h,
      riverLevel: v.block.toLowerCase().includes('mawsynram') ? env.riverWahrewLevel : env.riverUmiewLevel,
      riverLevelDangerRatio: riverDangerRatio,
      soilMoistureSaturation: env.soilSaturation,
      slope: v.slope || 25,
      twi: v.twi || 11.5,
      flowAccumulation: 8000,
      streamProximityM: v.streamProximityM || 120,
      elevation: v.elevation || 1200,
    });

    return {
      ...v,
      floodProbability: computed.floodProbability,
      slopeProbability: computed.slopeProbability,
      combinedScore: computed.combinedScore,
      riskLevel: computed.riskLevel,
      leadTimeMinutes: computed.leadTimeMinutes,
      riskReasons: computed.reasons,
      lastUpdated: new Date().toISOString(),
    };
  });

  // Log risk tier shifts for flagship villages
  const mawsynram = villages.find(v => v.id === 'V001');
  const tyrsad = villages.find(v => v.id === 'V002');

  if (targetPhase === 1) {
    addEvent('Risk Recalculation (Mawsynram)', `Score: ${mawsynram?.combinedScore} • Lead Time: ${mawsynram?.leadTimeMinutes} min`, 'risk');
  } else if (targetPhase === 2) {
    addEvent('Risk Tier Upgrade: VERY HIGH', `Mawsynram upgraded to VERY HIGH (Score: ${mawsynram?.combinedScore}, Lead Time: ${mawsynram?.leadTimeMinutes} min)`, 'risk');
    addEvent('Slope Failure Warning: Tyrsad', `Tyrsad Risk: ${tyrsad?.riskLevel} (Slope prob: ${(tyrsad?.slopeProbability || 0) * 100}%)`, 'risk');
  } else if (targetPhase === 3) {
    addEvent('Emergency Decision Window Active', `Lead Time contracted to ${mawsynram?.leadTimeMinutes} MIN (Critical Evacuation Window)`, 'risk');
  }

  // 3. ROADS STATE TRANSITIONS
  const roads = state.roads.map((r) => {
    if (r.id === 'R001') {
      // SH-11 (Shillong-Sohra)
      if (targetPhase >= 3) {
        return {
          ...r,
          status: 'BLOCKED' as const,
          blockagePoint: 'Km 18 — Landslide debris cut',
          reason: 'Landslide debris cutting both lanes. Alternate route via Mawkdok-Tyrna detour (+22km).',
          lastUpdated: new Date().toISOString(),
        };
      } else if (targetPhase >= 1) {
        return {
          ...r,
          status: 'AT_RISK' as const,
          reason: 'Minor boulder fall on uphill shoulder. Single-lane movement advisory.',
          lastUpdated: new Date().toISOString(),
        };
      } else {
        return {
          ...r,
          status: 'OPEN' as const,
          reason: 'All lanes operational. Clear traffic flow.',
          lastUpdated: new Date().toISOString(),
        };
      }
    } else if (r.id === 'R004') {
      // Tyrsad Approach Road
      if (targetPhase >= 2) {
        return {
          ...r,
          status: 'BLOCKED' as const,
          reason: 'Escarpment mudslide across 30m corridor.',
          lastUpdated: new Date().toISOString(),
        };
      }
    }
    return r;
  });

  if (targetPhase === 3) {
    addEvent('Critical Highway Blockage', 'SH-11 Km 18 Cut by Landslide Debris • Detour Required for Convoys', 'road');
  }

  // 4. AUTOMATIC ALERT CREATION (DEDUPLICATED IN ZUSTAND)
  let alerts = [...state.alerts];
  if (targetPhase >= 2) {
    const p2Exists = alerts.some((a) => a.id === 'ALT-SCENARIO-PHASE2');
    if (!p2Exists) {
      alerts = [SCENARIO_ALERTS[2], ...alerts];
      addEvent('Automated CAP Alert Broadcasted', 'ALT-SCENARIO-PHASE2: Flash Flood Trigger at Mawsynram', 'alert');
    }
  }

  if (targetPhase >= 3) {
    const p3Exists = alerts.some((a) => a.id === 'ALT-SCENARIO-PHASE3');
    if (!p3Exists) {
      alerts = [SCENARIO_ALERTS[3], ...alerts];
      addEvent('Statutory Evacuation Red Alert Issued', 'ALT-SCENARIO-PHASE3: Lowland Evacuation Review Active (DM Act Sec 30)', 'alert');
    }
  }

  // If resetting to baseline (Phase 0), clean scenario alerts
  if (targetPhase === 0) {
    alerts = alerts.filter((a) => a.id !== 'ALT-SCENARIO-PHASE2' && a.id !== 'ALT-SCENARIO-PHASE3');
  }

  // 5. NDRF TEAMS & DEPLOYMENT RECOMMENDATIONS
  const ndrfTeams = state.ndrfTeams.map((t) => {
    if (targetPhase === 0) {
      if (t.id === 'NDRF-01') {
        return { ...t, status: 'STANDBY' as const, currentLocation: 'Mawsynram Forward Base' };
      }
    }
    return t;
  });

  const deploymentRecommendations = state.deploymentRecommendations.map((r, i) => {
    if (i === 0) {
      return {
        ...r,
        priority: 1,
        village: 'Mawsynram Cluster',
        riskLevel: targetPhase >= 2 ? 'VERY HIGH' : 'HIGH',
        leadTimeMinutes: mawsynram?.leadTimeMinutes || 35,
        recommendedAction:
          targetPhase >= 3
            ? 'CRITICAL EVACUATION: Deploy swiftwater boats to Wahrew lowland causeways.'
            : targetPhase >= 2
            ? 'Stage Alpha Team rescue boats for immediate low-lying evacuation support.'
            : 'Pre-position supplies at Mawsynram LP School. Monitor Wahrew gauge.',
      };
    }
    return r;
  });

  if (targetPhase === 2) {
    addEvent('NDRF Recommendation Updated', 'Priority 1: Mawsynram Cluster (Alpha Team Staging Recommended)', 'ndrf');
    addEvent('Downstream Catchment Propagation', 'Wahrew Gorge Constriction Accelerating Flow toward Mawsynram', 'catchment');
  } else if (targetPhase === 3) {
    addEvent('Downstream Floodplain Warning', 'Shella & Bholaganj Floodplain Alert: Inundation Wave Propagating', 'catchment');
  }

  return {
    sensors,
    villages,
    alerts,
    roads,
    ndrfTeams,
    deploymentRecommendations,
    newEvents,
  };
}
