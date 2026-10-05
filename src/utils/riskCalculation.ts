/**
 * Pravah MVP Risk Calculation Engine
 * 
 * IMPORTANT: This is PROTOTYPE / DEMO logic.
 * Risk scores are illustrative and NOT validated against ground truth.
 * Label all outputs as DEMO METRIC or VALIDATION TARGET.
 */

import type { RiskEngineInput, RiskEngineOutput, RiskLevel } from '../types/risk';

/** Weighted sigmoid-like risk contribution */
function riskContribution(value: number, threshold: number, weight: number): number {
  const ratio = value / threshold;
  const sigmoid = 1 / (1 + Math.exp(-6 * (ratio - 0.7)));
  return sigmoid * weight;
}

/**
 * Calculate flash flood probability based on multi-source inputs.
 * Returns 0–1 probability.
 */
export function calculateFloodProbability(input: RiskEngineInput): number {
  const rainfallRisk = riskContribution(input.rainfall, 50, 0.25);
  const antecedentRisk = riskContribution(input.antecedentRainfall72h, 200, 0.15);
  const riverRisk = riskContribution(input.riverLevelDangerRatio, 1.0, 0.20);
  const soilRisk = riskContribution(input.soilMoistureSaturation, 1.0, 0.15);
  const twiRisk = riskContribution(input.twi, 15, 0.10);
  const streamRisk = riskContribution(1 - (input.streamProximityM / 500), 1.0, 0.10);
  const flowRisk = riskContribution(input.flowAccumulation, 10000, 0.05);

  return Math.min(0.99, rainfallRisk + antecedentRisk + riverRisk + soilRisk + twiRisk + streamRisk + flowRisk);
}

/**
 * Calculate slope failure probability.
 */
export function calculateSlopeProbability(input: RiskEngineInput): number {
  const slopeRisk = riskContribution(input.slope, 45, 0.30);
  const soilRisk = riskContribution(input.soilMoistureSaturation, 1.0, 0.30);
  const rainfallRisk = riskContribution(input.rainfall, 50, 0.20);
  const antecedentRisk = riskContribution(input.antecedentRainfall72h, 200, 0.20);

  return Math.min(0.99, slopeRisk + soilRisk + rainfallRisk + antecedentRisk);
}

/**
 * Determine overall risk level from combined score.
 */
export function getRiskLevel(combinedScore: number): RiskLevel {
  if (combinedScore >= 0.7) return 'VERY_HIGH';
  if (combinedScore >= 0.5) return 'HIGH';
  if (combinedScore >= 0.3) return 'MEDIUM';
  return 'LOW';
}

/**
 * Estimate evacuation lead time in minutes.
 * Higher risk = shorter effective lead time.
 */
export function estimateLeadTime(floodProb: number, riverLevelDangerRatio: number): number {
  const baseLeadTime = 180; // 3 hours max
  const urgencyFactor = 1 - (floodProb * 0.6 + riverLevelDangerRatio * 0.4);
  return Math.max(15, Math.round(baseLeadTime * urgencyFactor));
}

/**
 * Generate risk reasons based on input parameters.
 */
export function generateRiskReasons(input: RiskEngineInput): string[] {
  const reasons: string[] = [];
  if (input.rainfall > 40) reasons.push(`Heavy rainfall: ${input.rainfall.toFixed(1)} mm/hr`);
  if (input.antecedentRainfall72h > 150) reasons.push(`High antecedent rainfall: ${input.antecedentRainfall72h.toFixed(0)} mm/72h`);
  if (input.riverLevelDangerRatio > 0.7) reasons.push(`River level at ${(input.riverLevelDangerRatio * 100).toFixed(0)}% of danger level`);
  if (input.soilMoistureSaturation > 0.8) reasons.push(`Soil saturation: ${(input.soilMoistureSaturation * 100).toFixed(0)}%`);
  if (input.slope > 25) reasons.push(`Steep terrain: ${input.slope}° slope`);
  if (input.twi > 12) reasons.push(`High topographic wetness index: ${input.twi.toFixed(1)}`);
  if (input.streamProximityM < 150) reasons.push(`Close to stream: ${input.streamProximityM}m`);
  return reasons;
}

/**
 * Full risk engine computation.
 */
export function computeRisk(input: RiskEngineInput): RiskEngineOutput {
  const floodProbability = calculateFloodProbability(input);
  const slopeProbability = calculateSlopeProbability(input);
  const combinedScore = Math.max(floodProbability, slopeProbability) * 0.7 + Math.min(floodProbability, slopeProbability) * 0.3;
  const riskLevel = getRiskLevel(combinedScore);
  const leadTimeMinutes = estimateLeadTime(floodProbability, input.riverLevelDangerRatio);
  const reasons = generateRiskReasons(input);

  return {
    floodProbability: +floodProbability.toFixed(2),
    slopeProbability: +slopeProbability.toFixed(2),
    combinedScore: +combinedScore.toFixed(2),
    riskLevel,
    leadTimeMinutes,
    reasons,
  };
}
