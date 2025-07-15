// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',     // simulate browser environment
    globals: true,            // 👈 makes `expect` available globally
    setupFiles: ['./vitest.setup.js'] // loads jest-dom
  }
});
