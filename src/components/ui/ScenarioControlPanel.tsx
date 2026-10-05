import { useState } from 'react';
import { Play, Pause, RotateCcw, SkipForward, Activity, Clock, ShieldAlert, AlertTriangle, Radio, CheckCircle2 } from 'lucide-react';
import { useAppStore } from '../../hooks/useAppStore';
import { SCENARIO_PHASES_META, type ScenarioPhase } from '../../data/scenarios/flashFloodScenario';

export default function ScenarioControlPanel() {
  const {
    scenarioMode,
    scenarioStatus,
    scenarioPhase,
    scenarioElapsedSeconds,
    scenarioEventLog,
    startScenario,
    pauseScenario,
    resumeScenario,
    advanceScenario,
    jumpToPhase,
    resetScenario,
    setScenarioMode,
  } = useAppStore();

  const [showEventLog, setShowEventLog] = useState(true);

  const phaseMeta = SCENARIO_PHASES_META[scenarioPhase];
  const isRunning = scenarioStatus === 'RUNNING';
  const isPaused = scenarioStatus === 'PAUSED';
  const isCompleted = scenarioStatus === 'COMPLETED';

  // Format MM:SS
  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const totalGuidedDuration = 35; // 5s + 10s + 10s + 10s
  const progressPercent = Math.min(100, Math.round((scenarioElapsedSeconds / totalGuidedDuration) * 100));

  return (
    <div className="bg-surface-container-lowest rounded-xl border-2 border-primary/40 shadow-md overflow-hidden flex flex-col">
      {/* Top Banner: Header + Badges */}
      <div className="p-3.5 bg-gradient-to-r from-[#00288e]/10 via-[#eff4ff] to-surface-container-low border-b border-outline-variant flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white shadow-sm flex-shrink-0">
            <Radio size={20} className={isRunning ? 'animate-pulse' : ''} />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-[17px] font-black tracking-tight text-[#00288e] uppercase font-sans">
                Flash-Flood Scenario Simulator
              </h2>
              <span className="px-2 py-0.5 rounded bg-primary text-white font-mono text-[10px] font-bold uppercase tracking-wider shadow-sm">
                DEMO SCENARIO
              </span>
              <span className="px-2 py-0.5 rounded bg-surface-container border border-outline-variant font-mono text-[10px] font-semibold text-on-surface-variant uppercase">
                Deterministic Workflow
              </span>
            </div>
            <p className="text-[12px] text-on-surface-variant font-medium mt-0.5">
              Deterministic operational simulation demonstrating upstream rainfall escalation through downstream warning and response.
            </p>
          </div>
        </div>

        {/* Guided vs Manual Mode Toggle */}
        <div className="flex items-center gap-1.5 p-1 bg-surface-container rounded-lg border border-outline-variant text-[11px] font-bold">
          <button
            onClick={() => setScenarioMode('GUIDED')}
            className={`px-3 py-1.5 rounded transition-all flex items-center gap-1 ${
              scenarioMode === 'GUIDED'
                ? 'bg-primary text-white shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span>⚡ Guided Demo (35s Auto)</span>
          </button>
          <button
            onClick={() => setScenarioMode('MANUAL')}
            className={`px-3 py-1.5 rounded transition-all flex items-center gap-1 ${
              scenarioMode === 'MANUAL'
                ? 'bg-primary text-white shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span>✋ Manual Step Mode</span>
          </button>
        </div>
      </div>

      {/* Main Operational Console Bar */}
      <div className="p-3.5 bg-surface-container-low border-b border-outline-variant grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
        {/* Status Indicators (6 cols) */}
        <div className="lg:col-span-6 flex items-center gap-2.5 flex-wrap">
          {/* Status Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-surface-container border border-outline-variant text-code-sm font-mono">
            <span className="text-on-surface-variant text-[10px] font-bold uppercase">STATUS:</span>
            <span
              className={`font-bold uppercase flex items-center gap-1.5 ${
                isRunning
                  ? 'text-[#16a34a]'
                  : isPaused
                  ? 'text-[#d97706]'
                  : isCompleted
                  ? 'text-primary'
                  : 'text-on-surface-variant'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isRunning
                    ? 'bg-[#16a34a] animate-ping'
                    : isPaused
                    ? 'bg-[#d97706]'
                    : isCompleted
                    ? 'bg-primary'
                    : 'bg-outline-variant'
                }`}
              />
              {scenarioStatus}
            </span>
          </div>

          {/* Current Phase Pill */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-surface-container border border-outline-variant text-code-sm font-mono">
            <span className="text-on-surface-variant text-[10px] font-bold uppercase">PHASE:</span>
            <strong className="text-on-surface text-[12px] font-bold">{scenarioPhase} / 3</strong>
            <span className="text-outline-variant">|</span>
            <span className="text-primary font-bold">{phaseMeta.shortLabel}</span>
          </div>

          {/* Simulated Decision Window Pill */}
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-code-sm font-mono font-bold ${
              scenarioPhase >= 3
                ? 'bg-[#fee2e2] text-[#991b1b] border-[#fca5a5] animate-pulse'
                : scenarioPhase === 2
                ? 'bg-[#ffedd5] text-[#9a3412] border-[#fed7aa]'
                : 'bg-surface-container text-on-surface border-outline-variant'
            }`}
          >
            <Clock size={13} />
            <span className="text-[10px] uppercase font-mono">Simulated Decision Window:</span>
            <span>{phaseMeta.leadTimeDisplay}</span>
          </div>

          {/* Elapsed Timer (Guided Mode) */}
          {scenarioMode === 'GUIDED' && (
            <div className="px-2.5 py-1.5 rounded-md bg-surface-container border border-outline-variant text-[11px] font-mono text-on-surface-variant">
              <span>{formatSeconds(scenarioElapsedSeconds)}</span>
              <span className="text-outline-variant"> / </span>
              <span className="text-on-surface font-semibold">{formatSeconds(totalGuidedDuration)}</span>
            </div>
          )}
        </div>

        {/* Primary Controls (6 cols) */}
        <div className="lg:col-span-6 flex items-center justify-start lg:justify-end gap-2 flex-wrap">
          {scenarioStatus === 'IDLE' && (
            <button
              onClick={() => startScenario()}
              className="h-9 px-4 rounded-lg bg-primary hover:bg-[#1e40af] text-white font-bold text-[13px] transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
            >
              <Play size={15} fill="currentColor" />
              <span>Start Scenario</span>
            </button>
          )}

          {isRunning && (
            <button
              onClick={pauseScenario}
              className="h-9 px-3.5 rounded-lg bg-[#fef3c7] hover:bg-[#fde68a] text-[#92400e] border border-[#f59e0b] font-bold text-[13px] transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
            >
              <Pause size={15} />
              <span>Pause</span>
            </button>
          )}

          {isPaused && (
            <button
              onClick={resumeScenario}
              className="h-9 px-4 rounded-lg bg-[#dcfce7] hover:bg-[#bbf7d0] text-[#166534] border border-[#86efac] font-bold text-[13px] transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
            >
              <Play size={15} fill="currentColor" />
              <span>Resume</span>
            </button>
          )}

          {/* Manual Advance Stage Button */}
          <button
            onClick={advanceScenario}
            disabled={scenarioPhase >= 3}
            title={scenarioPhase >= 3 ? 'Final Critical Stage Reached' : 'Advance to Next Scenario Phase'}
            className="h-9 px-3.5 rounded-lg bg-surface-container hover:bg-surface-container-high border border-outline-variant text-on-surface font-bold text-[13px] transition-all flex items-center gap-1.5 active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
          >
            <SkipForward size={14} />
            <span>Next Stage</span>
          </button>

          {/* Direct Phase Quick Jump Buttons */}
          <div className="hidden xl:flex items-center gap-1 px-1.5 py-1 bg-surface-container rounded-md border border-outline-variant">
            <span className="text-[9px] font-mono font-bold text-on-surface-variant uppercase mr-0.5">Jump:</span>
            {([0, 1, 2, 3] as ScenarioPhase[]).map((p) => (
              <button
                key={p}
                onClick={() => jumpToPhase(p)}
                className={`w-6 h-6 rounded font-mono text-[11px] font-bold transition-all flex items-center justify-center ${
                  scenarioPhase === p
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-on-surface hover:bg-surface-container-high'
                }`}
                title={`Jump directly to Phase ${p}: ${SCENARIO_PHASES_META[p].label}`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Full Reset Baseline Button */}
          <button
            onClick={resetScenario}
            title="Reset telemetry, villages, alerts, and NDRF teams back to baseline"
            className="h-9 px-3 rounded-lg bg-surface-container hover:bg-[#fee2e2] text-[#991b1b] border border-outline-variant font-bold text-[12px] transition-all flex items-center gap-1.5 active:scale-95"
          >
            <RotateCcw size={13} />
            <span>Reset Baseline</span>
          </button>
        </div>
      </div>

      {/* 4-Phase Visual Stepper Progress Bar */}
      <div className="px-4 py-3 bg-surface-container-lowest border-b border-outline-variant flex flex-col gap-2">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {([0, 1, 2, 3] as ScenarioPhase[]).map((phaseIdx) => {
            const isCurrent = scenarioPhase === phaseIdx;
            const isPast = scenarioPhase > phaseIdx;
            const meta = SCENARIO_PHASES_META[phaseIdx];

            return (
              <div
                key={phaseIdx}
                onClick={() => jumpToPhase(phaseIdx)}
                className={`p-2.5 rounded-lg border cursor-pointer transition-all flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-primary/5 border-primary shadow-sm ring-1 ring-primary/30'
                    : isPast
                    ? 'bg-surface-container-low border-[#86efac]/80'
                    : 'bg-surface-container-low border-outline-variant/60 opacity-60 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold uppercase text-on-surface-variant">
                    Stage {phaseIdx}
                  </span>
                  {isPast ? (
                    <CheckCircle2 size={13} className="text-[#16a34a]" />
                  ) : isCurrent ? (
                    <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                  ) : (
                    <span className="text-[10px] font-mono text-outline-variant">○</span>
                  )}
                </div>

                <div className="my-1">
                  <div className={`text-[12px] font-bold ${isCurrent ? 'text-primary' : 'text-on-surface'}`}>
                    {meta.label}
                  </div>
                  <div className="text-[10px] font-mono text-on-surface-variant">
                    {phaseIdx === 0 && 'Rain: 42 mm/hr • River: 4.8m'}
                    {phaseIdx === 1 && 'Rain: 68 mm/hr • Warning'}
                    {phaseIdx === 2 && 'Rain: 104 mm/hr • Alert P2'}
                    {phaseIdx === 3 && 'Rain: 142 mm/hr • Evac P3'}
                  </div>
                </div>

                <div className="mt-1 pt-1 border-t border-surface-container flex items-center justify-between text-[10px] font-mono">
                  <span className="text-on-surface-variant">Lead Time:</span>
                  <strong className={phaseIdx >= 2 ? 'text-error' : 'text-on-surface'}>
                    {meta.leadTimeDisplay}
                  </strong>
                </div>
              </div>
            );
          })}
        </div>

        {/* Guided Mode Smooth Progress Bar */}
        {scenarioMode === 'GUIDED' && (
          <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden mt-1 border border-outline-variant/40">
            <div
              className="bg-primary h-full transition-all duration-1000 ease-linear rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}
      </div>

      {/* Active Operational Directive Banner */}
      <div
        className={`px-4 py-2.5 border-b border-outline-variant flex items-center justify-between gap-3 text-body-sm transition-colors ${
          scenarioPhase >= 3
            ? 'bg-[#fee2e2]/60 text-[#7f1d1d]'
            : scenarioPhase === 2
            ? 'bg-[#ffedd5]/60 text-[#7c2d12]'
            : 'bg-[#eff4ff]/60 text-[#1e3a8a]'
        }`}
      >
        <div className="flex items-center gap-2">
          {scenarioPhase >= 2 ? (
            <ShieldAlert size={18} className="text-error flex-shrink-0 animate-bounce" />
          ) : (
            <Activity size={18} className="text-primary flex-shrink-0" />
          )}
          <div>
            <span className="font-mono text-[10px] uppercase font-bold tracking-wider mr-2 px-1.5 py-0.5 rounded bg-white/70 border border-current">
              {phaseMeta.statusBadge}
            </span>
            <strong className="text-[13px]">{phaseMeta.bannerTitle}</strong>
            <span className="hidden sm:inline text-[12px] opacity-80 ml-2">— {phaseMeta.bannerSubtitle}</span>
          </div>
        </div>

        <button
          onClick={() => setShowEventLog(!showEventLog)}
          className="text-[11px] font-bold text-primary hover:underline whitespace-nowrap flex items-center gap-1"
        >
          {showEventLog ? 'Hide Event Stream ▲' : 'Show Event Stream ▼'}
        </button>
      </div>

      {/* Collapsible Real-Time Scenario Event Stream Log */}
      {showEventLog && (
        <div className="p-3 bg-surface-container-low max-h-48 overflow-y-auto divide-y divide-outline-variant/40 text-[11px] font-mono">
          <div className="flex items-center justify-between pb-1.5 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
            <span>Deterministic Operational Event Stream ({scenarioEventLog.length} events logged)</span>
            <span>Real-time cross-module transitions</span>
          </div>
          {scenarioEventLog.slice(0, 6).map((evt) => (
            <div key={evt.id} className="py-1.5 flex items-start justify-between gap-2 hover:bg-surface-container/60 transition-colors">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-on-surface-variant flex-shrink-0">{evt.timestamp}</span>
                <span
                  className={`px-1.5 py-0.2 rounded text-[9px] font-bold uppercase flex-shrink-0 ${
                    evt.type === 'alert'
                      ? 'bg-error text-white'
                      : evt.type === 'risk'
                      ? 'bg-[#ea580c] text-white'
                      : evt.type === 'sensor'
                      ? 'bg-primary text-white'
                      : evt.type === 'road'
                      ? 'bg-[#b45309] text-white'
                      : evt.type === 'ndrf'
                      ? 'bg-[#006a63] text-white'
                      : 'bg-surface-container text-on-surface-variant border border-outline-variant'
                  }`}
                >
                  {evt.type}
                </span>
                <span className="font-bold text-on-surface truncate">{evt.title}</span>
                <span className="hidden md:inline text-on-surface-variant truncate">— {evt.detail}</span>
              </div>
              <span className="text-[9px] text-on-surface-variant uppercase flex-shrink-0 font-semibold">
                Phase {evt.phase}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Statutory Prototype Disclaimer */}
      <div className="px-4 py-2 bg-surface-container text-[11px] font-mono text-on-surface-variant border-t border-outline-variant flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 text-on-surface">
          <AlertTriangle size={13} className="text-[#b45309] flex-shrink-0" />
          <span>
            <strong>DEMO SCENARIO:</strong> Uses simulated telemetry and prototype risk calculations. No external emergency alerts or government systems are contacted.
          </span>
        </div>
        <span className="text-[10px] text-on-surface-variant uppercase tracking-wider">
          PRAVAH PROTOVISION • SIH EVALUATION MODE
        </span>
      </div>
    </div>
  );
}
