import { CATEGORIES, PRIORITIES, type Task } from "../types/task";
import { isValidDateKey } from "./dateUtils";

export const STORAGE_KEY = "daily-task-tracker-v1";

export interface Progress {
  completed: number;
  total: number;
  percent: number;
}

/** Progress = completed / total * 100, safely returning 0 when there are no tasks. */
export const getProgress = (tasks: Task[]): Progress => {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  return { completed, total, percent: total === 0 ? 0 : Math.round((completed / total) * 100) };
};

/** Sort by date (earliest first). Ties keep their original (creation) order. */
export const sortByDate = (tasks: Task[]): Task[] =>
  tasks
    .map((task, index) => ({ task, index }))
    .sort((a, b) =>
      a.task.date < b.task.date ? -1 : a.task.date > b.task.date ? 1 : a.index - b.index
    )
    .map((x) => x.task);

/** Read tasks from localStorage; anything missing or malformed is ignored safely. */
export const loadTasks = (): Task[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const now = new Date().toISOString();
    return parsed
      .filter((t) => t && typeof t.id === "string" && typeof t.title === "string" && isValidDateKey(t.date))
      .map((t) => ({
        id: t.id,
        title: t.title,
        date: t.date,
        category: CATEGORIES.includes(t.category) ? t.category : "Personal",
        priority: PRIORITIES.includes(t.priority) ? t.priority : "Medium",
        remarks: typeof t.remarks === "string" ? t.remarks : "",
        completed: Boolean(t.completed),
        createdAt: typeof t.createdAt === "string" ? t.createdAt : now,
        updatedAt: typeof t.updatedAt === "string" ? t.updatedAt : now,
      }));
  } catch {
    return [];
  }
};

export const saveTasks = (tasks: Task[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    // Storage full or blocked: the app keeps working in memory.
  }
};

export const createId = (): string =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `t-${Date.now()}-${Math.random().toString(36).slice(2)}`;
