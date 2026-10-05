import type { Sensor } from '../../types/hydrology';

export const mockSensors: Sensor[] = [
  { id: 'AWS-001', name: 'Mawsynram AWS', type: 'rainfall', location: 'Mawsynram', block: 'Mawsynram C&RD Block', latitude: 25.2972, longitude: 91.5822, value: 42.4, previousValue: 38.2, unit: 'mm/hr', threshold: 50, status: 'warning', updatedAt: new Date().toISOString() },
  { id: 'AWS-002', name: 'Cherrapunji AWS', type: 'rainfall', location: 'Sohra (Cherrapunji)', block: 'Sohra Block', latitude: 25.2700, longitude: 91.7195, value: 36.8, previousValue: 32.1, unit: 'mm/hr', threshold: 50, status: 'online', updatedAt: new Date().toISOString() },
  { id: 'AWS-003', name: 'Shella AWS', type: 'rainfall', location: 'Shella', block: 'Shella Bholaganj Block', latitude: 25.2114, longitude: 91.8056, value: 28.5, previousValue: 25.0, unit: 'mm/hr', threshold: 50, status: 'online', updatedAt: new Date().toISOString() },
  { id: 'AWS-004', name: 'Pynursla AWS', type: 'rainfall', location: 'Pynursla', block: 'Pynursla Block', latitude: 25.3383, longitude: 91.8481, value: 18.2, previousValue: 22.1, unit: 'mm/hr', threshold: 50, status: 'online', updatedAt: new Date().toISOString() },
  { id: 'RVR-001', name: 'Wahrew Gauge', type: 'river', location: 'Wahrew Bridge', block: 'Mawsynram C&RD Block', latitude: 25.2800, longitude: 91.6100, value: 8.4, previousValue: 7.9, unit: 'm', threshold: 10.5, status: 'warning', updatedAt: new Date().toISOString() },
  { id: 'RVR-002', name: 'Umiew Gauge', type: 'river', location: 'Umiew @ Mawphlang', block: 'Sohra Block', latitude: 25.2900, longitude: 91.7400, value: 6.2, previousValue: 5.8, unit: 'm', threshold: 9.0, status: 'online', updatedAt: new Date().toISOString() },
  { id: 'RVR-003', name: 'Umngot Gauge', type: 'river', location: 'Umngot @ Dawki', block: 'Pynursla Block', latitude: 25.1900, longitude: 92.0200, value: 5.1, previousValue: 5.0, unit: 'm', threshold: 8.0, status: 'online', updatedAt: new Date().toISOString() },
  { id: 'SM-001', name: 'Mawsynram Soil', type: 'soil-moisture', location: 'Mawsynram Village', block: 'Mawsynram C&RD Block', latitude: 25.2950, longitude: 91.5850, value: 87, previousValue: 82, unit: '%', threshold: 90, status: 'warning', updatedAt: new Date().toISOString() },
  { id: 'SM-002', name: 'Tyrna Soil', type: 'soil-moisture', location: 'Tyrna', block: 'Sohra Block', latitude: 25.2600, longitude: 91.7100, value: 72, previousValue: 68, unit: '%', threshold: 90, status: 'online', updatedAt: new Date().toISOString() },
  { id: 'WD-001', name: 'Mawsynram Nallah', type: 'water-depth', location: 'Mawsynram Lower', block: 'Mawsynram C&RD Block', latitude: 25.2920, longitude: 91.5870, value: 1.8, previousValue: 1.5, unit: 'm', threshold: 2.5, status: 'online', updatedAt: new Date().toISOString() },
];

export function generateTimeSeriesData(hours: number = 24, baseValue: number, variance: number, trend: number = 0) {
  const data = [];
  const now = new Date();
  for (let i = hours; i >= 0; i--) {
    const t = new Date(now.getTime() - i * 60 * 60 * 1000);
    const trendValue = trend * (hours - i) / hours;
    const noise = (Math.random() - 0.5) * variance;
    data.push({
      time: t.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false }),
      value: Math.max(0, +(baseValue + trendValue + noise).toFixed(1)),
    });
  }
  return data;
}
