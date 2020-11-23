module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/../../jest.base.setup.ts'],
  moduleNameMapper: {
    '^lodash-es$': 'lodash',
  },
};
