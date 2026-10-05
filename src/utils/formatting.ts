import type { RiskLevel } from '../types/risk';

/** Format a timestamp to IST display */
export function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' });
}

export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' });
}

export function formatRelativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

/** Pad number to 2 digits */
export function pad2(n: number): string {
  return n.toString().padStart(2, '0');
}

/** Get risk level label */
export function riskLabel(level: RiskLevel): string {
  const labels: Record<RiskLevel, string> = { LOW: 'Low', MEDIUM: 'Medium', HIGH: 'High', VERY_HIGH: 'Very High' };
  return labels[level];
}

/** Get CSS class/color for risk level (using design tokens) */
export function riskColorClass(level: RiskLevel): string {
  const map: Record<RiskLevel, string> = {
    VERY_HIGH: 'text-tier4-text bg-tier4-bg border-tier4-border',
    HIGH: 'text-tier3-text bg-tier3-bg border-tier3-border',
    MEDIUM: 'text-tier2-text bg-tier2-bg border-tier2-border',
    LOW: 'text-tier1-text bg-tier1-bg border-tier1-border',
  };
  return map[level];
}

export function riskDotColor(level: RiskLevel): string {
  const map: Record<RiskLevel, string> = { VERY_HIGH: '#dc2626', HIGH: '#ea580c', MEDIUM: '#ca8a04', LOW: '#16a34a' };
  return map[level];
}

export function riskBgHex(level: RiskLevel): string {
  const map: Record<RiskLevel, string> = { VERY_HIGH: '#fef2f2', HIGH: '#fff7ed', MEDIUM: '#fefce8', LOW: '#f0fdf4' };
  return map[level];
}

export function riskTextHex(level: RiskLevel): string {
  const map: Record<RiskLevel, string> = { VERY_HIGH: '#991b1b', HIGH: '#9a3412', MEDIUM: '#854d0e', LOW: '#166534' };
  return map[level];
}
