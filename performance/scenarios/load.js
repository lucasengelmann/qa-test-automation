import loginScript    from '../scripts/login.js';
import productsScript from '../scripts/products.js';
import checkoutScript from '../scripts/checkout.js';
import { defaultThresholds } from '../k6.config.js';
import { assertApiIsReachable } from '../helpers/health.js';
import '../helpers/metrics.js';

export const options = {
  scenarios: {
    load_login: {
      executor: 'ramping-vus',
      exec: 'loginFlow',
      stages: [
        { duration: '2m', target: 50 },   // ramp-up
        { duration: '5m', target: 50 },   // sustentado
        { duration: '2m', target: 0  },   // ramp-down
      ],
    },
    load_products: {
      executor: 'ramping-vus',
      exec: 'productsFlow',
      startTime: '9m',
      stages: [
        { duration: '2m', target: 50 },
        { duration: '5m', target: 50 },
        { duration: '2m', target: 0  },
      ],
    },
    load_checkout: {
      executor: 'ramping-vus',
      exec: 'checkoutFlow',
      startTime: '18m',
      stages: [
        { duration: '2m', target: 20 },
        { duration: '5m', target: 20 },
        { duration: '2m', target: 0  },
      ],
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