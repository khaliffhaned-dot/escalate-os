"use server";

import { cookies } from "next/headers";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { redirect } from "next/navigation";

const TENANT = "tenant-demo";

async function getEnv() {
  const { env } = getRequestContext();
  return env as { DB: D1Database };
}

export async function loginAction(formData: FormData) {
  const password = formData.get("password")?.toString() || "";
  if (password !== "demo") {
    return { error: "Invalid credentials" };
  }
  cookies().set("escalate-session", "user-demo", {
    httpOnly: true,
    path: "/",
    maxAge: 86400,
  });
  redirect("/dashboard");
}

export async function getIncidents() {
  const env = await getEnv();
  const { results } = await env.DB.prepare(
    "SELECT id, title, summary, severity, status, owner FROM incidents WHERE tenant_id = ? ORDER BY created_at DESC"
  )
    .bind(TENANT)
    .all();
  return results || [];
}

export async function getAudit() {
  const env = await getEnv();
  const { results } = await env.DB.prepare(
    "SELECT id, action, detail, actor, created_at FROM audit_log WHERE tenant_id = ? ORDER BY created_at DESC LIMIT 50"
  )
    .bind(TENANT)
    .all();
  return results || [];
}

export async function createIncident(formData: FormData) {
  const env = await getEnv();
  const title = formData.get("title")?.toString()?.trim();
  const summary = formData.get("summary")?.toString()?.trim() || "";
  if (!title) return;

  const id = `inc-${Date.now().toString().slice(-8)}`;
  await env.DB.batch([
    env.DB.prepare(
      "INSERT INTO incidents (id, tenant_id, title, summary, severity, status, owner, created_by) VALUES (?, ?, ?, ?, 'medium', 'Active', 'Demo User', 'user-demo')"
    ).bind(id, TENANT, title, summary),
    env.DB.prepare(
      "INSERT INTO audit_log (id, tenant_id, actor, action, target_type, target_id, detail) VALUES (?, ?, 'Demo User', 'created', 'incident', ?, ?)"
    ).bind(crypto.randomUUID(), TENANT, id, `Incident created: ${title}`),
  ]);
}

export async function updateStatus(id: string, status: string) {
  const env = await getEnv();
  await env.DB.batch([
    env.DB.prepare(
      "UPDATE incidents SET status = ?, updated_at = datetime('now') WHERE id = ? AND tenant_id = ?"
    ).bind(status, id, TENANT),
    env.DB.prepare(
      "INSERT INTO audit_log (id, tenant_id, actor, action, target_type, target_id, detail) VALUES (?, ?, 'Demo User', 'status_change', 'incident', ?, ?)"
    ).bind(crypto.randomUUID(), TENANT, id, `Status → ${status}`),
  ]);
}

export async function recordDecision(incidentId: string, summary: string) {
  if (!summary.trim()) return;
  const env = await getEnv();
  const decisionId = crypto.randomUUID();
  await env.DB.batch([
    env.DB.prepare(
      "INSERT INTO decisions (id, tenant_id, incident_id, summary, recorded_by) VALUES (?, ?, ?, ?, 'Demo User')"
    ).bind(decisionId, TENANT, incidentId, summary.trim()),
    env.DB.prepare(
      "INSERT INTO audit_log (id, tenant_id, actor, action, target_type, target_id, detail) VALUES (?, ?, 'Demo User', 'decision_recorded', 'decision', ?, ?)"
    ).bind(crypto.randomUUID(), TENANT, decisionId, summary.trim()),
  ]);
}
