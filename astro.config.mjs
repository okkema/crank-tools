// @ts-check
import { defineConfig, envField } from "astro/config";
import svelte from "@astrojs/svelte";
import node from "@astrojs/node";

const adapter = (function(environment){
  switch (environment) {
    case "local": 
      return node({
        mode: "standalone",
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
      ENVIRONMENT: envField.string({ context: "client", access: "public" })
    }
  }
});