import loginScript    from '../scripts/login.js';
import productsScript from '../scripts/products.js';
import checkoutScript from '../scripts/checkout.js';
import { stressThresholds } from '../k6.config.js';
import { assertApiIsReachable } from '../helpers/health.js';
import '../helpers/metrics.js';

export const options = {
  scenarios: {
    stress_combined: {
      executor: 'ramping-vus',
      stages: [
        { duration: '2m',  target: 50  },
        { duration: '5m',  target: 100 },
        { duration: '2m',  target: 200 },
        { duration: '5m',  target: 200 },  // pico
        { duration: '2m',  target: 300 },  // acima do esperado
        { duration: '5m',  target: 300 },
        { duration: '5m',  target: 0   },  // recovery
      ],
    },
  },
  thresholds: {
   ...stressThresholds
  },
};

export function setup() {
  assertApiIsReachable();
}

export default function () {
  const roll = Math.random();
  if      (roll < 0.4) loginScript();
  else if (roll < 0.7) productsScript();
  else                 checkoutScript();
}