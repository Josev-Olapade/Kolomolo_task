import type { Config } from "jest";

const config: Config = {
  moduleDirectories: ["node_modules", "src"],
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.ts"],
  preset: "@shelf/jest-dynamodb",
  testEnvironment: "node",
  verbose: true,
  transform: {
    "^.+\\.tsx?$": "ts-jest", // Use ts-jest transformer for TypeScript files
  },
};
export default config;
