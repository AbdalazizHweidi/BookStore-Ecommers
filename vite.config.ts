import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// One config file for both the dev server and the tests (Vitest).
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    css: false,
  },
});
