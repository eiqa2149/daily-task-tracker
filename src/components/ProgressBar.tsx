import Star from "../assets/floral/Star";
import Lily from "../assets/floral/Lily";
import type { Progress } from "../utils/taskUtils";

export default function ProgressBar({ progress }: { progress: Progress }) {
  const { completed, total, percent } = progress;
  return (
    <section
      aria-label="Today's progress"
      className="relative overflow-hidden rounded-[26px] border-2 border-offwhite px-5 py-4 text-offwhite"
    >
      <Lily className="pointer-events-none absolute -bottom-3 -right-3 h-16 w-16 opacity-90" />
      <div className="flex items-baseline justify-between">
        <h2 className="flex items-center gap-1 font-display text-2xl">
          Today&rsquo;s Progress
          <Star className="h-3 w-3 text-bright" />
        </h2>
        <span className="font-display text-3xl">{percent}%</span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Tasks completed today"
        className="my-2 h-5 overflow-hidden rounded-full border-2 border-offwhite"
      >
        <div
          className="h-full transition-[width] duration-700 ease-out"
          style={{
            width: `${percent}%`,
            background: "repeating-linear-gradient(135deg,#F9D6E3 0 10px,#E8A0BF 10px 20px)",
          }}
        />
      </div>
      <p className="text-center text-sm">
        {total === 0 ? "No tasks planned for today." : `${completed} of ${total} tasks completed`}
      </p>
    </section>
  );
}
