import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Task, TaskFormValues } from "../types/task";
import { createId, loadTasks, saveTasks } from "../utils/taskUtils";

export interface TaskContextValue {
  tasks: Task[];
  addTask: (values: TaskFormValues) => void;
  updateTask: (id: string, values: TaskFormValues) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
}

export const TaskContext = createContext<TaskContextValue | null>(null);

/** One shared task list for every page, saved to localStorage whenever it changes. */
export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(loadTasks);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = useCallback((v: TaskFormValues) => {
    const now = new Date().toISOString();
    setTasks((prev) => [...prev, { ...v, id: createId(), completed: false, createdAt: now, updatedAt: now }]);
  }, []);

  const updateTask = useCallback((id: string, v: TaskFormValues) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...v, updatedAt: new Date().toISOString() } : t)));
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed, updatedAt: new Date().toISOString() } : t))
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const value = useMemo(
    () => ({ tasks, addTask, updateTask, toggleTask, deleteTask }),
    [tasks, addTask, updateTask, toggleTask, deleteTask]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
