import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    include: ["tests/vitest/**/*.{test,spec}.{js,ts,jsx,tsx}"],
    setupFiles: ["./setupTests.js"],
  },
});
