// astro.config.mjs
import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  output: "server",              // keep this
  adapter: node({ mode: "standalone" }), // Node adapter
  integrations: [tailwind()],
});
