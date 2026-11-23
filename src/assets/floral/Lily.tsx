// Decorative pink lily. aria-hidden so screen readers skip it.
const PETAL_ANGLES = [0, 72, 144, 216, 288];
const DOT_ANGLES = [20, 60, 110, 160, 200, 250, 300];

export default function Lily({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="-60 -60 120 120" aria-hidden="true" focusable="false">
      <path d="M0 0C-20 30-40 55-52 58" stroke="#5d7a3a" strokeWidth="3" fill="none" strokeLinecap="round" />
      {PETAL_ANGLES.map((a) => (
        <g key={a} transform={`rotate(${a})`}>
          <path d="M0 0C-14-14-12-38 0-48C12-38 14-14 0 0Z" fill="#f4a3c4" stroke="#c56c91" strokeWidth="1.2" />
          <path d="M0-6V-38" stroke="#d9507f" strokeWidth="1.2" />
        </g>
      ))}
      {DOT_ANGLES.map((a) => (
        <circle key={a} cx={8 * Math.cos(a)} cy={8 * Math.sin(a)} r="1.6" fill="#c0392b" />
      ))}
      <circle r="4" fill="#f9e27a" />
    </svg>
  );
}
