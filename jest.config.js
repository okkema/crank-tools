/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  testEnvironment: "jsdom",
}

module.exports = config
