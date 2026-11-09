"use client";

import { useState } from "react";

type Severity = "high" | "medium" | "low";
type Status = "Active" | "Monitoring" | "Closed";

interface Incident {
  id: string;
  title: string;
  summary: string;
  severity: Severity;
  status: Status;
  owner: string;
}

interface AuditEntry {
  id: string;
  incidentId: string;
  action: string;
  actor: string;
  timestamp: string;
  detail: string;
}

interface Decision {
  id: string;
  incidentId: string;
  summary: string;
  recordedAt: string;
}

const initialIncidents: Incident[] = [
  {
    id: "inc-001",
    title: "Regulatory inquiry — media coverage",
    summary: "Signal from press and social regarding ongoing compliance process.",
    severity: "high",
    status: "Active",
    owner: "Governance Lead",
  },
  {
    id: "inc-002",
    title: "Stakeholder request — board briefing",
    summary: "Investor desk requested updated position on open regulatory item.",
    severity: "medium",
    status: "Monitoring",
    owner: "Comms",
  },
];

export default function SituationClient() {
  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents);
  const [audit, setAudit] = useState<AuditEntry[]>([]);
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [decisionText, setDecisionText] = useState("");

  const selected = incidents.find((i) => i.id === selectedId);

  function addAudit(incidentId: string, action: string, detail: string) {
    setAudit((prev) => [
      {
        id: crypto.randomUUID(),
        incidentId,
        action,
        actor: "Demo User",
        timestamp: new Date().toISOString(),
        detail,
      },
      ...prev,
    ]);
  }

  function createIncident() {
    if (!title.trim()) return;
    const id = `inc-${Date.now().toString().slice(-6)}`;
    const newInc: Incident = {
      id,
      title: title.trim(),
      summary: summary.trim() || "No summary provided.",
      severity: "medium",
      status: "Active",
      owner: "Demo User",
    };
    setIncidents((prev) => [newInc, ...prev]);
    addAudit(id, "created", `Incident created: ${newInc.title}`);
    setTitle("");
    setSummary("");
    setSelectedId(id);
  }

  function updateStatus(id: string, status: Status) {
    setIncidents((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status } : i))
    );
    const inc = incidents.find((i) => i.id === id);
    addAudit(id, "status_change", `Status → ${status} (${inc?.title})`);
  }

  function recordDecision() {
    if (!selectedId || !decisionText.trim()) return;
    const d: Decision = {
      id: crypto.randomUUID(),
      incidentId: selectedId,
      summary: decisionText.trim(),
      recordedAt: new Date().toISOString(),
    };
    setDecisions((prev) => [d, ...prev]);
    addAudit(selectedId, "decision_recorded", d.summary);
    setDecisionText("");
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        <div className="border border-slate-800 rounded-lg p-4 space-y-3">
          <h2 className="font-medium">New incident</h2>
          <input
            className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm"
            placeholder="Summary"
            rows={2}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
          <button
            onClick={createIncident}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-sm"
          >
            Create
          </button>
        </div>

        <div className="space-y-3">
          {incidents.map((inc) => (
            <div
              key={inc.id}
              onClick={() => setSelectedId(inc.id)}
              className={`border rounded-lg p-4 cursor-pointer transition ${
                selectedId === inc.id
                  ? "border-blue-500 bg-slate-900/50"
                  : "border-slate-800 hover:border-slate-600"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{inc.title}</h3>
                  <p className="text-sm text-slate-400 mt-1">{inc.summary}</p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    inc.severity === "high"
                      ? "bg-red-900/50 text-red-300"
                      : "bg-amber-900/40 text-amber-300"
                  }`}
                >
                  {inc.severity}
                </span>
              </div>
              <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
                <span>Status: {inc.status}</span>
                <span>Owner: {inc.owner}</span>
                <div className="flex gap-1 ml-auto">
                  {(["Active", "Monitoring", "Closed"] as Status[]).map((s) => (
                    <button
                      key={s}
                      onClick={(e) => {
                        e.stopPropagation();
                        updateStatus(inc.id, s);
                      }}
                      className="px-2 py-1 border border-slate-700 rounded hover:bg-slate-800"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {selected && (
          <div className="border border-slate-800 rounded-lg p-4 space-y-3">
            <h2 className="font-medium">Record decision</h2>
            <p className="text-xs text-slate-400">{selected.title}</p>
            <textarea
              className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm"
              placeholder="Decision or obligation"
              rows={3}
              value={decisionText}
              onChange={(e) => setDecisionText(e.target.value)}
            />
            <button
              onClick={recordDecision}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 rounded text-sm"
            >
              Record
            </button>
            <div className="text-xs space-y-2 pt-2">
              {decisions
                .filter((d) => d.incidentId === selected.id)
                .map((d) => (
                  <div key={d.id} className="border-l-2 border-emerald-600 pl-2">
                    {d.summary}
                    <div className="text-slate-500">
                      {new Date(d.recordedAt).toLocaleString()}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        <div className="border border-slate-800 rounded-lg p-4">
          <h2 className="font-medium mb-3">Audit trail</h2>
          <div className="space-y-2 text-xs max-h-80 overflow-auto">
            {audit.length === 0 && (
              <p className="text-slate-500">No actions yet.</p>
            )}
            {audit.map((a) => (
              <div key={a.id} className="border-b border-slate-800 pb-2">
                <div className="text-slate-300">{a.action}</div>
                <div className="text-slate-500">{a.detail}</div>
                <div className="text-slate-600">
                  {a.actor} · {new Date(a.timestamp).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
