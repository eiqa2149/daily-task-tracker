import type { Task } from "../types/task";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, showMeta = false }: { tasks: Task[]; showMeta?: boolean }) {
  return (
    <ul>
      {tasks.map((t) => (
        <TaskItem key={t.id} task={t} showMeta={showMeta} />
      ))}
    </ul>
  );
}
