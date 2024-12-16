import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // port: 8001,
  },
  build: {
    rollupOptions: {
      // Explicitly define input for Rollup to resolve correctly
      input: "index.html",
    },
  },
  optimizeDeps: {
    include: ["hoist-non-react-statics"],
  },
});
