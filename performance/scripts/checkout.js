import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { getAuthToken, BASE_URL } from '../helpers/auth.js';
import { checkoutDuration, checkoutErrors } from '../helpers/metrics.js';

export default function () {
  const token = getAuthToken();

  if (!token) {
    checkoutErrors.add(1);
    sleep(1);
    return;
  }

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  group('Fluxo de checkout', () => {
    const bookingRes = http.post(`${BASE_URL}/booking`, JSON.stringify({
      firstname: `K6-${__VU}`,
      lastname: 'Performance',
      totalprice: 150,
      depositpaid: true,
      bookingdates: {
        checkin: '2026-01-01',
        checkout: '2026-01-07',
      },
      additionalneeds: 'Breakfast',
    }), { headers, tags: { name: 'POST /booking' } });

    const bookingId = bookingRes.body ? bookingRes.json('bookingid') : null;

    const bookingOk = check(bookingRes, {
      'booking criado':  (r) => r.status === 200,
      'bookingId existe': () => bookingId !== undefined && bookingId !== null,
    });

    if (!bookingOk || !bookingId) {
      console.error(
        `Falha ao criar booking. Status: ${bookingRes.status}. ` +
        `Body: ${bookingRes.body ? bookingRes.body.substring(0, 300) : 'sem body'}`
      );
      checkoutErrors.add(1);
      sleep(1);
      return;
    }

    sleep(0.5);

    const deleteRes = http.del(`${BASE_URL}/booking/${bookingId}`, null, {
      headers: {
        ...headers,
        Cookie: `token=${token}`,
      },
      tags: { name: 'DELETE /booking/:id' },
    });

    checkoutDuration.add(bookingRes.timings.duration);

    const ok = check(deleteRes, {
      'booking removido': (r) => r.status === 201,
    });

    check(deleteRes, {
      'DELETE /booking/:id tempo < 20000ms': (r) => r.timings.duration < 20000,
    });

    if (!ok) {
      console.error(
        `Falha ao remover booking ${bookingId}. Status: ${deleteRes.status}. ` +
        `Body: ${deleteRes.body ? deleteRes.body.substring(0, 300) : 'sem body'}`
      );
    }

    checkoutErrors.add(!ok);
  });

  sleep(1);
}