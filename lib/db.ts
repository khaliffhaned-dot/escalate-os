export interface Env {
  DB: D1Database;
}

export function getDb(env: Env) {
  return env.DB;
}
