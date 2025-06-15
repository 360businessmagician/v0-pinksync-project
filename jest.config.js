const nextJest = require("next/jest")

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: "./",
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.(test|spec).(js|jsx|ts|tsx)", "**/*.(test|spec).(js|jsx|ts|tsx)"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/", "<rootDir>/cypress/", "<rootDir>/.vercel/"],
  collectCoverageFrom: [
    "app/api/**/*.{js,jsx,ts,tsx}",
    "lib/**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  moduleNameMapping: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.json",
      },
    ],
  },
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
