import { STAKEHOLDERS } from "@/lib/data";
import { StatCard, FlowChain } from "@/components/dashboard/SituationRoom";

const stBadge: Record<string, string> = {
  "notification-required": "badge-high", "notification-overdue": "badge-critical",
  "pending-briefing": "badge-medium", "briefed": "badge-low", "engaged": "badge-low",
  "query-received": "badge-info", "monitoring": "badge-info",
};

export default function StakeholderRoom() {
  const types = ["Regulator", "Investor", "Media", "Government", "Community", "NGO"];
  return (
    <div className="flex flex-col h-full">
      <div className="flex h-14 flex-shrink-0 items-center justify-between border-b border-white/[0.08] bg-black/80 px-6 backdrop-blur-xl">
        <div><div className="text-base font-bold">Stakeholder Room</div><div className="text-xs text-slate-500">Regulators, investors, media, and communities</div></div>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6 grid grid-cols-4 gap-4">
          <StatCard label="Total Stakeholders" value={STAKEHOLDERS.length} trend="Across all categories" trendClass="text-slate-500" />
          <StatCard label="Notification Required" value={STAKEHOLDERS.filter(s => s.status === "notification-required").length} color="text-red-400" trend="Action needed" trendClass="text-red-400" />
          <StatCard label="Pending Briefing" value={STAKEHOLDERS.filter(s => s.status === "pending-briefing").length} color="text-amber-400" trend="Awaiting briefing" trendClass="text-slate-500" />
          <StatCard label="Engaged" value={STAKEHOLDERS.filter(s => s.status === "engaged" || s.status === "briefed").length} color="text-green-400" trend="Active engagement" trendClass="text-green-400" />
        </div>
        <div className="card mb-6">
          <div className="mb-4 text-[13px] font-semibold uppercase tracking-wider text-slate-500">Stakeholder Flow</div>
          <FlowChain steps={["Incident", "Identify", "Prioritize", "Prepare Comms", "Engage", "Track Response"]} active={[0, 5]} />
        </div>
        <h2 className="mb-4 text-xl font-bold">Stakeholder Map</h2>
        <div className="mb-6 grid grid-cols-3 gap-4">
          {types.map(t => {
            const items = STAKEHOLDERS.filter(s => s.type === t);
            if (!items.length) return null;
            return (
              <div key={t} className="card">
                <div className="mb-4 text-[13px] font-semibold uppercase tracking-wider text-slate-500">{t}s ({items.length})</div>
                {items.map(s => (
                  <div key={s.name} className="flex items-center gap-3 border-b border-white/[0.08] py-3 last:border-0">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500/15 text-orange-400">{s.type.charAt(0)}</div>
                    <div className="flex-1 min-w-0"><div className="text-[12px] font-semibold text-white">{s.name}</div><div className="text-xs text-slate-500">Influence: {s.influence}</div></div>
                    <span className={"badge " + (stBadge[s.status] || "badge-neutral")}>{s.status.replace(/-/g, " ")}</span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
        <div className="card">
          <div className="mb-4 text-[13px] font-semibold uppercase tracking-wider text-slate-500">Influence Mapping</div>
          <div className="grid grid-cols-3 gap-4">
            {["critical", "high", "medium"].map(inf => (
              <div key={inf}>
                <div className={"mb-3 text-sm font-semibold " + (inf === "critical" ? "text-red-400" : inf === "high" ? "text-amber-400" : "text-blue-400")}>{inf.charAt(0).toUpperCase() + inf.slice(1)}</div>
                {STAKEHOLDERS.filter(s => s.influence === inf).map(s => <div key={s.name} className="mb-2 text-sm text-slate-400">● {s.name}</div>)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
