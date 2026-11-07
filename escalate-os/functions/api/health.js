import { json, corsPreflight } from "./_helpers";

// GET /api/health → service health check
export async function onRequestGet(context) {
  return json({
    status: "ok",
    service: "escalate-os",
    timestamp: new Date().toISOString(),
  });
}

export async function onRequestOptions() {
  return corsPreflight("GET, OPTIONS");
}
