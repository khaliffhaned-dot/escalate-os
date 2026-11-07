// Shared helpers + in-memory data store for the escalate-os API.
//
// NOTE: the store lives in module scope, so it is shared across requests within
// a single isolate but resets on cold start and is NOT shared across isolates.
// For real persistence, bind a D1 database or KV namespace and swap the store
// calls for queries. See the README for the upgrade path.

export const store = {
  users: [
    { id: 1, name: "Ada Lovelace", email: "ada@escalate.my" },
    { id: 2, name: "Alan Turing", email: "alan@escalate.my" },
  ],
  nextId: 3,
};

export function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      ...extraHeaders,
    },
  });
}

export function errorResponse(message, status = 400) {
  return json({ error: message }, status);
}

export function corsPreflight(allow = "GET, POST, PUT, PATCH, DELETE, OPTIONS") {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": allow,
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Max-Age": "86400",
    },
  });
}
