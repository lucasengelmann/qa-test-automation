module.exports = {
  default: {
    require: [
      'playwright/support/**/*.ts',      // world.ts e hooks.ts primeiro
      'playwright/step-definitions/**/*.ts',
    ],
    requireModule: ['ts-node/register'],
    format: [
      'progress-bar',                               // terminal
      'html:reports/cucumber-report.html', // relatório HTML
      'json:reports/cucumber-report.json',          // para integração CI
    ],
    paths: ['playwright/features/**/*.feature'],
    parallel: 1,
    publishQuiet: true,
  },

  // Perfil só para testes smoke (rápidos, pré-deploy)
  smoke: {
    require: [
      'playwright/support/**/*.ts',
      'playwright/step-definitions/**/*.ts',
    ],
    requireModule: ['ts-node/register'],
    format: ['progress-bar'],
    paths: ['playwright/features/**/*.feature'],
    tags: '@smoke',
    parallel: 1,
    publishQuiet: true,
  },

  // Perfil para regressão completa
  regression: {
    require: [
      'playwright/support/**/*.ts',
      'playwright/step-definitions/**/*.ts',
    ],
    requireModule: ['ts-node/register'],
    format: [
      'progress-bar',
      'html:reports/regression-report.html',
      'json:reports/regression-report.json',
    ],
    paths: ['playwright/features/**/*.feature'],
    tags: '@regression or @smoke',
    parallel: 2,
    publishQuiet: true,
  },
};