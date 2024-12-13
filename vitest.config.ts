import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true, // Enable global variables like `expect`, `vi`, etc.
    environment: "jsdom", // Use jsdom for DOM-related testing (React)
    setupFiles: "./test/setup.ts", // Path to your setup file
    coverage: {
      provider: "istanbul",
      reporter: ["text", "lcov"], // Coverage report formats
      include: ["src/**/*"], // Include files from the src directory
      exclude: ["src/tests/**/*", "src/**/*.test.tsx", "src/main.tsx"], // Exclude test files and test helpers
    },
  },
});
