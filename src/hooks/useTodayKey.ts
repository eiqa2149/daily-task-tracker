import { useEffect, useState } from "react";
import { getTodayKey } from "../utils/dateUtils";

/** Today's local date (YYYY-MM-DD). Re-checks every 30s so it rolls over at midnight. */
export function useTodayKey(): string {
  const [today, setToday] = useState(getTodayKey);
  useEffect(() => {
    const id = setInterval(() => setToday(getTodayKey()), 30_000);
    return () => clearInterval(id);
  }, []);
  return today;
}
