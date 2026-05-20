export const BASE_URL = __ENV.BASE_URL || 'https://restful-booker.herokuapp.com';

// Thresholds padrão reutilizados em todos os cenários
export const defaultThresholds = {
  http_req_duration: ['p(95)<3000'],
  http_req_failed:   ['rate<0.01'],
  login_errors:      ['rate<0.01'],
  products_errors:   ['rate<0.01'],
  checkout_errors:   ['rate<0.01'],
};

export const stressThresholds = {
  http_req_duration: ['p(95)<3000', 'p(99)<5000'],
  http_req_failed:   ['rate<0.05'],
};

// Headers comuns
export const defaultHeaders = (token) => ({
  'Content-Type':  'application/json',
  'Authorization': `Bearer ${token}`,
});

// Configurações de conexão HTTP
export const httpParams = {
  timeout: '10s',
  tags: { env: __ENV.ENV || 'local' },
};

