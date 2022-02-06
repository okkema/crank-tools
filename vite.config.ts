import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import plainText from "vite-plugin-virtual-plain-text"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), plainText()],
  server: {
    port: 5000,
  },
  assetsInclude: ["README.md"],
})
