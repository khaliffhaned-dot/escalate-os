import { errorResponse, corsPreflight } from "./_helpers";

// Catch-all for any /api/* route that isn't matched by a more specific
// Function (health, users, users/[id]). Returns a JSON 404.
export async function onRequest(context) {
  return errorResponse("API route not found", 404);
}

export async function onRequestOptions() {
  return corsPreflight();
}
