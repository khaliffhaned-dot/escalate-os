"use server";

import { cookies } from "next/headers";
import { getRequestContext } from "@opennextjs/cloudflare";
import { redirect } from "next/navigation";
import { verifyPassword } from "./auth";

async function getEnv() {
  const { env } = getRequestContext();
  return env as { DB: D1Database };
}

async function getSessionUser(): Promise<{ id: string; tenantId: string; email: string; role: string } | null> {
  const sessionId = cookies().get("escalate-session")?.value;
  if (!sessionId) return null;
  const env = await getEnv();
  const row = await env.DB.prepare(
    `SELECT u.id, u.tenant_id, u.email, u.role
     FROM sessions s
     JOIN users u ON u.id = s.user_id
     WHERE s.id = ? AND s.expires_at > datetime('now')`
  )
    .bind(sessionId)
    .first<{ id: string; tenant_id: string; email: string; role: string }>();
  if (!row) return null;
  return { id: row.id, tenantId: row.tenant_id, email: row.email, role: row.role };
}

export async function loginAction(formData: FormData) {
  const email = formData.get("email")?.toString()?.trim() || "";
  const password = formData.get("password")?.toString() || "";
  if (!email || !password) return { error: "Email and password required" };

  const env = await getEnv();
  const user = await env.DB.prepare(
    "SELECT id, tenant_id, email, password_hash, role FROM users WHERE email = ?"
  )
    .bind(email)
    .first<{ id: string; tenant_id: string; email: string; password_hash: string; role: string }>();

  if (!user || !(await verifyPassword(password, user.password_hash))) {
    return { error: "Invalid email or password" };
  }

  const sessionId = crypto.randomUUID();
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
  await env.DB.prepare(
    "INSERT INTO sessions (id, user_id, tenant_id, expires_at) VALUES (?, ?, ?, ?)"
  )
    .bind(sessionId, user.id, user.tenant_id, expires)
    .run();

  cookies().set("escalate-session", sessionId, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });
  redirect("/dashboard");
}

export async function logoutAction() {
  const sessionId = cookies().get("escalate-session")?.value;
  if (sessionId) {
    const env = await getEnv();
    await env.DB.prepare("DELETE FROM sessions WHERE id = ?").bind(sessionId).run();
  }
  cookies().delete("escalate-session");
  redirect("/login");
}

export async function getIncidents() {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  const env = await getEnv();
  const { results } = await env.DB.prepare(
    "SELECT id, title, summary, severity, status, owner FROM incidents WHERE tenant_id = ? ORDER BY created_at DESC"
  )
    .bind(user.tenantId)
    .all();
  return results || [];
}

export async function getAudit() {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  const env = await getEnv();
  const { results } = await env.DB.prepare(
    "SELECT id, action, detail, actor, created_at FROM audit_log WHERE tenant_id = ? ORDER BY created_at DESC LIMIT 50"
  )
    .bind(user.tenantId)
    .all();
  return results || [];
}

export async function createIncident(formData: FormData) {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  const env = await getEnv();
  const title = formData.get("title")?.toString()?.trim();
  const summary = formData.get("summary")?.toString()?.trim() || "";
  if (!title) return;

  const id = `inc-${Date.now().toString().slice(-8)}`;
  await env.DB.batch([
    env.DB.prepare(
      "INSERT INTO incidents (id, tenant_id, title, summary, severity, status, owner, created_by) VALUES (?, ?, ?, ?, 'medium', 'Active', ?, ?)"
    ).bind(id, user.tenantId, title, summary, user.email, user.id),
    env.DB.prepare(
      "INSERT INTO audit_log (id, tenant_id, actor, action, target_type, target_id, detail) VALUES (?, ?, ?, 'created', 'incident', ?, ?)"
    ).bind(crypto.randomUUID(), user.tenantId, user.email, id, `Incident created: ${title}`),
  ]);
}

export async function updateStatus(id: string, status: string) {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  const env = await getEnv();
  await env.DB.batch([
    env.DB.prepare(
      "UPDATE incidents SET status = ?, updated_at = datetime('now') WHERE id = ? AND tenant_id = ?"
    ).bind(status, id, user.tenantId),
    env.DB.prepare(
      "INSERT INTO audit_log (id, tenant_id, actor, action, target_type, target_id, detail) VALUES (?, ?, ?, 'status_change', 'incident', ?, ?)"
    ).bind(crypto.randomUUID(), user.tenantId, user.email, id, `Status → ${status}`),
  ]);
}

export async function recordDecision(incidentId: string, summary: string) {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  if (!summary.trim()) return;
  const env = await getEnv();
  const decisionId = crypto.randomUUID();
  await env.DB.batch([
    env.DB.prepare(
      "INSERT INTO decisions (id, tenant_id, incident_id, summary, recorded_by) VALUES (?, ?, ?, ?, ?)"
    ).bind(decisionId, user.tenantId, incidentId, summary.trim(), user.email),
    env.DB.prepare(
      "INSERT INTO audit_log (id, tenant_id, actor, action, target_type, target_id, detail) VALUES (?, ?, ?, 'decision_recorded', 'decision', ?, ?)"
    ).bind(crypto.randomUUID(), user.tenantId, user.email, decisionId, summary.trim()),
  ]);
}
