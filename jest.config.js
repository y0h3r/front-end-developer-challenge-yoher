module.exports = {
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "ts-jest",
     "\\.(png|jpg|jpeg|gif|svg)$": "jest-transform-stub"
  },
  moduleNameMapper: {
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@pages/(.*)$": "<rootDir>/src/pages/$1",
    "^@styles/(.*)$": "<rootDir>/src/styles/$1",
    "^@assets/(.*)$": "<rootDir>/src/assets/$1",
     "^@store/(.*)$": "<rootDir>/src/store/$1",
     "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  }
};
