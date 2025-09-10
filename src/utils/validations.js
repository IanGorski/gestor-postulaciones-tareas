// Función auxiliar de validación reutilizable
export function isNotEmpty(value) {
  return value !== undefined && value !== null && value.toString().trim() !== '';
}

// Valida fechas en formatos comunes: DD/MM/AAAA, DD-MM-AAAA, AAAA-MM-DD
export function isValidDate(value) {
  if (!value) return false;
  const s = value.toString().trim();
  const iso = /^\d{4}-\d{2}-\d{2}$/;
  const latam = /^\d{2}[/-]\d{2}[/-]\d{4}$/;
  if (!(iso.test(s) || latam.test(s))) return false;
  // Normaliza a AAAA-MM-DD para validar fecha real
  let y, m, d;
  if (iso.test(s)) {
    [y, m, d] = s.split('-').map(Number);
  } else {
    const parts = s.includes('/') ? s.split('/') : s.split('-');
    [d, m, y] = parts.map(Number);
  }
  const dt = new Date(y, m - 1, d);
  return dt.getFullYear() === y && dt.getMonth() === m - 1 && dt.getDate() === d;
}

export function isEmail(value) {
  if (!value) return false;
  return /.+@.+\..+/.test(value.toString());
}
