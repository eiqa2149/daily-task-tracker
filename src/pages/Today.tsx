import { CalendarDays } from "lucide-react";
import AddTaskButton from "../components/AddTaskButton";
import CompletionMessage from "../components/CompletionMessage";
import EmptyState from "../components/EmptyState";
import ProgressBar from "../components/ProgressBar";
import TaskList from "../components/TaskList";
import { useModals } from "../hooks/useModals";
import { useTasks } from "../hooks/useTasks";
import { useTodayKey } from "../hooks/useTodayKey";
import { formatLong } from "../utils/dateUtils";
import { getProgress } from "../utils/taskUtils";

export default function Today() {
  const { tasks } = useTasks();
  const { openAdd } = useModals();
  const today = useTodayKey();

  // Only tasks scheduled for the current local day, in creation order.
  const todays = tasks.filter((t) => t.date === today);
  const progress = getProgress(todays);
  const allDone = progress.total > 0 && progress.completed === progress.total;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-2 font-display text-xl text-offwhite">
        <span>{formatLong(today)}</span>
        <CalendarDays aria-hidden="true" />
      </div>

      <ProgressBar progress={progress} />

      <section aria-labelledby="today-tasks" className="rounded-3xl bg-blush p-4 shadow-md">
        <h2 id="today-tasks" className="mb-1 font-display text-3xl font-semibold">
          Today&rsquo;s Tasks
        </h2>

        {todays.length === 0 ? (
          <EmptyState title="Nothing on your list today ♡" message="Take a rest or add a new task to get started!">
            <AddTaskButton onClick={() => openAdd(today)} />
          </EmptyState>
        ) : (
          <>
            <TaskList tasks={todays} />
            {allDone && <CompletionMessage />}
            <AddTaskButton onClick={() => openAdd(today)} />
          </>
        )}
      </section>
    </div>
  );
}
