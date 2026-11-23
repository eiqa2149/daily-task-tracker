import type { Task } from "../types/task";
import { daysInMonth, firstWeekdayOffset, formatLong, toDateKey } from "../utils/dateUtils";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface Props {
  year: number;
  month: number; // 0-11
  todayKey: string;
  selectedKey: string;
  tasksByDate: Record<string, Task[]>;
  onSelect: (dateKey: string) => void;
}

export default function CalendarGrid({ year, month, todayKey, selectedKey, tasksByDate, onSelect }: Props) {
  const blanks = firstWeekdayOffset(year, month); // empty cells before day 1 (Monday-first)
  const total = daysInMonth(year, month);

  return (
    <div>
      <div className="grid grid-cols-7 gap-1 text-center" role="grid" aria-label="Calendar">
        {WEEKDAYS.map((d) => (
          <div key={d} role="columnheader" className="rounded-full bg-offwhite py-1 text-xs text-brown/80">
            {d}
          </div>
        ))}

        {Array.from({ length: blanks }, (_, i) => (
          <div key={`blank-${i}`} aria-hidden="true" />
        ))}

        {Array.from({ length: total }, (_, i) => {
          const day = i + 1;
          const key = toDateKey(new Date(year, month, day));
          const dayTasks = tasksByDate[key] ?? [];
          const isToday = key === todayKey;
          const isSelected = key === selectedKey;
          const allDone = dayTasks.length > 0 && dayTasks.every((t) => t.completed);

          return (
            <button
              key={key}
              type="button"
              onClick={() => onSelect(key)}
              aria-pressed={isSelected}
              aria-current={isToday ? "date" : undefined}
              aria-label={`${formatLong(key)}${dayTasks.length ? `, ${dayTasks.length} task${dayTasks.length > 1 ? "s" : ""}` : ""}`}
              className={`relative mx-auto flex aspect-square w-full max-w-[44px] items-center justify-center rounded-full text-sm transition-colors ${
                isToday ? "bg-olive font-semibold text-offwhite" : "hover:bg-bright/50"
              } ${isSelected ? "ring-2 ring-rose ring-offset-2 ring-offset-blush" : ""}`}
            >
              {day}
              {dayTasks.length > 0 && (
                <span
                  aria-hidden="true"
                  className={`absolute bottom-1 h-1.5 w-1.5 rounded-full ${
                    allDone ? (isToday ? "bg-blush" : "bg-olive") : isToday ? "bg-bright" : "bg-rose"
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-3 flex justify-center gap-5 text-xs">
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-rose" /> Has tasks
        </span>
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-olive" /> Completed
        </span>
      </div>
    </div>
  );
}
