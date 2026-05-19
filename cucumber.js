module.exports = {
  default: {
    require: ['playwright/step-definitions/**/*.ts', 'playwright/support/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: ['progress'],
    paths: ['playwright/features/**/*.feature'],
    parallel: 1,
  },
};
