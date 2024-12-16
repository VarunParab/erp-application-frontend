import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src', // Alias for cleaner imports
    },
  },
  server: {
    host: "digitalvasai.com", // Set host to your custom domain
    port: 80, // Default HTTP port
  },
  build: {
    rollupOptions: {
      input: "index.html", // Explicitly define input
    },
  },
  optimizeDeps: {
    include: ["hoist-non-react-statics"], // Pre-bundle dependencies
  },
});
