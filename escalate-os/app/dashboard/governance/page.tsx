import { OBLIGATIONS, REGULATORS } from "@/lib/data";
import { StatCard, FlowChain } from "@/components/dashboard/SituationRoom";

export default function GovernanceRoom() {
  const active = OBLIGATIONS.filter((o) => o.status === "active");
  const overdue = OBLIGATIONS.filter((o) => o.status === "overdue");
  const pending = OBLIGATIONS.filter((o) => o.status === "pending");

  return (
    <div className="flex flex-col h-full">
      <div className="flex h-14 flex-shrink-0 items-center justify-between border-b border-white/[0.08] bg-black/80 px-6 backdrop-blur-xl">
        <div><div className="text-base font-bold">Governance Room</div><div className="text-xs text-slate-500">Obligations, approvals, and compliance tracking</div></div>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6 grid grid-cols-4 gap-4">
          <StatCard label="Open Obligations" value={active.length} trend="▲ 2 new today" trendClass="text-green-400" />
          <StatCard label="Overdue" value={overdue.length} color="text-red-400" trend="Immediate action" trendClass="text-red-400" />
          <StatCard label="Pending Approvals" value={pending.length} color="text-amber-400" trend="Awaiting review" trendClass="text-slate-500" />
          <StatCard label="Evidence Collected" value={OBLIGATIONS.reduce((s, o) => s + o.evidence, 0)} trend="▲ 5 new documents" trendClass="text-green-400" />
        </div>
        <div className="card mb-6">
          <div className="mb-4 text-[13px] font-semibold uppercase tracking-wider text-slate-500">Governance Flow</div>
          <FlowChain steps={["Incident", "Applicable Regulators", "Obligations Engine", "Assign Owner", "Deadline Tracking", "Evidence", "Compliance"]} active={[0, 6]} />
        </div>
        <h2 className="mb-4 text-xl font-bold">Obligations</h2>
        <div className="card mb-6 !p-0 overflow-hidden">
          <table className="w-full">
            <thead><tr>{["ID", "Obligation", "Regulator", "Incident", "Owner", "Deadline", "Ev", "Status"].map(h => <th key={h} className="border-b border-white/[0.08] px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">{h}</th>)}</tr></thead>
            <tbody>
              {OBLIGATIONS.map(o => (
                <tr key={o.id} className="table-row">
                  <td className="px-3 py-3 font-mono text-[11px] text-slate-600">{o.id}</td>
                  <td className="px-3 py-3 font-medium text-white">{o.title}</td>
                  <td className="px-3 py-3"><span className="badge badge-neutral !text-orange-400">{o.regulator}</span></td>
                  <td className="px-3 py-3 font-mono text-[11px] text-slate-600">{o.incident}</td>
                  <td className="px-3 py-3 text-slate-400">{o.owner}</td>
                  <td className={"px-3 py-3 font-mono text-xs " + (o.status === "overdue" ? "text-red-400" : "text-slate-400")}>{o.deadline}</td>
                  <td className="px-3 py-3">{o.evidence > 0 ? <span className="text-green-400">{o.evidence} 📎</span> : <span className="text-slate-600">—</span>}</td>
                  <td className="px-3 py-3"><span className={"badge " + (o.status === "overdue" ? "badge-critical" : o.status === "active" ? "badge-high" : "badge-medium")}>{o.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="card">
            <div className="mb-4 text-[13px] font-semibold uppercase tracking-wider text-slate-500">Regulatory Deadlines</div>
            {OBLIGATIONS.filter(o => o.status === "active" || o.status === "overdue").map(o => (
              <div key={o.id} className="flex items-center gap-3 border-b border-white/[0.08] py-3 last:border-0">
                <div className={"flex h-9 w-9 items-center justify-center rounded-lg " + (o.status === "overdue" ? "bg-red-500/15 text-red-400" : "bg-amber-500/15 text-amber-400")}>&#9201;</div>
                <div className="flex-1"><div className="text-[13px] font-semibold text-white">{o.title}</div><div className="text-xs text-slate-500">{o.regulator} · {o.owner}</div></div>
                <div className={"font-mono text-xs " + (o.status === "overdue" ? "text-red-400" : "text-amber-400")}>{o.deadline}</div>
              </div>
            ))}
          </div>
          <div className="card">
            <div className="mb-4 text-[13px] font-semibold uppercase tracking-wider text-slate-500">Compliance Tracker</div>
            {REGULATORS.slice(0, 6).map(r => (
              <div key={r.code} className="mb-4">
                <div className="mb-2 flex items-center justify-between"><span className="text-sm font-semibold">{r.code}</span><span className="text-xs text-slate-500">{r.obligations} obligations</span></div>
                <div className="h-1 rounded-full bg-white/[0.08] overflow-hidden"><div className={"h-full rounded-full " + (r.obligations > 4 ? "bg-red-400" : r.obligations > 2 ? "bg-amber-400" : "bg-green-400")} style={{ width: ((r.obligations / 6) * 100) + "%" }} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
