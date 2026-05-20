import http from 'k6/http';
import { check, sleep } from 'k6';
import { loginDuration, loginErrors } from '../helpers/metrics.js';
import { BASE_URL } from '../k6.config.js';

export default function () {
  const payload = JSON.stringify({
    username: __ENV.TEST_USERNAME || 'admin',
    password: __ENV.TEST_PASSWORD || 'password123',
  });

  const res = http.post(`${BASE_URL}/auth`, payload, {
    headers: { 'Content-Type': 'application/json' },
    tags: { name: 'POST /auth' },
  });

  console.log(`Status: ${res.status} | Body: ${res.body?.substring(0, 100)}`);

  loginDuration.add(res.timings.duration);

  const token = res.body ? res.json('token') : null;

  const ok = check(res, {
    'status 200':     (r) => r.status === 200,
    'token presente': () => token !== undefined && token !== null && token !== '',
  });

  check(res, {
    'POST /auth tempo < 20000ms': (r) => r.timings.duration < 20000,
  });

  loginErrors.add(!ok);
  sleep(1);
}