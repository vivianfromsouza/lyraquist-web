import { defineConfig } from 'vitest/config'

/** @type {import('jest').Config} */
const config = {
  verbose: true,
  setupFilesAfterEnv: [
  "@testing-library/jest-dom/extend-expect"
]
};

export default defineConfig({
  test: {
    globals: true
    
  }
})


module.exports = config;