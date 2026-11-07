import { json, errorResponse, corsPreflight, store } from "../_helpers";

// GET    /api/users/:id → get one user
// PUT    /api/users/:id → update a user (body: { name?, email? })
// DELETE /api/users/:id → delete a user
export async function onRequestGet(context) {
  const id = Number(context.params.id);
  const user = store.users.find((u) => u.id === id);
  if (!user) return errorResponse("User not found", 404);
  return json({ user });
}

export async function onRequestPut(context) {
  const { request, params } = context;
  const id = Number(params.id);
  const user = store.users.find((u) => u.id === id);
  if (!user) return errorResponse("User not found", 404);

  let body;
  try {
    body = await request.json();
  } catch {
    return errorResponse("Invalid JSON body", 400);
  }
  if (body?.name) user.name = body.name;
  if (body?.email) user.email = body.email;
  return json({ user });
}

export async function onRequestDelete(context) {
  const id = Number(context.params.id);
  const idx = store.users.findIndex((u) => u.id === id);
  if (idx === -1) return errorResponse("User not found", 404);
  store.users.splice(idx, 1);
  return json({ deleted: true, id });
}

export async function onRequestOptions() {
  return corsPreflight("GET, PUT, DELETE, OPTIONS");
}
