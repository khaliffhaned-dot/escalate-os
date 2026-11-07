import { INCIDENTS, OBLIGATIONS } from "@/lib/data";
import { IncidentTable, StatCard, FlowChain, EscalationQueue, SignalTimeline } from "@/components/dashboard/SituationRoom";

export default function SituationRoom() {
  const active = INCIDENTS.filter((i) => i.status === "active");
  const openOb = OBLIGATIONS.filter((o) => o.status === "active" || o.status === "overdue");

  return (
    <div className="flex flex-col h-full">
      {/* Topbar */}
      <div className="flex h-14 flex-shrink-0 items-center justify-between border-b border-white/[0.08] bg-black/80 px-6 backdrop-blur-xl">
        <div>
          <div className="text-base font-bold">Situation Room</div>
          <div className="text-xs text-slate-500">Active incidents and critical escalations</div>
        </div>
        <div className="flex items-center gap-3">
          <input className="rounded-lg border border-white/[0.08] bg-[#18181b] px-3.5 py-1.5 text-[13px] text-slate-400 outline-none w-60" placeholder="Search..." />
          <div className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-base">🔔</div>
          <div className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-base">⚙</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {/* Stats */}
        <div className="mb-6 grid grid-cols-4 gap-4">
          <StatCard label="Active Incidents" value={active.length} color="text-red-400" trend="▲ 3 since yesterday" trendClass="text-green-400" />
          <StatCard label="Critical Escalations" value={active.filter((i) => i.severity === "critical").length} color="text-red-400" trend="▲ 2 new" trendClass="text-green-400" />
          <StatCard label="Regulatory Exposure" value={openOb.length} color="" trend="Open obligations" trendClass="text-slate-500" />
          <StatCard label="Board Notifications" value={INCIDENTS.filter((i) => i.boardEscalation).length} color="text-amber-400" trend="Pending review" trendClass="text-green-400" />
        </div>

        {/* Flow */}
        <div className="card mb-6">
          <div className="mb-4 text-[13px] font-semibold uppercase tracking-wider text-slate-500">Crisis Detection Flow</div>
          <FlowChain steps={["Meltwater", "Signal Detected", "Event Created", "AI Classification", "Risk Assessment", "Create Incident"]} active={[3]} />
        </div>

        {/* Incident Table */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">Active Incidents</h2>
          <button className="btn-primary">+ Create Incident</button>
        </div>
        <div className="card mb-6 !p-0 overflow-hidden">
          <IncidentTable incidents={INCIDENTS} />
        </div>

        {/* Escalation + Signals */}
        <div className="grid grid-cols-2 gap-4">
          <EscalationQueue incidents={INCIDENTS.filter((i) => i.boardEscalation)} />
          <SignalTimeline />
        </div>
      </div>
    </div>
  );
}
