export function formatMAD(amount, locale = "fr-FR") {
  const n = Number(amount);
  if (Number.isNaN(n)) return "";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "MAD",
    maximumFractionDigits: 0,
  }).format(n);
}
