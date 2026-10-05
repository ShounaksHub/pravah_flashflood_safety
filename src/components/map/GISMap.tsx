import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useAppStore } from '../../hooks/useAppStore';
import { MAP_CENTER, MAP_ZOOM, RISK_COLORS } from '../../data/constants';
import { formatTime, riskBgHex } from '../../utils/formatting';

// Fix Leaflet icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons
const createSensorIcon = (status: 'online' | 'warning' | 'offline') => {
  const color = status === 'warning' ? '#ca8a04' : status === 'offline' ? '#94a3b8' : '#16a34a';
  return L.divIcon({
    html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.3);"></div>`,
    className: '',
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  });
};

const createTeamIcon = () => {
  return L.divIcon({
    html: `<div style="background-color: #00288e; color: white; width: 24px; height: 24px; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: bold; border: 1px solid white;">T</div>`,
    className: '',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

interface GISMapProps {
  layers: {
    flood: boolean;
    slope: boolean;
    radar: boolean;
    sensors: boolean;
    roads: boolean;
  };
}

// Map Updater Component to handle map centering programmatically
function MapUpdater({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

export default function GISMap({ layers }: GISMapProps) {
  const { villages, sensors, ndrfTeams } = useAppStore();

  return (
    <div className="relative w-full h-[480px] bg-[#dbe7ea] rounded-b overflow-hidden border-t border-outline-variant z-0">
      <MapContainer center={MAP_CENTER} zoom={MAP_ZOOM} style={{ height: '100%', width: '100%', zIndex: 1 }} zoomControl={false}>
        <MapUpdater center={MAP_CENTER} zoom={MAP_ZOOM} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={`https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png?key=${import.meta.env.VITE_CARTO_API_KEY || ''}`}
        />

        {/* Flood Risk Layer (Villages) */}
        {layers.flood && villages.map(v => (
          <Circle
            key={`flood-${v.id}`}
            center={[v.latitude, v.longitude]}
            radius={v.floodProbability * 2000}
            pathOptions={{
              color: RISK_COLORS[v.riskLevel],
              fillColor: riskBgHex(v.riskLevel),
              fillOpacity: 0.6,
              weight: 2
            }}
          >
            <Popup className="custom-popup">
              <div className="p-1">
                <div className="font-bold text-headline-sm mb-1">{v.name}</div>
                <div className="text-body-sm text-on-surface-variant">Risk Level: <span className="font-bold" style={{color: RISK_COLORS[v.riskLevel]}}>{v.riskLevel}</span></div>
                <div className="text-body-sm text-on-surface-variant">Flood Prob: {(v.floodProbability * 100).toFixed(0)}%</div>
                <div className="text-body-sm text-on-surface-variant mt-1 font-semibold">Lead Time: {v.leadTimeMinutes} mins</div>
              </div>
            </Popup>
          </Circle>
        ))}

        {/* Slope/Landslide Risk Layer */}
        {layers.slope && villages.map(v => {
          if (v.slopeProbability > 0.4) {
            return (
              <Circle
                key={`slope-${v.id}`}
                center={[v.latitude + 0.01, v.longitude + 0.01]} // Slight offset for visual distinctness
                radius={v.slopeProbability * 1500}
                pathOptions={{
                  color: '#991b1b',
                  fillColor: 'transparent',
                  dashArray: '5, 5',
                  weight: 2
                }}
              />
            );
          }
          return null;
        })}

        {/* Sensors Layer */}
        {layers.sensors && sensors.map(s => (
          <Marker
            key={s.id}
            position={[s.latitude, s.longitude]}
            icon={createSensorIcon(s.status)}
          >
            <Popup>
              <div className="p-1 min-w-[150px]">
                <div className="font-bold text-body-sm">{s.name}</div>
                <div className="text-code-sm text-on-surface-variant uppercase">{s.type}</div>
                <div className="mt-1 text-headline-sm text-primary">{s.value} {s.unit}</div>
                <div className="text-code-sm text-on-surface-variant mt-1">Updated: {formatTime(s.updatedAt)}</div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* NDRF Teams */}
        {ndrfTeams.map(t => (
          <Marker
            key={t.id}
            position={[t.latitude, t.longitude]}
            icon={createTeamIcon()}
          >
            <Popup>
               <div className="p-1">
                <div className="font-bold text-body-sm">{t.name}</div>
                <div className="text-code-sm text-on-surface-variant">{t.battalion}</div>
                <div className="mt-1 px-1.5 py-0.5 bg-primary-container text-on-primary text-xs rounded inline-block">{t.status}</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {/* Map Control overlay (zoom, scale, etc.) can be added here if needed */}
    </div>
  );
}
