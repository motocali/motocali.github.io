/* Link de tu Apps Script (Implementar → Gestionar implementaciones → URL que termina en /exec).
   Si algún día cambias de implementación, cambia solo esta línea. */
window.API_URL = 'https://script.google.com/macros/s/AKfycbw4p5XgXCYnqSOTG0ZQnUzwVVpTu3BU3Bh9YaJrA4mWx4dKkBxmC0bpTfT2t7Y00e967w/exec';

/* Modo demo (datos de prueba guardados en el navegador): solo en tu PC o agregando ?demo=1 al link */
window.DEMO = /^(localhost|127\.0\.0\.1)$/.test(location.hostname) || /[?&]demo=1/.test(location.search);

/* Función común: llama a la API (Apps Script) y devuelve los datos. */
window.callAPI = function (accion, datos) {
  if (window.DEMO && window.MockAPI) {
    return new Promise(function (res, rej) { try { res(window.MockAPI(accion, datos || {})); } catch (e) { rej(e); } });
  }
  return fetch(window.API_URL, {
    method: 'POST',
    redirect: 'follow',
    credentials: 'omit',                                   // sin cookies de Google: evita errores de cuentas
    headers: { 'Content-Type': 'text/plain;charset=utf-8' }, // evita la verificación CORS previa
    body: JSON.stringify({ accion: accion, datos: datos || {} })
  })
    .then(function (r) { if (!r.ok) throw new Error('Sin conexión (' + r.status + ')'); return r.json(); })
    .then(function (j) { if (!j.ok) throw new Error(j.error || 'Error'); return j.data; })
    .catch(function (e) { throw new Error(e && e.message && /fetch|network/i.test(e.message) ? 'Sin conexión, intenta de nuevo' : (e.message || e)); });
};
