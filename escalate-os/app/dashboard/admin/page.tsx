import { ROLES } from "@/lib/data";
import { StatCard } from "@/components/dashboard/SituationRoom";

export default function Admin() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex h-14 flex-shrink-0 items-center justify-between border-b border-white/[0.08] bg-black/80 px-6 backdrop-blur-xl">
        <div><div className="text-base font-bold">Administration</div><div className="text-xs text-slate-500">Organizations, users, and roles</div></div>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6 grid grid-cols-4 gap-4">
          <StatCard label="Organizations" value={3} trend="1 primary, 2 linked" trendClass="text-slate-500" />
          <StatCard label="Users" value={24} trend="Across all orgs" trendClass="text-slate-500" />
          <StatCard label="Roles" value={6} trend="Role-based access" trendClass="text-slate-500" />
          <StatCard label="Feature Flags" value={12} color="text-green-400" trend="10 active" trendClass="text-slate-500" />
        </div>
        <div className="mb-6 grid grid-cols-2 gap-4">
          <div className="card">
            <div className="mb-4 text-[13px] font-semibold uppercase tracking-wider text-slate-500">Organizations</div>
            {[
              { i: "E", n: "Escalate Holdings Bhd", d: "Primary · 18 users", s: "Active", b: "badge-low" },
              { i: "S", n: "Energy Division", d: "Linked · 4 users", s: "Active", b: "badge-low" },
              { i: "F", n: "FinTech Ventures Sdn Bhd", d: "Linked · 2 users", s: "Trial", b: "badge-medium" },
            ].map(o => (
              <div key={o.n} className="flex items-center gap-3 border-b border-white/[0.08] py-3 last:border-0">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500/15 text-orange-400">{o.i}</div>
                <div className="flex-1"><div className="text-[13px] font-semibold text-white">{o.n}</div><div className="text-xs text-slate-500">{o.d}</div></div>
                <span className={"badge " + o.b}>{o.s}</span>
              </div>
            ))}
          </div>
          <div className="card">
            <div className="mb-4 text-[13px] font-semibold uppercase tracking-wider text-slate-500">Users &amp; Roles</div>
            {ROLES.map(r => (
              <div key={r.id} className="flex items-center gap-3 border-b border-white/[0.08] py-3 last:border-0">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500/15 text-orange-400">{r.short.charAt(0)}</div>
                <div className="flex-1"><div className="text-[13px] font-semibold text-white">{r.fullName}</div><div className="text-xs text-slate-500">{r.name} · {r.views.join(", ")}</div></div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="mb-4 text-[13px] font-semibold uppercase tracking-wider text-slate-500">Audit Logs</div>
          <div className="relative pl-6">
            <div className="absolute left-[7px] top-0 bottom-0 w-0.5 bg-white/[0.08]" />
            {[
              { t: "09:12 — Now", tt: "Incident INC-005 created by CISO", d: "Ransomware detected", c: "orange-400" },
              { t: "08:45 — 27m ago", tt: "Obligation OBL-004 marked overdue", d: "Bursa disclosure · INC-002", c: "green-400" },
              { t: "08:42 — 30m ago", tt: "Incident INC-001 created by AI", d: "Data breach · Auto-classified", c: "orange-400" },
              { t: "08:30 — 42m ago", tt: "Board brief BRF-002 generated", d: "Cyber attack · Urgent", c: "amber-400" },
              { t: "07:15 — 2h ago", tt: "Incident INC-006 created by Operations", d: "Workplace fatality · DOSH notified", c: "orange-400" },
            ].map((l, i) => (
              <div key={i} className="relative pb-5">
                <div className={"absolute -left-[20px] top-1 h-3 w-3 rounded-full border-2 border-" + l.c + " bg-[#060608]"} />
                <div className="text-[11px] text-slate-600">{l.t}</div>
                <div className="text-[13px] font-semibold text-white">{l.tt}</div>
                <div className="mt-0.5 text-xs text-slate-500">{l.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
