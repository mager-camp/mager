/**
 * Format Date object to "YYYY-MM-DD"
 */
export function formatDate(date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

/**
 * Format ISO string to locale time "HH.MM"
 */
export function formatTime(isoString) {
  return new Date(isoString).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
}