# QA Study Project

[![E2E Tests](https://github.com/lucasengelmann/qa-test-automation/actions/workflows/e2e.yml/badge.svg)](https://github.com/lucasengelmann/qa-test-automation/actions/workflows/e2e.yml)
[![API Tests](https://github.com/lucasengelmann/qa-test-automation/actions/workflows/api-tests.yml/badge.svg)](https://github.com/lucasengelmann/qa-test-automation/actions/workflows/api-tests.yml)
[![Performance Tests](https://github.com/lucasengelmann/qa-test-automation/actions/workflows/performance.yml/badge.svg)](https://github.com/lucasengelmann/qa-test-automation/actions/workflows/performance.yml)

QA study project covering E2E, API, and performance testing.

## Test Suites

- E2E: Playwright + Cucumber against SauceDemo.
- API: Newman/Postman against Restful Booker.
- Performance: k6 against Restful Booker.

## Local Commands

```bash
npm ci
npm run test:e2e
npm run test:api
k6 run performance/scenarios/smoke.js
```

## CI/CD

The GitHub Actions workflows are stored in `.github/workflows`:

- `e2e.yml`: runs Playwright + Cucumber and publishes `reports/cucumber-report.html` and `reports/cucumber-report.json`.
- `api-tests.yml`: runs Newman and publishes `reports/newman-report.html`.
- `performance.yml`: runs the k6 smoke scenario and publishes `performance/reports/k6-smoke-summary.json` and `performance/reports/k6-smoke-output.txt`.

All workflows run on `push`, `pull_request`, manual dispatch, and a nightly schedule.

## Failure Notifications

To receive notifications, configure the `SLACK_WEBHOOK_URL` secret in GitHub:

`Settings > Secrets and variables > Actions > New repository secret`

When this secret exists, failed workflows send a message with a link to the failed run.
