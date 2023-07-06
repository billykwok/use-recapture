export default {
  injectGlobals: false,
  collectCoverage: true,
  coverageProvider: 'v8',
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: ['*.ts', '*.tsx', '!*.test.ts', '!*.test.tsx'],
  notify: true,
  notifyMode: 'always',
  verbose: true,
};
