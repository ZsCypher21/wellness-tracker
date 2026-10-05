// Date helpers shared across the app.
// The API returns DATE columns as "YYYY-MM-DD" strings. new Date("YYYY-MM-DD")
// parses them as UTC midnight, which shifts the day in some timezones, so
// these helpers always work in the user's local time.

// "2026-10-05" (or an ISO string) -> Date at local midnight
export function parseLocalDate(value) {
  if (!value) return null;
  const [y, m, d] = String(value).slice(0, 10).split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}

// "2026-10-05" -> "5 Oct 2026"
export function formatDate(value) {
  const d = parseLocalDate(value);
  return d
    ? d.toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" })
    : "";
}

// Date -> "YYYY-MM-DD" in local time (for <input type="date">)
export function toInputDate(date = new Date()) {
  const pad = (n) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

// True if the date falls within the last 7 days (today + previous 6 days)
export function isWithinLastWeek(value) {
  const d = parseLocalDate(value);
  if (!d) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(today);
  start.setDate(today.getDate() - 6);
  return d >= start && d <= today;
}

// ISO timestamp from the API -> "YYYY-MM-DDTHH:mm" for <input type="datetime-local">
export function toInputDateTime(value) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n) => String(n).padStart(2, "0");
  return `${toInputDate(d)}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

// "YYYY-MM-DDTHH:mm" (local) -> ISO string in UTC, so the server stores the right moment
export function localDateTimeToIso(value) {
  if (!value) return "";
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? "" : d.toISOString();
}
