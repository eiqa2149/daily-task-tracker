// All dates are handled as LOCAL calendar dates in "YYYY-MM-DD" form.
// We never use toISOString() for dates, because it converts to UTC and can shift the day.

const pad = (n: number) => String(n).padStart(2, "0");

export const toDateKey = (d: Date): string =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export const getTodayKey = (): string => toDateKey(new Date());

export const parseDateKey = (key: string): Date => {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
};

export const isValidDateKey = (key: unknown): key is string =>
  typeof key === "string" && /^\d{4}-\d{2}-\d{2}$/.test(key);

/** e.g. "Monday, 23 November 2026" */
export const formatLong = (key: string): string =>
  parseDateKey(key).toLocaleDateString("en-GB", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

/** e.g. "Mon, 23 Nov" */
export const formatShort = (key: string): string =>
  parseDateKey(key).toLocaleDateString("en-GB", {
    weekday: "short", day: "numeric", month: "short",
  });

/** e.g. "November 2026" */
export const formatMonthYear = (year: number, month: number): string =>
  new Date(year, month, 1).toLocaleDateString("en-GB", { month: "long", year: "numeric" });

/** Number of days in a month (month is 0-11). Handles leap years automatically. */
export const daysInMonth = (year: number, month: number): number =>
  new Date(year, month + 1, 0).getDate();

/** How many empty cells come before day 1 when weeks start on Monday. */
export const firstWeekdayOffset = (year: number, month: number): number =>
  (new Date(year, month, 1).getDay() + 6) % 7;
