import { BOARD_BRIEFS, INCIDENTS } from "@/lib/data";
import { StatCard, FlowChain } from "@/components/dashboard/SituationRoom";

export default function BoardRoom() {
  const urgent = BOARD_BRIEFS.filter(b => b.status === "urgent");
  const pending = BOARD_BRIEFS.filter(b => b.status === "pending-review");

  return (
    <div className="flex flex-col h-full">
      <div className="flex h-14 flex-shrink-0 items-center justify-between border-b border-white/[0.08] bg-black/80 px-6 backdrop-blur-xl">
        <div><div className="text-base font-bold">Board Room</div><div className="text-xs text-slate-500">Board briefs, decisions, and resolutions</div></div>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6 grid grid-cols-4 gap-4">
          <StatCard label="Decision Requests" value={urgent.length} color="text-red-400" trend="Urgent" trendClass="text-red-400" />
          <StatCard label="Pending Review" value={pending.length} color="text-amber-400" trend="Awaiting review" trendClass="text-slate-500" />
          <StatCard label="Board Briefs" value={BOARD_BRIEFS.length} trend="Total generated" trendClass="text-slate-500" />
          <StatCard label="Resolutions" value={3} trend="This quarter" trendClass="text-slate-500" />
        </div>
        <div className="card mb-6">
          <div className="mb-4 text-[13px] font-semibold uppercase tracking-wider text-slate-500">Board Flow</div>
          <FlowChain steps={["Incident", "Materiality", "Escalation", "Brief Generation", "Decision Request", "Resolution", "Action Tracking"]} active={[0, 6]} />
        </div>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">Board Briefs</h2>
          <button className="btn-primary">+ Generate Brief</button>
        </div>
        <div className="mb-6 grid grid-cols-2 gap-4">
          {BOARD_BRIEFS.map(b => {
            const inc = INCIDENTS.find(i => i.id === b.incident);
            return (
              <div key={b.id} className="card card-hover cursor-pointer">
                <div className="mb-4 flex items-center justify-between">
                  <span className={"badge " + (b.status === "urgent" ? "badge-critical" : b.status === "pending-review" ? "badge-high" : "badge-low")}>{b.status.replace(/-/g, " ")}</span>
                  <span className="text-xs text-slate-500">{b.date}</span>
                </div>
                <h3 className="text-[15px] font-semibold">{b.title}</h3>
                <div className="mt-2 text-sm text-slate-500">Linked: {inc?.title}</div>
                <div className="mt-4">
                  {b.sections.map(s => (
                    <div key={s} className="mb-2 flex items-center gap-2"><span className="text-green-400">✓</span><span className="text-sm text-slate-400">{s}</span></div>
                  ))}
                </div>
                <div className="h-px bg-white/[0.08] my-4" />
                <div className="text-sm font-medium text-orange-400">Decision: {b.decision}</div>
              </div>
            );
          })}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="card">
            <div className="mb-4 text-[13px] font-semibold uppercase tracking-wider text-slate-500">Risk Register</div>
            {[
              { t: "Data Breach — Regulatory Penalty", d: "JPDP · Up to RM500,000", s: "critical" },
              { t: "Product Recall — Brand Damage", d: "KKM · Consumer trust impact", s: "critical" },
              { t: "Cyber Attack — Operational Disruption", d: "BNM RMiT · Business continuity", s: "high" },
              { t: "Market Manipulation — Reputation", d: "SC · Investor confidence", s: "medium" },
            ].map(r => (
              <div key={r.t} className="flex items-center gap-3 border-b border-white/[0.08] py-3 last:border-0">
                <div className={"flex h-9 w-9 items-center justify-center rounded-lg " + (r.s === "critical" ? "bg-red-500/15 text-red-400" : "bg-orange-500/15 text-orange-400")}>&#9888;</div>
                <div className="flex-1"><div className="text-[13px] font-semibold text-white">{r.t}</div><div className="text-xs text-slate-500">{r.d}</div></div>
                <span className={"badge " + (r.s === "critical" ? "badge-critical" : r.s === "high" ? "badge-high" : "badge-medium")}>{r.s}</span>
              </div>
            ))}
          </div>
          <div className="card">
            <div className="mb-4 text-[13px] font-semibold uppercase tracking-wider text-slate-500">Resolution Tracker</div>
            <div className="relative pl-6">
              <div className="absolute left-[7px] top-0 bottom-0 w-0.5 bg-white/[0.08]" />
              {[
                { t: "Nov 5", tt: "RES-003: Approved IR firm", d: "Cyber response · CISO", c: "green-400" },
                { t: "Nov 3", tt: "RES-002: Approved statement", d: "Data breach · Corp Affairs", c: "orange-400" },
                { t: "Oct 28", tt: "RES-001: Approved legal expansion", d: "Regulatory inquiry · Legal", c: "green-400" },
              ].map((r, i) => (
                <div key={i} className="relative pb-5">
                  <div className={"absolute -left-[20px] top-1 h-3 w-3 rounded-full border-2 border-" + r.c + " bg-[#060608]"} />
                  <div className="text-[11px] text-slate-600">{r.t}</div>
                  <div className="text-[13px] font-semibold text-white">{r.tt}</div>
                  <div className="mt-0.5 text-xs text-slate-500">{r.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
