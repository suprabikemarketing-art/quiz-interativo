export function formatWhatsApp(value: string): string {
  const digitsOnly = value.replace(/\D/g, '').slice(0, 11);
  
  if (digitsOnly.length <= 2) {
    return digitsOnly ? `(${digitsOnly}` : '';
  }
  if (digitsOnly.length <= 7) {
    return `(${digitsOnly.slice(0, 2)}) ${digitsOnly.slice(2)}`;
  }
  return `(${digitsOnly.slice(0, 2)}) ${digitsOnly.slice(2, 7)}-${digitsOnly.slice(7, 11)}`;
}

export function cleanPhoneDigits(formatted: string): string {
  return formatted.replace(/\D/g, '');
}

export function getUtmSource(): string {
  if (typeof window === 'undefined') return 'direct';
  const params = new URLSearchParams(window.location.search);
  return params.get('utm_source') || params.get('src') || 'instagram_bio';
}
