import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import Lily from "../assets/floral/Lily";
import Ribbon from "../assets/floral/Ribbon";
import AddTaskButton from "../components/AddTaskButton";
import CalendarGrid from "../components/CalendarGrid";
import EmptyState from "../components/EmptyState";
import TaskList from "../components/TaskList";
import { useModals } from "../hooks/useModals";
import { useTasks } from "../hooks/useTasks";
import { useTodayKey } from "../hooks/useTodayKey";
import type { Task } from "../types/task";
import { formatMonthYear, formatShort, parseDateKey } from "../utils/dateUtils";
import { getProgress } from "../utils/taskUtils";

export default function Calendar() {
  const { tasks } = useTasks();
  const { openAdd } = useModals();
  const todayKey = useTodayKey();

  // Which month is on screen, and which day is selected.
  const [view, setView] = useState(() => {
    const d = parseDateKey(todayKey);
    return { year: d.getFullYear(), month: d.getMonth() };
  });
  const [selected, setSelected] = useState(todayKey);

  // Group tasks by date once, so every calendar cell can look its tasks up quickly.
  const tasksByDate = useMemo(() => {
    const map: Record<string, Task[]> = {};
    for (const t of tasks) (map[t.date] ??= []).push(t);
    return map;
  }, [tasks]);

  const selectedTasks = tasksByDate[selected] ?? [];
  const progress = getProgress(selectedTasks);

  // Date(year, month + delta, 1) rolls over year boundaries for us (Dec -> Jan etc.).
  function changeMonth(delta: number) {
    setView((v) => {
      const d = new Date(v.year, v.month + delta, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });
  }

  function goToToday() {
    const d = parseDateKey(todayKey);
    setView({ year: d.getFullYear(), month: d.getMonth() });
    setSelected(todayKey);
  }

  return (
    <div className="space-y-4">
      <section className="relative rounded-3xl bg-blush p-4 shadow-md" aria-label="Monthly calendar">
        <Ribbon className="pointer-events-none absolute -top-5 right-14 h-9 w-14 rotate-12" />
        <Lily className="pointer-events-none absolute -bottom-4 -right-3 h-16 w-16" />

        <div className="mb-2 flex items-center justify-between">
          <button
            type="button"
            aria-label="Previous month"
            onClick={() => changeMonth(-1)}
            className="grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-offwhite"
          >
            <ChevronLeft aria-hidden="true" />
          </button>
          <h2 className="flex items-center gap-2 font-display text-2xl font-semibold" aria-live="polite">
            <CalendarDays size={20} aria-hidden="true" />
            {formatMonthYear(view.year, view.month)}
          </h2>
          <button
            type="button"
            aria-label="Next month"
            onClick={() => changeMonth(1)}
            className="grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-offwhite"
          >
            <ChevronRight aria-hidden="true" />
          </button>
        </div>

        <div className="mb-3 text-center">
          <button
            type="button"
            onClick={goToToday}
            className="rounded-full bg-offwhite px-4 py-1 text-sm transition hover:-translate-y-0.5"
          >
            Today
          </button>
        </div>

        <CalendarGrid
          year={view.year}
          month={view.month}
          todayKey={todayKey}
          selectedKey={selected}
          tasksByDate={tasksByDate}
          onSelect={setSelected}
        />
      </section>

      <section aria-labelledby="selected-heading" className="rounded-3xl bg-blush p-4 shadow-md">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3">
          <h2 id="selected-heading" className="font-display text-2xl font-semibold">
            Tasks on {formatShort(selected)}
          </h2>
          {progress.total > 0 && (
            <span className="text-xs">
              {progress.completed} of {progress.total} completed ({progress.percent}%)
            </span>
          )}
        </div>

        {selectedTasks.length === 0 ? (
          <EmptyState title="No tasks on this date ♡" message="Add one to plan this day." />
        ) : (
          <TaskList tasks={selectedTasks} />
        )}

        {/* The selected date prefills the Add Task form */}
        <AddTaskButton onClick={() => openAdd(selected)} />
      </section>
    </div>
  );
}
