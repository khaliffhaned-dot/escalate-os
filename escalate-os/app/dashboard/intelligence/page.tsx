import { CONNECTORS } from "@/lib/data";
import { StatCard } from "@/components/dashboard/SituationRoom";

export default function IntelligenceHub() {
  const connected = CONNECTORS.filter(c => c.status === "connected");
  const totalSignals = connected.reduce((s, c) => s + c.signals, 0);

  return (
    <div className="flex flex-col h-full">
      <div className="flex h-14 flex-shrink-0 items-center justify-between border-b border-white/[0.08] bg-black/80 px-6 backdrop-blur-xl">
        <div><div className="text-base font-bold">Intelligence Hub</div><div className="text-xs text-slate-500">Connectors, AI copilot, and rules engine</div></div>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6 grid grid-cols-4 gap-4">
          <StatCard label="Active Connectors" value={connected.length} trend="MCP ecosystem" trendClass="text-slate-500" />
          <StatCard label="Signals Today" value={totalSignals} trend="&#9650; 23% increase" trendClass="text-green-400" />
          <StatCard label="AI Copilot Queries" value={47} trend="&#9650; 12 today" trendClass="text-green-400" />
          <StatCard label="Rules Engine" value={8} color="text-green-400" trend="Active rules" trendClass="text-slate-500" />
        </div>

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">MCP Connectors</h2>
          <button className="btn-ghost">+ Add Connector</button>
        </div>
        <div className="mb-6 grid grid-cols-2 gap-4">
          {CONNECTORS.map(c => (
            <div key={c.name} className="card card-hover flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg text-lg font-bold flex-shrink-0" style={{ background: c.color + "22", color: c.color }}>{c.icon}</div>
              <div className="flex-1">
                <div className="text-[13px] font-semibold text-white">{c.name}</div>
                <div className="text-xs text-slate-500">{c.category} &middot; {c.status === "connected" ? c.signals + " signals today" : "Not connected"}</div>
              </div>
              <div className={"h-5 w-9 rounded-full transition-all cursor-pointer " + (c.status === "connected" ? "bg-green-500" : "bg-white/[0.08]")}>
                <div className={"h-4 w-4 rounded-full bg-white transition-all mt-0.5 " + (c.status === "connected" ? "ml-4" : "ml-0.5")} />
              </div>
            </div>
          ))}
        </div>

        <div className="card mb-6">
          <div className="mb-4 text-[13px] font-semibold uppercase tracking-wider text-slate-500">Signal Flow</div>
          <div className="flex flex-wrap items-center gap-2">
            {["Meltwater", "Brandwatch", "Dataminr", "Email", "RSS"].map(t => <span key={t} className="flow-step">{t}</span>)}
            <span className="text-slate-600">&#8594;</span>
            <span className="flow-step flow-step-active">ESCALATE OS</span>
            <span className="text-slate-600">&#8594;</span>
            {["Decision", "Governance", "Accountability"].map(t => <span key={t} className="flow-step">{t}</span>)}
          </div>
        </div>

        <div className="card mb-6">
          <div className="mb-4 text-[13px] font-semibold uppercase tracking-wider text-slate-500">Governance Copilot</div>
          <div className="grid grid-cols-2 gap-12">
            <div>
              <p className="mb-6 text-sm text-slate-500">AI-powered governance intelligence for incident classification, board brief generation, and regulatory mapping.</p>
              {["Incident Classification", "Board Brief Generation", "Statement Drafting", "Risk Explanation", "Situation Summaries", "Regulatory Mapping"].map(f => (
                <div key={f} className="mb-2 flex items-center gap-2"><span className="text-green-400">&#10003;</span><span className="text-sm text-slate-400">{f}</span></div>
              ))}
            </div>
            <div className="rounded-xl border border-white/[0.08] bg-black/80 p-5 font-mono text-xs leading-relaxed text-slate-400">
              <div><span className="text-orange-400">&quot;incident&quot;</span>: <span className="text-green-400">&quot;Product Recall&quot;</span>,</div>
              <div><span className="text-orange-400">&quot;severity&quot;</span>: <span className="text-green-400">&quot;High&quot;</span>,</div>
              <div>&nbsp;</div>
              <div><span className="text-orange-400">&quot;regulators&quot;</span>: [<span className="text-green-400">&quot;JPDP&quot;</span>, <span className="text-green-400">&quot;Bursa&quot;</span>],</div>
              <div><span className="text-orange-400">&quot;obligations&quot;</span>: <span className="text-amber-400">4</span>,</div>
              <div><span className="text-orange-400">&quot;boardEscalation&quot;</span>: <span className="text-red-400">true</span>,</div>
              <div><span className="text-orange-400">&quot;deadline&quot;</span>: <span className="text-green-400">&quot;2h 14m&quot;</span></div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="mb-4 text-[13px] font-semibold uppercase tracking-wider text-slate-500">Rules Engine</div>
          <table className="w-full">
            <thead><tr>{["Rule", "Trigger", "Action", "Status"].map(h => <th key={h} className="border-b border-white/[0.08] px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">{h}</th>)}</tr></thead>
            <tbody>
              {[
                { r: "PDPA Breach Detection", t: "Signal: data breach, leak", a: "Create incident &middot; Notify JPDP", s: "Active" },
                { r: "Bursa Disclosure", t: "Materiality > 7", a: "Board escalation", s: "Active" },
                { r: "Product Safety", t: "KKM + recall keyword", a: "Create incident &middot; Notify KKM", s: "Active" },
                { r: "Cyber Incident", t: "Dataminr + ransomware", a: "Create incident &middot; Notify BNM", s: "Active" },
                { r: "Sentiment Drop", t: "Brandwatch < -0.3", a: "Alert Corp Affairs", s: "Paused" },
              ].map(r => (
                <tr key={r.r} className="table-row">
                  <td className="px-3 py-3 font-medium text-white">{r.r}</td>
                  <td className="px-3 py-3 text-slate-400">{r.t}</td>
                  <td className="px-3 py-3 text-slate-400">{r.a}</td>
                  <td className="px-3 py-3"><span className={"badge " + (r.s === "Active" ? "badge-low" : "badge-medium")}>{r.s}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
