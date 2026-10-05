import { useState } from 'react';
import { useAppStore } from '../hooks/useAppStore';
import SectionHeader from '../components/ui/SectionHeader';
import { Megaphone, Send, ShieldAlert, CheckCircle, Radio, BellRing, Smartphone } from 'lucide-react';
import { formatTime, formatRelativeTime } from '../utils/formatting';
import { SEVERITY_COLORS } from '../data/constants';

export default function AlertsPage() {
  const { alerts, acknowledgeAlert, resolveAlert } = useAppStore();
  
  const [selectedSeverity, setSelectedSeverity] = useState<'CRITICAL' | 'WARNING' | 'ADVISORY'>('CRITICAL');
  const [targetBlock, setTargetBlock] = useState('Mawsynram');
  const [alertMessage, setAlertMessage] = useState('FLASH FLOOD ALERT: Extreme runoff approaching Wahrew stream. Low-lying residents must evacuate immediately to Mawsynram LP School.');
  const [channels, setChannels] = useState({
    sirens: true,
    sms: true,
    whatsapp: true,
    citizenApp: true,
    radio: false,
  });
  const [broadcastSent, setBroadcastSent] = useState(false);

  const activeAlerts = alerts.filter(a => a.status === 'ACTIVE');
  const acknowledgedAlerts = alerts.filter(a => a.status === 'ACKNOWLEDGED');

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    setBroadcastSent(true);
    setTimeout(() => setBroadcastSent(false), 4000);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 bg-surface-container-low p-3 rounded border border-outline-variant">
        <div>
          <h2 className="text-headline-sm uppercase tracking-tight text-primary font-bold flex items-center gap-2">
            <Megaphone size={20} />
            Multi-Channel Emergency Alert & Warning Dispatch Center
          </h2>
          <p className="text-code-sm text-on-surface-variant">
            CAP (Common Alerting Protocol) compliant emergency broadcast to acoustic sirens, SMS gateways, WhatsApp relays, and citizen mobile apps.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-error text-white font-mono text-code-sm font-bold flex items-center gap-1.5 shadow-sm">
            <BellRing size={14} className="animate-bounce" />
            {activeAlerts.length} ACTIVE WARNINGS
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start">
        {/* Left Column: Active Alert Triage Stream (7 cols) */}
        <div className="xl:col-span-7 flex flex-col gap-4">
          <div className="bg-surface-container-lowest rounded border border-outline-variant shadow-sm flex flex-col">
            <SectionHeader
              icon={<ShieldAlert size={18} />}
              title="Active Incidents Requiring Officer Acknowledgment"
              badge={`${activeAlerts.length} PENDING`}
            />

            <div className="p-3 flex flex-col gap-3">
              {activeAlerts.length === 0 ? (
                <div className="p-6 text-center text-on-surface-variant text-body-sm">
                  <CheckCircle size={32} className="mx-auto text-secondary mb-2" />
                  All active alerts have been acknowledged or resolved.
                </div>
              ) : (
                activeAlerts.map(alert => (
                  <div 
                    key={alert.id}
                    className="p-3.5 rounded border-l-4 bg-surface-container-low flex flex-col gap-2 shadow-sm"
                    style={{ borderLeftColor: SEVERITY_COLORS[alert.severity] }}
                  >
                    <div className="flex items-center justify-between flex-wrap gap-1">
                      <div className="flex items-center gap-2">
                        <span 
                          className="px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase font-mono"
                          style={{ backgroundColor: SEVERITY_COLORS[alert.severity] }}
                        >
                          {alert.severity}
                        </span>
                        <span className="font-bold text-body-sm text-on-surface">{alert.title}</span>
                      </div>
                      <span className="text-code-sm text-on-surface-variant">{formatRelativeTime(alert.issuedAt)}</span>
                    </div>

                    <p className="text-body-sm text-on-surface leading-relaxed">
                      {alert.description}
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-code-sm bg-surface-container p-2 rounded">
                      <div>Location: <strong className="text-on-surface">{alert.location}</strong></div>
                      <div>Lead Time: <strong className="text-error font-bold">{alert.leadTimeMinutes || 'Immediate'} min</strong></div>
                      <div>Pop Exposed: <strong className="text-on-surface">{alert.affectedPopulation?.toLocaleString() || 'N/A'}</strong></div>
                    </div>

                    <div className="text-code-sm text-on-surface-variant bg-surface-container-lowest p-2 rounded border border-outline-variant">
                      <strong className="text-primary">Recommended Action:</strong> {alert.recommendedAction}
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-outline-variant">
                      <span className="text-[11px] font-mono text-on-surface-variant">Source: {alert.source}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => acknowledgeAlert(alert.id)}
                          className="h-7 px-3 bg-secondary hover:bg-teal-800 text-white rounded text-code-sm font-semibold transition-colors flex items-center gap-1"
                        >
                          <CheckCircle size={13} /> Acknowledge Alert
                        </button>
                        <button
                          onClick={() => resolveAlert(alert.id)}
                          className="h-7 px-3 bg-surface-container-lowest border border-outline hover:bg-surface-container rounded text-code-sm font-semibold transition-colors"
                        >
                          Close / Resolve
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Acknowledged / In-Progress Alerts */}
          {acknowledgedAlerts.length > 0 && (
            <div className="bg-surface-container-lowest rounded border border-outline-variant shadow-sm flex flex-col">
              <SectionHeader
                icon={<CheckCircle size={18} />}
                title="Acknowledged / Dispatched Incidents"
                badge={`${acknowledgedAlerts.length} LOGGED`}
              />
              <div className="divide-y divide-outline-variant">
                {acknowledgedAlerts.map(alert => (
                  <div key={alert.id} className="p-3 flex items-center justify-between hover:bg-surface-container/50">
                    <div className="flex flex-col">
                      <span className="font-semibold text-body-sm text-on-surface">{alert.title}</span>
                      <span className="text-code-sm text-on-surface-variant">{alert.location} | Ack by {alert.acknowledgedBy} at {formatTime(alert.acknowledgedAt || '')}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant text-[11px] font-bold">
                      IN PROGRESS
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: CAP Emergency Broadcast Composer (5 cols) */}
        <div className="xl:col-span-5 flex flex-col gap-4">
          <div className="bg-surface-container-lowest rounded border border-outline-variant shadow-sm flex flex-col">
            <SectionHeader
              icon={<Send size={18} />}
              title="CAP Multi-Channel Broadcast Console"
              badge="AUTHORITY"
            />

            <form onSubmit={handleBroadcast} className="p-4 flex flex-col gap-3">
              {broadcastSent && (
                <div className="p-3 bg-[#dcfce7] border border-[#86efac] text-[#166534] rounded text-body-sm font-semibold flex items-center gap-2">
                  <CheckCircle size={18} />
                  Emergency siren and SMS broadcast dispatched to 14,250 subscribers across {targetBlock}!
                </div>
              )}

              <div className="flex flex-col gap-1">
                <label className="text-label-caps text-on-surface-variant font-bold">Target Jurisdiction / Block:</label>
                <select 
                  value={targetBlock}
                  onChange={(e) => setTargetBlock(e.target.value)}
                  className="h-8 px-2.5 bg-surface-container-low border border-outline-variant rounded text-body-sm focus:outline-none focus:border-primary font-semibold"
                >
                  <option value="Mawsynram">Mawsynram C&RD Block (High Priority)</option>
                  <option value="Sohra">Sohra (Cherrapunji) Block</option>
                  <option value="Pynursla">Pynursla Sub-Division</option>
                  <option value="ALL">Entire District (East Khasi Hills)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-label-caps text-on-surface-variant font-bold">Severity Classification:</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['CRITICAL', 'WARNING', 'ADVISORY'] as const).map(sev => (
                    <button
                      type="button"
                      key={sev}
                      onClick={() => setSelectedSeverity(sev)}
                      className={`py-1.5 text-center rounded text-code-sm font-bold border transition-colors ${
                        selectedSeverity === sev 
                          ? 'bg-primary text-white border-primary shadow' 
                          : 'bg-surface-container-low border-outline-variant text-on-surface hover:bg-surface-container'
                      }`}
                    >
                      {sev}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-label-caps text-on-surface-variant font-bold">Active Broadcast Channels:</label>
                <div className="grid grid-cols-2 gap-2 text-code-sm bg-surface-container-low p-2.5 rounded border border-outline-variant">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={channels.sirens} 
                      onChange={() => setChannels(c => ({ ...c, sirens: !c.sirens }))}
                      className="rounded border-outline text-primary focus:ring-0" 
                    />
                    <span className="font-semibold text-on-surface flex items-center gap-1">
                      <Radio size={14} className="text-error" /> Outdoor Sirens (PA)
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={channels.sms} 
                      onChange={() => setChannels(c => ({ ...c, sms: !c.sms }))}
                      className="rounded border-outline text-primary focus:ring-0" 
                    />
                    <span className="font-semibold text-on-surface flex items-center gap-1">
                      <Smartphone size={14} className="text-primary" /> Cell Broadcast (SMS)
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={channels.whatsapp} 
                      onChange={() => setChannels(c => ({ ...c, whatsapp: !c.whatsapp }))}
                      className="rounded border-outline text-primary focus:ring-0" 
                    />
                    <span className="font-semibold text-on-surface">WhatsApp Emergency Relay</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={channels.citizenApp} 
                      onChange={() => setChannels(c => ({ ...c, citizenApp: !c.citizenApp }))}
                      className="rounded border-outline text-primary focus:ring-0" 
                    />
                    <span className="font-semibold text-on-surface">Pravah Citizen App</span>
                  </label>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-label-caps text-on-surface-variant font-bold">Broadcast Message Body (Multilingual/Khasi ready):</label>
                <textarea 
                  rows={4}
                  value={alertMessage}
                  onChange={(e) => setAlertMessage(e.target.value)}
                  className="p-2.5 bg-surface-container-low border border-outline-variant rounded text-body-sm font-sans focus:outline-none focus:border-primary leading-relaxed"
                />
              </div>

              <div className="p-2.5 bg-surface-container rounded text-code-sm text-on-surface-variant leading-tight">
                *Common Alerting Protocol (CAP v1.2) formatted XML payload will be signed with DDMA District Emergency Officer cryptographic credentials.
              </div>

              <button
                type="submit"
                className="w-full h-9 bg-error hover:bg-red-800 text-white font-bold rounded text-body-sm shadow transition-colors flex items-center justify-center gap-2"
              >
                <Megaphone size={16} />
                Authorize & Broadcast CAP Alert
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
