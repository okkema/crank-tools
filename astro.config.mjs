// @ts-check
import { defineConfig, envField } from "astro/config";
import svelte from "@astrojs/svelte";
import node from "@astrojs/node";
import cloudflare from "@astrojs/cloudflare";

const builtins = [
  "async_hooks",
  "child_process",
  "crypto",
  "diagnostics_channel",
  "events",
  "fs",
  "http",
  "https",
  "inspector",
  "module",
  "net",
  "os",
  "path",
  "readline",
  "stream",
  "tls",
  "url",
  "util",
  "worker_threads",
  "zlib",
];

const adapter = (function(environment){
  switch (environment) {
    case "local": 
      return node({
        mode: "standalone",
      });
    case "cloud": 
      return cloudflare({
        imageService: "compile",
        platformProxy: {
          enabled: true,
        }
      });
    case "demo":
    default:
      break;
  }
})(process.env.ENVIRONMENT);

// https://astro.build/config
export default defineConfig({
  integrations: [svelte()],
  adapter,
  env: {
    schema: {
      ENVIRONMENT: envField.string({ context: "server", access: "public" }),
      DATABASE_URL: envField.string({ context: "server", access: "secret" })
    }
  },
  vite: {
    ssr: {
      external: [...builtins, ...builtins.map(module => `node:${module}`)]
    }
  }
});