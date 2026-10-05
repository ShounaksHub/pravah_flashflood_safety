import { useState } from 'react';
import { Activity, Database, Users, ShieldAlert, Cpu, Power, PowerOff, Edit2, Save, RefreshCw } from 'lucide-react';
import { useAppStore } from '../../hooks/useAppStore';
import type { ApiEndpoint } from '../../hooks/useAppStore';

export default function AdminDashboard() {
  const { sensors, ndrfTeams, apiEndpoints, toggleEndpointStatus, updateEndpointUrl, forceSyncEndpoint } = useAppStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editUrl, setEditUrl] = useState('');

  const startEdit = (ep: ApiEndpoint) => {
    setEditingId(ep.id);
    setEditUrl(ep.url);
  };

  const saveEdit = (id: string) => {
    updateEndpointUrl(id, editUrl);
    setEditingId(null);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[24px] font-bold text-[#003757]">Backend Overview</h2>
          <p className="text-[#444653] font-mono text-[13px]">System Health and Configuration</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#006a63] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#006a63]"></span>
          </span>
          <span className="text-[13px] font-bold text-[#006a63]">SYSTEM ONLINE</span>
        </div>
      </div>

      {/* Admin KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-md shadow-sm border border-[#c4c5d5] border-l-4 border-l-[#006a63]">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[#444653] text-[12px] font-bold uppercase font-mono">Connected Sensors</h3>
            <Database size={16} className="text-[#006a63]" />
          </div>
          <p className="text-[28px] font-bold text-[#131b2e]">{sensors.length}</p>
        </div>
        
        <div className="bg-white p-4 rounded-md shadow-sm border border-[#c4c5d5] border-l-4 border-l-[#003757]">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[#444653] text-[12px] font-bold uppercase font-mono">Active Personnel</h3>
            <Users size={16} className="text-[#003757]" />
          </div>
          <p className="text-[28px] font-bold text-[#131b2e]">{ndrfTeams.reduce((acc, t) => acc + t.personnel, 0)}</p>
        </div>

        <div className="bg-white p-4 rounded-md shadow-sm border border-[#c4c5d5] border-l-4 border-l-[#00288e]">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[#444653] text-[12px] font-bold uppercase font-mono">AI Engine Status</h3>
            <Cpu size={16} className="text-[#00288e]" />
          </div>
          <p className="text-[20px] font-bold text-[#131b2e] mt-1">OPERATIONAL</p>
        </div>

        <div className="bg-white p-4 rounded-md shadow-sm border border-[#c4c5d5] border-l-4 border-l-[#ba1a1a]">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[#444653] text-[12px] font-bold uppercase font-mono">Failed Jobs</h3>
            <ShieldAlert size={16} className="text-[#ba1a1a]" />
          </div>
          <p className="text-[28px] font-bold text-[#ba1a1a]">0</p>
        </div>
      </div>

      {/* Configuration Section */}
      <div className="bg-white rounded-md shadow-sm border border-[#c4c5d5] overflow-hidden">
        <div className="bg-[#f2f3ff] p-4 border-b border-[#c4c5d5] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity size={18} className="text-[#00288e]" />
            <h3 className="font-bold text-[#131b2e]">Telemetry Endpoints Configuration</h3>
          </div>
          <p className="text-[12px] text-[#444653] font-mono">Changes apply immediately</p>
        </div>
        <div className="p-4 overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead>
              <tr className="border-b border-[#c4c5d5] text-[#444653] font-mono text-[12px] uppercase">
                <th className="pb-2 pl-2">Status</th>
                <th className="pb-2">Endpoint Name</th>
                <th className="pb-2 w-[40%]">URL / API Route</th>
                <th className="pb-2">Last Sync</th>
                <th className="pb-2 text-right pr-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {apiEndpoints.map((ep) => {
                const isConnected = ep.status === 'CONNECTED';
                const isEditing = editingId === ep.id;
                
                return (
                  <tr key={ep.id} className="border-b border-[#eaedff] last:border-0 text-[14px] hover:bg-[#faf8ff]">
                    <td className="py-3 pl-2">
                      <button 
                        onClick={() => toggleEndpointStatus(ep.id)}
                        className={`p-1.5 rounded-full transition-colors ${isConnected ? 'bg-[#9cf2e8] text-[#00504a]' : 'bg-[#ffdad6] text-[#93000a]'}`}
                        title={isConnected ? "Disable Endpoint" : "Enable Endpoint"}
                      >
                        {isConnected ? <Power size={14} /> : <PowerOff size={14} />}
                      </button>
                    </td>
                    <td className="py-3 font-semibold text-[#003757]">{ep.name}</td>
                    <td className="py-3 pr-4">
                      {isEditing ? (
                        <input 
                          type="text" 
                          value={editUrl}
                          onChange={(e) => setEditUrl(e.target.value)}
                          className="w-full px-2 py-1 bg-[#f2f3ff] border border-[#00288e] rounded font-mono text-[12px] focus:outline-none"
                        />
                      ) : (
                        <span className="font-mono text-[12px] text-[#444653] break-all">{ep.url}</span>
                      )}
                    </td>
                    <td className="py-3">
                      <span className="font-mono text-[12px] text-[#444653]">{ep.lastSync}</span>
                    </td>
                    <td className="py-3 text-right pr-2">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => forceSyncEndpoint(ep.id)}
                          disabled={!isConnected}
                          className="p-1.5 text-[#006a63] hover:bg-[#9cf2e8] rounded disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                          title="Force Sync Now"
                        >
                          <RefreshCw size={16} />
                        </button>
                        {isEditing ? (
                          <button 
                            onClick={() => saveEdit(ep.id)}
                            className="p-1.5 text-white bg-[#00288e] hover:bg-[#1e40af] rounded transition-colors flex items-center gap-1 px-2"
                          >
                            <Save size={14} /> <span className="text-[11px] font-bold">Save</span>
                          </button>
                        ) : (
                          <button 
                            onClick={() => startEdit(ep)}
                            className="p-1.5 text-[#00288e] hover:bg-[#e2e7ff] rounded transition-colors"
                            title="Edit URL"
                          >
                            <Edit2 size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
