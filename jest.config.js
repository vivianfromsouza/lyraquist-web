/** @type {import('jest').Config} */
const config = {
  verbose: true,
  setupFilesAfterEnv: [
  "@testing-library/jest-dom/extend-expect"
]
};


module.exports = config;