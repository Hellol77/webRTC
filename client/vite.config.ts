import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    mkcert(),
    nodePolyfills({
      // exclude: [],
    }),
  ],
  define: {
    // global: {},
  },
});
