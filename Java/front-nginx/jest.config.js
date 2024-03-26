module.exports = {
  preset: "react-native",
  testEnvironment: "jsdom",
  testURL: "http://localhost/",
  automock: false,
  verbose: false,
  collectCoverage: false,
  coverageThreshold: {
    global: {
      branches: 30,
      functions: 30,
      lines: 30,
      statements: 30,
    },
  },
  coverageReporters: ["json", "html"],
  collectCoverageFrom: [
    "src/**/*.{js,jsx}",
    "!src/**/index.{js,jsx}",
    "!src/**/*.styles.{js,jsx}",
    "!src/assets/*",
    "!src/modules/UrlManager/*",
  ],
  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy",
  },
  transform: {
    "\\.js$": "babel-jest",
    "\\.(xlsx)$": "<rootDir>/fileTransformer.js",
    "\\.(pdf)$": "<rootDir>/fileTransformer.js"
  },
  setupFiles: ["<rootDir>/src/test/setup.js"],
};
