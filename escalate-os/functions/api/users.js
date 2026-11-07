import { json, errorResponse, corsPreflight, store } from "./_helpers";

// GET /api/users       → list users
// POST /api/users      → create a user (body: { name, email })
export async function onRequestGet(context) {
  return json({ users: store.users });
}

export async function onRequestPost(context) {
  const { request } = context;
  let body;
  try {
    body = await request.json();
  } catch {
    return errorResponse("Invalid JSON body", 400);
  }
  if (!body?.name || !body?.email) {
    return errorResponse("name and email are required", 422);
  }
  const user = { id: store.nextId++, name: body.name, email: body.email };
  store.users.push(user);
  return json({ user }, 201);
}

export async function onRequestOptions() {
  return corsPreflight("GET, POST, OPTIONS");
}
