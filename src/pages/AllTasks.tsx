import { useMemo, useState } from "react";
import AddTaskButton from "../components/AddTaskButton";
import EmptyState from "../components/EmptyState";
import TaskList from "../components/TaskList";
import { useModals } from "../hooks/useModals";
import { useTasks } from "../hooks/useTasks";
import { sortByDate } from "../utils/taskUtils";

type Filter = "All" | "Pending" | "Completed";
const FILTERS: Filter[] = ["All", "Pending", "Completed"];

export default function AllTasks() {
  const { tasks } = useTasks();
  const { openAdd } = useModals();
  const [filter, setFilter] = useState<Filter>("All");

  // Earliest date first; tasks on the same date keep creation order (stable sort).
  const sorted = useMemo(() => sortByDate(tasks), [tasks]);

  const counts: Record<Filter, number> = {
    All: tasks.length,
    Pending: tasks.filter((t) => !t.completed).length,
    Completed: tasks.filter((t) => t.completed).length,
  };

  const shown = sorted.filter((t) =>
    filter === "All" ? true : filter === "Pending" ? !t.completed : t.completed
  );

  return (
    <div className="space-y-4">
      <div role="group" aria-label="Filter tasks" className="flex gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={`flex-1 rounded-full border-2 px-2 py-1.5 text-sm transition-colors ${
              filter === f
                ? "border-offwhite bg-transparent font-semibold text-offwhite"
                : "border-blush bg-blush text-brown hover:bg-offwhite"
            }`}
          >
            {f} ({counts[f]})
          </button>
        ))}
      </div>

      <section aria-label="Task list" className="rounded-3xl bg-blush p-4 shadow-md">
        {shown.length === 0 ? (
          tasks.length === 0 ? (
            <EmptyState title="No tasks yet ♡" message="Add your first task to get started!" />
          ) : (
            <EmptyState title={`No ${filter.toLowerCase()} tasks ♡`} message="Try a different filter." />
          )
        ) : (
          <TaskList tasks={shown} showMeta />
        )}
        <AddTaskButton onClick={() => openAdd()} />
      </section>
    </div>
  );
}
