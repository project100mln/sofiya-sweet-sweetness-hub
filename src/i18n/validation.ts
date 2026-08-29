export const PHONE_PATTERN = "(?=(?:[^0-9]*[0-9]){7,15}[^0-9]*$)[+0-9 ()-]{7,20}";
export const PHONE_REGEXP = /^(?=(?:\D*\d){7,15}\D*$)[+0-9 ()-]{7,20}$/;
export const BUSINESS_TIME_ZONE = "Asia/Almaty";

export function todayInBusinessTimeZone(now = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: BUSINESS_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const value = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${value.year}-${value.month}-${value.day}`;
}

export function isCalendarDateOnOrAfter(value: string, minimum: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  const isRealCalendarDate =
    parsed.getUTCFullYear() === year &&
    parsed.getUTCMonth() === month - 1 &&
    parsed.getUTCDate() === day;
  return isRealCalendarDate && value >= minimum;
}
