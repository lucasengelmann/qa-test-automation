import http from 'k6/http';
import { check } from 'k6';
import { BASE_URL } from '../k6.config.js';

export function getAuthToken() {
  const payload = JSON.stringify({
    username: __ENV.TEST_USERNAME || 'admin',
    password: __ENV.TEST_PASSWORD || 'password123',
  });

   const res = http.post(`${BASE_URL}/auth`, payload, {
    headers: { 'Content-Type': 'application/json' },
    tags: { name: 'POST /auth' },
  });

  const hasValidResponse = check(res, {
    'login retornou 200': (r) => r.status === 200,
    'login retornou body': (r) => Boolean(r.body),
  });

  if (!hasValidResponse || !res.body) {
    console.error(
      `Falha no login em ${BASE_URL}/auth. ` +
      `Status: ${res.status}. Erro: ${res.error || 'sem detalhes'}`
    );
    return null;
  }

  const token = res.json('token');

  check(token, {
    'token presente': (value) => value !== undefined && value !== null && value !== '',
  });

  return token;
}

export { BASE_URL };