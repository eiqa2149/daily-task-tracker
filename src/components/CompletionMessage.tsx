import Lily from "../assets/floral/Lily";
import Star from "../assets/floral/Star";

/** Shown beside (not instead of) the task list when everything is done. */
export default function CompletionMessage() {
  return (
    <div role="status" className="mt-3 flex items-center gap-3 rounded-2xl bg-offwhite px-4 py-3">
      <div className="relative shrink-0">
        <Lily className="h-12 w-12" />
        <Star className="absolute -right-2 -top-1 h-3 w-3 text-bright" />
      </div>
      <div>
        <h3 className="font-display text-xl font-semibold">All tasks completed! &#9825;</h3>
        <p className="text-sm">You did it! Take a well-deserved break.</p>
      </div>
    </div>
  );
}
