import http from 'k6/http';
import { BASE_URL } from '../k6.config.js';

export function assertApiIsReachable() {
    const res = http.get(`${BASE_URL}/ping`, {
        timeout: '5s',
        tags: { name: 'GET /ping' },
  });

  if (res.error || res.status !== 201) {
    throw new Error(
      `API indisponivel em ${BASE_URL}/ping. ` +
      `Suba a API antes do k6 ou informe -e BASE_URL com um endereco acessivel. ` +
      `Status: ${res.status}. Erro: ${res.error || 'sem detalhes'}`
    );
  }
}