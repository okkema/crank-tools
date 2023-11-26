/// <reference types="vitest" />
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import plainText from "vite-plugin-virtual-plain-text"
import { sentryVitePlugin } from "@sentry/vite-plugin"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    plainText(),
    sentryVitePlugin({
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      authToken: process.env.SENTRY_AUTH_TOKEN,
      telemetry: false,
    }),
  ],
  server: {
    port: 5000,
  },
  preview: {
    port: 5000,
  },
  assetsInclude: ["README.md"],
  clearScreen: false,
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
  },
  build: {
    sourcemap: true,
    outDir: "dist/vite",
  },
})
