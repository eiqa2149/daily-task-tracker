export const CATEGORIES = ["Personal", "Study", "Work", "Other"] as const;
export const PRIORITIES = ["Low", "Medium", "High"] as const;

export type Category = (typeof CATEGORIES)[number];
export type Priority = (typeof PRIORITIES)[number];

export interface Task {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD, local calendar date
  category: Category;
  priority: Priority;
  remarks: string;
  completed: boolean;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}

/** The fields a user fills in on the Add/Edit form. */
export type TaskFormValues = Pick<Task, "title" | "date" | "category" | "priority" | "remarks">;
