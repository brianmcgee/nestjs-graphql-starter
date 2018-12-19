module.exports = {
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node'
  ],
  rootDir: 'src',
  testRegex: '.spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  reporters: [
    'default',
    [
      'jest-junit',
      {
        'output': './test-reports/jest.xml',
      },
    ],
  ],
  bail: true,
  coverageDirectory: '../coverage',
  testEnvironment: 'node'
};
