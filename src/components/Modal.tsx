import { X } from "lucide-react";
import { useEffect, useId, useRef, type ReactNode } from "react";
import Lily from "../assets/floral/Lily";
import Ribbon from "../assets/floral/Ribbon";

interface Props {
  title: string;
  onClose: () => void;
  children: ReactNode;
}

/**
 * Base dialog used by every popup.
 * Handles: Escape to close, click outside to close, keeping Tab focus inside the dialog,
 * locking page scroll, and returning focus to the previous element when it closes.
 */
export default function Modal({ title, onClose, children }: Props) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const dialog = dialogRef.current!;
    const previous = document.activeElement as HTMLElement | null;
    const focusables = () =>
      Array.from(dialog.querySelectorAll<HTMLElement>("button:not([disabled]), input, select, textarea"));

    // Focus the first form field if there is one, otherwise the dialog itself.
    (dialog.querySelector<HTMLElement>("input, select, textarea") ?? dialog).focus();
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      if (previous && document.contains(previous)) previous.focus();
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-40 grid animate-fade place-items-center bg-olive/70 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="relative max-h-[92vh] w-full max-w-md animate-pop overflow-y-auto rounded-3xl bg-blush p-6 shadow-2xl focus:outline-none"
      >
        <Lily className="pointer-events-none absolute left-2 top-2 h-14 w-14" />
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-offwhite"
        >
          <X size={20} aria-hidden="true" />
        </button>
        <h2 id={titleId} className="px-10 text-center font-display text-3xl font-semibold">
          {title}
        </h2>
        <Ribbon className="mx-auto mb-2 h-5 w-10" />
        {children}
      </div>
    </div>
  );
}
