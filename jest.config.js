/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/logic/**/*.test.js', '**/tests/content/**/*.test.js'],
  testTimeout: 10000,
};
