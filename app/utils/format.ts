export function formatDateString(dateString: string) {
  return new Date(dateString).toLocaleDateString();
}
