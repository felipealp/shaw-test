module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    "^.+\\.(js|jsx)$": "babel-jest",
    "\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub"
  },
  transformIgnorePatterns: [
    "/node_modules/(?!axios)"
  ],
  moduleNameMapper: {
    "\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub",
    "^axios$": "axios"
  },

  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["html", "text"],
  collectCoverageFrom: [
    'src/components/**/*.{js,jsx,ts,tsx,vue}',
    'src/services/**/*.{js,jsx,ts,tsx,vue}',
    '!src/**/*.test.{js,jsx,ts,tsx}',
    '!src/**/*.{d.ts}'
  ],
};