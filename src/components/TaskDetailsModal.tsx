import { CalendarDays, Flag, MessageSquare, Pencil, Trash2 } from "lucide-react";
import { useTasks } from "../hooks/useTasks";
import type { Priority, Task } from "../types/task";
import { formatLong } from "../utils/dateUtils";
import HeartCheckbox from "./HeartCheckbox";
import Modal from "./Modal";

const PRIORITY_DOT: Record<Priority, string> = {
  Low: "bg-green-600",
  Medium: "bg-amber-500",
  High: "bg-red-600",
};

interface Props {
  task: Task; // always the latest saved version, passed down from the modal provider
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
}

export default function TaskDetailsModal({ task, onEdit, onDelete, onClose }: Props) {
  const { toggleTask } = useTasks();

  return (
    <Modal title="Task Details" onClose={onClose}>
      <div className="flex items-start gap-2">
        <HeartCheckbox
          checked={task.completed}
          label={task.completed ? "Mark as pending" : "Mark as completed"}
          onToggle={() => toggleTask(task.id)}
        />
        <div className="min-w-0 flex-1">
          <p className={`break-words font-semibold ${task.completed ? "line-through opacity-60" : ""}`}>{task.title}</p>
          <p className="text-sm">{task.completed ? "Completed" : "Pending"}</p>
        </div>
        <span className="shrink-0 rounded-full bg-offwhite px-3 py-0.5 text-xs text-rose">{task.category}</span>
      </div>

      <ul className="mt-3 space-y-2 text-sm">
        <li className="flex items-center gap-2">
          <CalendarDays size={18} aria-hidden="true" /> {formatLong(task.date)}
        </li>
        <li className="flex items-center gap-2">
          <Flag size={18} aria-hidden="true" />
          <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${PRIORITY_DOT[task.priority]}`} />
          {task.priority} Priority
        </li>
        <li className="flex items-center gap-2 font-semibold">
          <MessageSquare size={18} aria-hidden="true" /> Remarks
        </li>
      </ul>
      <p className="mt-2 whitespace-pre-wrap break-words rounded-xl bg-offwhite p-3 text-sm">
        {task.remarks || "No remarks added yet."}
      </p>

      <div className="mt-4 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={onEdit}
          className="flex items-center gap-1.5 rounded-full border border-rose bg-offwhite px-5 py-2 transition hover:-translate-y-0.5"
        >
          <Pencil size={16} aria-hidden="true" /> Edit
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="flex items-center gap-1.5 rounded-full border border-rose bg-offwhite px-5 py-2 transition hover:-translate-y-0.5"
        >
          <Trash2 size={16} aria-hidden="true" /> Delete
        </button>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full bg-olive px-5 py-2 font-semibold text-offwhite transition hover:-translate-y-0.5"
        >
          Close
        </button>
      </div>
    </Modal>
  );
}
