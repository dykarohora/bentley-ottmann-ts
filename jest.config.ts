import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  verbose: true,
  preset: 'ts-jest',
  clearMocks: true,
  testEnvironment: 'node',
  roots: ['./src'],
  testMatch: [
    '**/?(*.)+(spec|test).+(ts|tsx|js)'
  ],
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json'
    }
  }
}

export default config
