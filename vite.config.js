import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Create alias for the "src" directory for cleaner imports
      '@': '/src',
    },
  },
  server: {
    // Uncomment and specify the port if needed
    // port: 8001,
  },
  build: {
    rollupOptions: {
      // Explicitly define input for Rollup to resolve correctly
      input: "index.html",
    },
  },
  optimizeDeps: {
    include: ["hoist-non-react-statics"], // Ensure dependencies are pre-bundled
  },
});
