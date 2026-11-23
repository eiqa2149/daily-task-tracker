import { Heart } from "lucide-react";

interface Props {
  checked: boolean;
  label: string;
  onToggle: () => void;
}

/** Heart-shaped checkbox. Outlined = pending, filled olive = completed. */
export default function HeartCheckbox({ checked, label, onToggle }: Props) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      onClick={onToggle}
      className="grid h-8 w-8 shrink-0 place-items-center rounded-full transition-transform hover:scale-110 active:scale-95"
    >
      <Heart
        size={24}
        aria-hidden="true"
        strokeWidth={2}
        className="transition-colors duration-300"
        color={checked ? "#2E3F1F" : "#C56C91"}
        fill={checked ? "#2E3F1F" : "none"}
      />
    </button>
  );
}
