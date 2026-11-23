import { MessageSquare, Pencil, Trash2 } from "lucide-react";
import type { ReactNode } from "react";
import { useModals } from "../hooks/useModals";
import { useTasks } from "../hooks/useTasks";
import type { Priority, Task } from "../types/task";
import { formatShort } from "../utils/dateUtils";
import HeartCheckbox from "./HeartCheckbox";

const PRIORITY_DOT: Record<Priority, string> = {
  Low: "bg-green-600",
  Medium: "bg-amber-500",
  High: "bg-red-600",
};

function IconButton({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-brown transition-colors hover:bg-offwhite"
    >
      {children}
    </button>
  );
}

interface Props {
  task: Task;
  /** All Tasks page: also show date, category badge and the delete button. */
  showMeta?: boolean;
}

export default function TaskItem({ task, showMeta = false }: Props) {
  const { toggleTask } = useTasks();
  const { openDetails, openEdit, openDelete } = useModals();

  return (
    <li className="flex items-center gap-2 border-b border-bright/60 py-2 last:border-b-0">
      <HeartCheckbox
        checked={task.completed}
        label={`${task.completed ? "Mark as pending" : "Mark as completed"}: ${task.title}`}
        onToggle={() => toggleTask(task.id)}
      />
      {/* min-w-0 + break-words lets long titles wrap instead of pushing buttons away */}
      <div className="min-w-0 flex-1">
        <span
          className={`block break-words text-[15px] transition-opacity ${
            task.completed ? "line-through opacity-60" : ""
          }`}
        >
          {task.title}
        </span>
        {showMeta && (
          <span className="flex items-center gap-1.5 text-xs text-brown/75">
            <span aria-hidden="true" className={`h-2 w-2 rounded-full ${PRIORITY_DOT[task.priority]}`} />
            {formatShort(task.date)} &middot; {task.priority}
            <span className="min-[420px]:hidden">&middot; {task.category}</span>
          </span>
        )}
      </div>
      {showMeta && (
        <span className="hidden shrink-0 rounded-full bg-offwhite px-2.5 py-0.5 text-xs text-rose min-[420px]:inline">
          {task.category}
        </span>
      )}
      <IconButton label={`View details: ${task.title}`} onClick={() => openDetails(task.id)}>
        <MessageSquare size={18} aria-hidden="true" />
      </IconButton>
      <IconButton label={`Edit: ${task.title}`} onClick={() => openEdit(task.id)}>
        <Pencil size={18} aria-hidden="true" />
      </IconButton>
      {showMeta && (
        <IconButton label={`Delete: ${task.title}`} onClick={() => openDelete(task.id)}>
          <Trash2 size={18} aria-hidden="true" />
        </IconButton>
      )}
    </li>
  );
}
