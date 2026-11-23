import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import TaskDetailsModal from "../components/TaskDetailsModal";
import TaskFormModal from "../components/TaskFormModal";
import Toast from "../components/Toast";
import { useTasks } from "../hooks/useTasks";
import { getTodayKey } from "../utils/dateUtils";

type ModalState =
  | { type: "add"; date: string }
  | { type: "edit" | "details" | "delete"; id: string }
  | null;

export interface ModalContextValue {
  /** Open the Add Task popup. Pass a date (e.g. the calendar's selected day) to prefill it. */
  openAdd: (date?: string) => void;
  openEdit: (id: string) => void;
  openDetails: (id: string) => void;
  openDelete: (id: string) => void;
}

export const ModalContext = createContext<ModalContextValue | null>(null);

/** Owns which popup is open, so any page or row can open one. Also shows toasts. */
export function ModalProvider({ children }: { children: ReactNode }) {
  const { tasks, addTask, updateTask, deleteTask } = useTasks();
  const [modal, setModal] = useState<ModalState>(null);
  const [toast, setToast] = useState<{ id: number; text: string } | null>(null);

  const close = useCallback(() => setModal(null), []);
  const notify = (text: string) => setToast({ id: Date.now(), text });

  // Auto-hide the toast. The id changes each time, so repeated messages restart the timer.
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(timer);
  }, [toast]);

  // Look up the latest saved task so popups never show stale data.
  const task = modal && modal.type !== "add" ? tasks.find((t) => t.id === modal.id) : undefined;

  // If the task disappeared (deleted), close its popup.
  useEffect(() => {
    if (modal && modal.type !== "add" && !task) setModal(null);
  }, [modal, task]);

  const value = useMemo<ModalContextValue>(
    () => ({
      openAdd: (date) => setModal({ type: "add", date: date ?? getTodayKey() }),
      openEdit: (id) => setModal({ type: "edit", id }),
      openDetails: (id) => setModal({ type: "details", id }),
      openDelete: (id) => setModal({ type: "delete", id }),
    }),
    []
  );

  return (
    <ModalContext.Provider value={value}>
      {children}

      {modal?.type === "add" && (
        <TaskFormModal
          defaultDate={modal.date}
          onClose={close}
          onSubmit={(values) => {
            addTask(values);
            close();
            notify("Task added \u2661");
          }}
        />
      )}
      {modal?.type === "edit" && task && (
        <TaskFormModal
          task={task}
          defaultDate={task.date}
          onClose={close}
          onSubmit={(values) => {
            updateTask(task.id, values);
            close();
            notify("Changes saved \u2661");
          }}
        />
      )}
      {modal?.type === "details" && task && (
        <TaskDetailsModal
          task={task}
          onClose={close}
          onEdit={() => setModal({ type: "edit", id: task.id })}
          onDelete={() => setModal({ type: "delete", id: task.id })}
        />
      )}
      {modal?.type === "delete" && task && (
        <DeleteConfirmModal
          onClose={close}
          onConfirm={() => {
            deleteTask(task.id);
            close();
            notify("Task deleted");
          }}
        />
      )}

      {toast && <Toast key={toast.id} message={toast.text} />}
    </ModalContext.Provider>
  );
}
