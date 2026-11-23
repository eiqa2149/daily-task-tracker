// Small pink bow, used as a decorative accent.
export default function Ribbon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 60 40" aria-hidden="true" focusable="false">
      <path d="M30 20C18 4 4 6 4 16s14 10 26 4z" fill="#f4a3c4" stroke="#c56c91" strokeWidth="1.2" />
      <path d="M30 20C42 4 56 6 56 16s-14 10-26 4z" fill="#f4a3c4" stroke="#c56c91" strokeWidth="1.2" />
      <path d="M30 20L18 36M30 20l12 16" stroke="#c56c91" strokeWidth="3" strokeLinecap="round" />
      <circle cx="30" cy="20" r="5" fill="#e8a0bf" stroke="#c56c91" strokeWidth="1.2" />
    </svg>
  );
}
