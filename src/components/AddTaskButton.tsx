import { Plus } from "lucide-react";
import Sprig from "../assets/floral/Sprig";

/** Large olive "+ Add Task" button with small sprigs either side. */
export default function AddTaskButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="mt-4 flex items-center justify-center gap-2">
      <Sprig className="hidden h-8 w-16 min-[380px]:block" />
      <button
        type="button"
        onClick={onClick}
        className="flex max-w-[260px] flex-1 items-center justify-center gap-2 rounded-full bg-olive py-3 font-display text-xl font-bold text-offwhite shadow transition hover:-translate-y-0.5 hover:bg-[#3b5127]"
      >
        <Plus size={20} aria-hidden="true" /> Add Task
      </button>
      <Sprig className="hidden h-8 w-16 -scale-x-100 min-[380px]:block" />
    </div>
  );
}
