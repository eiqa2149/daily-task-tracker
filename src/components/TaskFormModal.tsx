import { useRef, useState, type FormEvent } from "react";
import { CATEGORIES, PRIORITIES, type Category, type Priority, type Task, type TaskFormValues } from "../types/task";
import Modal from "./Modal";

interface Props {
  /** Pass a task to edit it; leave undefined to add a new one. */
  task?: Task;
  defaultDate: string;
  onSubmit: (values: TaskFormValues) => void;
  onClose: () => void;
}

const PRIORITY_DOT: Record<Priority, string> = {
  Low: "bg-green-600",
  Medium: "bg-amber-500",
  High: "bg-red-600",
};

const FIELD =
  "w-full rounded-xl border border-bright bg-offwhite px-3 py-2 text-[15px] text-brown placeholder:text-brown/50";

export default function TaskFormModal({ task, defaultDate, onSubmit, onClose }: Props) {
  const isEdit = Boolean(task);
  const [values, setValues] = useState<TaskFormValues>(
    task
      ? { title: task.title, date: task.date, category: task.category, priority: task.priority, remarks: task.remarks }
      : { title: "", date: defaultDate, category: "Personal", priority: "Medium", remarks: "" }
  );
  const [errors, setErrors] = useState<{ title?: string; date?: string }>({});
  const submitted = useRef(false); // blocks accidental double submission

  function update<K extends keyof TaskFormValues>(key: K, value: TaskFormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (submitted.current) return;

    const next: { title?: string; date?: string } = {};
    if (!values.title.trim()) next.title = "Please enter a task name.";
    if (!values.date) next.date = "Please choose a date.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    submitted.current = true;
    onSubmit({ ...values, title: values.title.trim(), remarks: values.remarks.trim() });
  }

  return (
    <Modal title={isEdit ? "Edit Task" : "Add New Task"} onClose={onClose}>
      <form onSubmit={handleSubmit} noValidate className="space-y-3">
        <div>
          <label htmlFor="task-title" className="mb-1 block text-sm font-semibold">
            Task Name <span aria-hidden="true">*</span>
          </label>
          <input
            id="task-title"
            type="text"
            maxLength={150}
            placeholder="e.g. Finish assignment"
            value={values.title}
            onChange={(e) => update("title", e.target.value)}
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? "task-title-error" : undefined}
            className={FIELD}
          />
          {errors.title && (
            <p id="task-title-error" role="alert" className="mt-1 text-sm text-red-700">
              {errors.title}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="task-date" className="mb-1 block text-sm font-semibold">
            Date <span aria-hidden="true">*</span>
          </label>
          <input
            id="task-date"
            type="date"
            value={values.date}
            onChange={(e) => update("date", e.target.value)}
            aria-invalid={Boolean(errors.date)}
            aria-describedby={errors.date ? "task-date-error" : undefined}
            className={FIELD}
          />
          {errors.date && (
            <p id="task-date-error" role="alert" className="mt-1 text-sm text-red-700">
              {errors.date}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="task-category" className="mb-1 block text-sm font-semibold">
              Category
            </label>
            <select
              id="task-category"
              value={values.category}
              onChange={(e) => update("category", e.target.value as Category)}
              className={FIELD}
            >
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="task-priority" className="mb-1 flex items-center gap-1.5 text-sm font-semibold">
              <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${PRIORITY_DOT[values.priority]}`} />
              Priority
            </label>
            <select
              id="task-priority"
              value={values.priority}
              onChange={(e) => update("priority", e.target.value as Priority)}
              className={FIELD}
            >
              {PRIORITIES.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="task-remarks" className="mb-1 block text-sm font-semibold">
            Remarks
          </label>
          <textarea
            id="task-remarks"
            maxLength={1000}
            rows={4}
            placeholder="Add notes or details for this task..."
            value={values.remarks}
            onChange={(e) => update("remarks", e.target.value)}
            className={`${FIELD} resize-y`}
          />
          <p className="text-right text-xs text-brown/60">{values.remarks.length}/1000</p>
        </div>

        <div className="flex justify-center gap-3 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-rose bg-offwhite px-6 py-2 transition hover:-translate-y-0.5"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-full bg-olive px-6 py-2 font-semibold text-offwhite transition hover:-translate-y-0.5 hover:bg-[#3b5127]"
          >
            {isEdit ? "Save Changes" : "Add Task"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
