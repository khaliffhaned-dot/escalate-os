import { defineCloudflareConfig } from "@opennextjs/cloudflare/config";

export default defineCloudflareConfig({
  runtime: "edge",
  nodejsCompat: true,
});
