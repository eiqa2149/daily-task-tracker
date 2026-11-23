// Small botanical branch with leaves and pink buds.
export default function Sprig({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 40" aria-hidden="true" focusable="false">
      <path d="M4 32C30 28 60 22 94 10" stroke="#6b8a45" strokeWidth="2" fill="none" strokeLinecap="round" />
      {[18, 38, 58, 76].map((x, i) => (
        <path
          key={x}
          d={`M${x} ${30 - i * 5}c4-10 12-12 16-10c-2 8-8 13-16 10z`}
          fill="#7d9c55"
        />
      ))}
      {[28, 48, 68, 90].map((x, i) => (
        <circle key={x} cx={x} cy={24 - i * 4.5} r="3.2" fill="#f4a3c4" stroke="#c56c91" strokeWidth="0.8" />
      ))}
    </svg>
  );
}
