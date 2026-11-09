import { getIncidents, getAudit, createIncident, updateStatus, recordDecision } from "@/lib/actions";

export default async function SituationPage() {
  const incidents = await getIncidents();
  const audit = await getAudit();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Situation Room</h1>
        <p className="text-slate-400 text-sm mt-1">
          Incidents persist in D1. Status changes and decisions write to the audit log.
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <form action={createIncident} className="border border-slate-800 rounded-lg p-4 space-y-3">
            <h2 className="font-medium">New incident</h2>
            <input name="title" required className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm" placeholder="Title" />
            <textarea name="summary" rows={2} className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm" placeholder="Summary" />
            <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-sm">Create</button>
          </form>

          <div className="space-y-3">
            {incidents.map((inc: any) => (
              <div key={inc.id} className="border border-slate-800 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{inc.title}</h3>
                    <p className="text-sm text-slate-400 mt-1">{inc.summary}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${inc.severity === "high" ? "bg-red-900/50 text-red-300" : "bg-amber-900/40 text-amber-300"}`}>
                    {inc.severity}
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
                  <span>Status: {inc.status}</span>
                  <span>Owner: {inc.owner}</span>
                  <div className="flex gap-1 ml-auto">
                    {["Active", "Monitoring", "Closed"].map((s) => (
                      <form key={s} action={async () => { "use server"; await updateStatus(inc.id, s); }}>
                        <button type="submit" className="px-2 py-1 border border-slate-700 rounded hover:bg-slate-800">{s}</button>
                      </form>
                    ))}
                  </div>
                </div>
                <form action={async (fd) => { "use server"; await recordDecision(inc.id, fd.get("decision")?.toString() || ""); }} className="mt-3 flex gap-2">
                  <input name="decision" placeholder="Record decision..." className="flex-1 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs" />
                  <button type="submit" className="px-3 py-1 bg-emerald-700 hover:bg-emerald-600 rounded text-xs">Record</button>
                </form>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-slate-800 rounded-lg p-4">
          <h2 className="font-medium mb-3">Audit trail</h2>
          <div className="space-y-2 text-xs max-h-96 overflow-auto">
            {audit.length === 0 && <p className="text-slate-500">No actions yet.</p>}
            {audit.map((a: any) => (
              <div key={a.id} className="border-b border-slate-800 pb-2">
                <div className="text-slate-300">{a.action}</div>
                <div className="text-slate-500">{a.detail}</div>
                <div className="text-slate-600">{a.actor} · {a.created_at}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
