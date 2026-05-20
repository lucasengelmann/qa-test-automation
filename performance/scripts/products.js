import http from 'k6/http';
import { check, sleep } from 'k6';
import { BASE_URL } from '../helpers/auth.js';
import { productsDuration, productsErrors } from '../helpers/metrics.js';

export default function () {
  const res = http.get(`${BASE_URL}/booking`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    tags: { name: 'GET /booking' },
  });

  productsDuration.add(res.timings.duration);

  const bookings = res.body ? res.json() : null;

  const ok = check(res, {
    'status 200':      (r) => r.status === 200,
    'lista nao vazia': () => Array.isArray(bookings) && bookings.length > 0,
  });

  check(res, {
    'GET /booking tempo < 20000ms': (r) => r.timings.duration < 20000,
  });

  productsErrors.add(!ok);
  sleep(1);
}
