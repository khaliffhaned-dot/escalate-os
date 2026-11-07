import { CONNECTORS } from "@/lib/data";

function Toggle({ on = true }: { on?: boolean }) {
  return (
    <div className={"h-5 w-9 rounded-full transition-all cursor-pointer " + (on ? "bg-green-500" : "bg-white/[0.08]")}>
      <div className={"h-4 w-4 rounded-full bg-white transition-all mt-0.5 " + (on ? "ml-4" : "ml-0.5")} />
    </div>
  );
}

export default function Settings() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex h-14 flex-shrink-0 items-center justify-between border-b border-white/[0.08] bg-black/80 px-6 backdrop-blur-xl">
        <div><div className="text-base font-bold">Settings</div><div className="text-xs text-slate-500">Organization profile and integrations</div></div>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6 grid grid-cols-2 gap-4">
          <div className="card">
            <div className="mb-4 text-[13px] font-semibold uppercase tracking-wider text-slate-500">Organization Profile</div>
            {[
              { l: "Organization Name", v: "Escalate Holdings Bhd" },
              { l: "Registration No.", v: "202601000001" },
              { l: "Sector", v: "Financial Services & Energy" },
              { l: "Primary Regulator", v: "BNM — Bank Negara Malaysia" },
            ].map(f => (
              <div key={f.l} className="mb-4">
                <label className="mb-1 block text-xs text-slate-500">{f.l}</label>
                <input className="w-full rounded-lg border border-white/[0.08] bg-[#18181b] px-3 py-2 text-[13px] text-white outline-none" defaultValue={f.v} />
              </div>
            ))}
          </div>
          <div className="card">
            <div className="mb-4 text-[13px] font-semibold uppercase tracking-wider text-slate-500">Integrations</div>
            {CONNECTORS.filter(c => c.status === "connected").map(c => (
              <div key={c.name} className="mb-3 flex items-center gap-3 rounded-lg border border-white/[0.08] bg-white/[0.03] p-3.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg text-lg font-bold" style={{ background: c.color + "22", color: c.color }}>{c.icon}</div>
                <div className="flex-1"><div className="text-[13px] font-semibold text-white">{c.name}</div><div className="text-xs text-slate-500">{c.category}</div></div>
                <Toggle on />
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="card">
            <div className="mb-4 text-[13px] font-semibold uppercase tracking-wider text-slate-500">Notifications</div>
            {[{ l: "Email alerts", on: true }, { l: "SMS critical alerts", on: true }, { l: "WhatsApp notifications", on: false }, { l: "Board escalation alerts", on: true }].map(n => (
              <div key={n.l} className="mb-4 flex items-center justify-between"><span className="text-sm">{n.l}</span><Toggle on={n.on} /></div>
            ))}
          </div>
          <div className="card">
            <div className="mb-4 text-[13px] font-semibold uppercase tracking-wider text-slate-500">Security</div>
            {[{ l: "Two-factor authentication", on: true }, { l: "SSO (SAML)", on: true }, { l: "IP allowlist", on: false }, { l: "Audit trail export", on: true }].map(n => (
              <div key={n.l} className="mb-4 flex items-center justify-between"><span className="text-sm">{n.l}</span><Toggle on={n.on} /></div>
            ))}
          </div>
          <div className="card">
            <div className="mb-4 text-[13px] font-semibold uppercase tracking-wider text-slate-500">Branding</div>
            <div className="mb-4">
              <label className="mb-1 block text-xs text-slate-500">Primary Color</label>
              <div className="flex gap-2">
                {["#F97316", "#3B82F6", "#22C55E", "#8B5CF6"].map((c, i) => (
                  <div key={c} className={"h-8 w-8 rounded-lg " + (i === 0 ? "ring-2 ring-white" : "")} style={{ background: c }} />
                ))}
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs text-slate-500">Logo</label>
              <div className="rounded-lg border border-dashed border-white/[0.08] p-4 text-center text-xs text-slate-500">Click to upload</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
