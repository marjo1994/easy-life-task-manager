import { defineConfig, mergeConfig } from "vite";
import { defineConfig as defineVitestConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
const viteConfig = defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
  },
});

const vitestConfig = defineVitestConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.ts",
  },
});

export default mergeConfig(viteConfig, vitestConfig);
