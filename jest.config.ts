import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  testEnvironment: 'node',
  verbose: true,
  detectLeaks: false,
  logHeapUsage: true,
  moduleNameMapper: {
    '^@config(.*)$': '<rootDir>/src/config$1',
    '^@constants(.*)$': '<rootDir>/src/constants$1',
    '^@controllers(.*)$': '<rootDir>/src/controllers$1',
    '^@models(.*)$': '<rootDir>/src/models$1',
    '^@modules(.*)$': '<rootDir>/src/modules$1',
    '^@repositories(.*)$': '<rootDir>/src/repositories$1',
    '^@routes(.*)$': '<rootDir>/src/routes$1',
    '^@utils(.*)$': '<rootDir>/src/utils$1',
  },
  // globalSetup: '<rootDir>/src/testSetup.ts',
}

export default config
