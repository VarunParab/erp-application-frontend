import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as hoistNonReactStatics from "hoist-non-react-statics";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // port: 8001,
  },
  optimizeDeps: {
    include: ["hoist-non-react-statics"],
  },
});
