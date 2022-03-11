// jest.config.js
module.exports = {
  transform: {
    '^.+\\.(j|t)sx?$': 'babel-jest',
    '\\.svg$': 'svg-jest',
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/assetsTransformer.js',
    'src/(.*)': '<rootDir>/src/$1',
  },
  moduleDirectories: ['node_modules', 'src'],
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!node_modules/**',
    '!build/**',
    '!src/index.tsx',
    '!src/reportWebVitals.ts',
    '!src/types/**',
    '!coverage/**',
    '!config/**',
  ],
};
