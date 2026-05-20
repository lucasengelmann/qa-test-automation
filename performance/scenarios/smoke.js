import loginScript    from '../scripts/login.js';
import productsScript from '../scripts/products.js';
import checkoutScript from '../scripts/checkout.js';
import { defaultThresholds } from '../k6.config.js';
import { assertApiIsReachable } from '../helpers/health.js';
import '../helpers/metrics.js';

export const options = {
  scenarios: {
    smoke_login: {
      executor: 'constant-vus',
      exec: 'loginFlow',
      vus: 1,
      duration: '30s',
    },
    smoke_products: {
      executor: 'constant-vus',
      exec: 'productsFlow',
      vus: 1,
      duration: '30s',
      startTime: '30s',
    },
    smoke_checkout: {
      executor: 'constant-vus',
      exec: 'checkoutFlow',
      vus: 1,
      duration: '30s',
      startTime: '60s',
    },
  },
  thresholds: { ...defaultThresholds },
};

export function setup() {
  assertApiIsReachable();
}

export function loginFlow()    { loginScript(); }
export function productsFlow() { productsScript(); }
export function checkoutFlow() { checkoutScript(); }