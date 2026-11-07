import type { Incident } from "@/lib/data";

export function StatCard({ label, value, color = "", trend, trendClass = "text-slate-500" }: { label: string; value: number | string; color?: string; trend: string; trendClass?: string }) {
  return (
    <div className="stat-card">
      <div className="mb-2 text-xs text-slate-500">{label}</div>
      <div className={"text-2xl font-extrabold " + (color)}>{value}</div>
      <div className={"mt-1 text-[11px] " + (trendClass)}>{trend}</div>
    </div>
  );
}

export function FlowChain({ steps, active = [] }: { steps: string[]; active?: number[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {steps.map((step, i) => (
        <span key={step} className="flex items-center gap-2">
          <span className={"flow-step " + (active.includes(i) ? "flow-step-active" : "")}>{step}</span>
          {i < steps.length - 1 && <span className="text-slate-600 text-sm">→</span>}
        </span>
      ))}
    </div>
  );
}

const sevColors: Record<string, string> = { critical: "badge-critical", high: "badge-high", medium: "badge-medium", low: "badge-low" };
const stColors: Record<string, string> = { active: "badge-critical", monitoring: "badge-info", contained: "badge-low" };

export function IncidentTable({ incidents }: { incidents: Incident[] }) {
  return (
    <table className="w-full">
      <thead>
        <tr>
          {["ID", "Incident", "Severity", "Regulators", "Deadline", "Board", "Status"].map((h) => (
            <th key={h} className="border-b border-white/[0.08] px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {incidents.map((i) => (
          <tr key={i.id} className="table-row">
            <td className="px-3 py-3 font-mono text-[11px] text-slate-600">{i.id}</td>
            <td className="px-3 py-3 font-medium text-white">{i.title}</td>
            <td className="px-3 py-3"><span className={"badge " + (sevColors[i.severity])}>{i.severity}</span></td>
            <td className="px-3 py-3">{i.regulators.map((r) => <span key={r} className="badge badge-neutral mr-1">{r}</span>)}</td>
            <td className={"px-3 py-3 font-mono text-xs " + (i.deadline.startsWith("1h") || i.deadline.startsWith("2h") || i.deadline === "Immediate" ? "text-red-400" : "text-slate-400")}>{i.deadline}</td>
            <td className="px-3 py-3">{i.boardEscalation ? <span className="badge badge-medium">Yes</span> : <span className="badge badge-neutral">No</span>}</td>
            <td className="px-3 py-3"><span className={"badge " + (stColors[i.status])}>{i.status}</span></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function EscalationQueue({ incidents }: { incidents: Incident[] }) {
  return (
    <div className="card">
      <div className="mb-4 text-[13px] font-semibold uppercase tracking-wider text-slate-500">Escalation Queue</div>
      {incidents.map((i) => (
        <div key={i.id} className="flex items-center gap-3 border-b border-white/[0.08] py-3 last:border-0 cursor-pointer hover:bg-white/[0.02]">
          <div className={"flex h-9 w-9 items-center justify-center rounded-lg text-base " + (i.severity === "critical" ? "bg-red-500/15 text-red-400" : "bg-orange-500/15 text-orange-400")}>⚠</div>
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-semibold text-white">{i.title}</div>
            <div className="text-xs text-slate-500">{i.regulators.join(", ")} · {i.deadline}</div>
          </div>
          <span className={"badge " + (sevColors[i.severity])}>{i.severity}</span>
        </div>
      ))}
    </div>
  );
}

export function SignalTimeline() {
  const signals = [
    { time: "09:12 — Now", title: "Ransomware detected on internal systems", desc: "Dataminr · INC-005", color: "red-400" },
    { time: "08:42 — 30m ago", title: "Customer data breach — 15,000 accounts", desc: "Meltwater · INC-001", color: "amber-400" },
    { time: "07:15 — 2h ago", title: "Workplace fatality at KL construction site", desc: "Government Feed · INC-006", color: "orange-400" },
    { time: "06:15 — 3h ago", title: "Product contamination — Batch BF-2026", desc: "Email · INC-002", color: "green-400" },
    { time: "04:30 — 5h ago", title: "Pipeline leak at Sarawak Station 7", desc: "RSS · INC-003", color: "orange-400" },
  ];
  return (
    <div className="card">
      <div className="mb-4 text-[13px] font-semibold uppercase tracking-wider text-slate-500">Recent Signals</div>
      <div className="relative pl-6">
        <div className="absolute left-[7px] top-0 bottom-0 w-0.5 bg-white/[0.08]" />
        {signals.map((s, i) => (
          <div key={i} className="relative pb-5">
            <div className={"absolute -left-[20px] top-1 h-3 w-3 rounded-full border-2 border-" + (s.color) + " bg-[#060608]"} />
            <div className="text-[11px] text-slate-600">{s.time}</div>
            <div className="text-[13px] font-semibold text-white">{s.title}</div>
            <div className="mt-0.5 text-xs text-slate-500">{s.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
