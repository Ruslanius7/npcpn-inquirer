export function formatDateTime(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString("ru-ru", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
