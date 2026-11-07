export interface Env {
  DB: D1Database
  CACHE: KVNamespace
  FILES: R2Bucket
  EVENT_QUEUE: QueueQueue
  API_KEY: string
  APP_NAME: string
  ENVIRONMENT: string
  VITE_API_URL: string
}
