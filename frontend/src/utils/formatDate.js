export function formatDate(value, locale = "fr-FR", options) {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString(
    locale,
    options ?? {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  );
}
