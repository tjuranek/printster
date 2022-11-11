/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
  moduleNameMapper: {
    '~/(.*)': '<rootDir>/app/$1'
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest'
  }
};
