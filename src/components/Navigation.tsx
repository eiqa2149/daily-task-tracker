import { NavLink } from "react-router-dom";
import { CalendarDays, Home, ListChecks, type LucideIcon } from "lucide-react";

const ITEMS: { to: string; label: string; Icon: LucideIcon }[] = [
  { to: "/", label: "Today", Icon: Home },
  { to: "/calendar", label: "Calendar", Icon: CalendarDays },
  { to: "/tasks", label: "All Tasks", Icon: ListChecks },
];

export default function Navigation() {
  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-10 rounded-t-3xl bg-blush shadow-[0_-4px_16px_rgba(0,0,0,0.25)]"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <ul className="mx-auto flex max-w-xl justify-around px-2 py-2">
        {ITEMS.map(({ to, label, Icon }) => (
          <li key={to}>
            {/* NavLink adds aria-current="page" to the active link automatically */}
            <NavLink
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 rounded-2xl px-6 py-1.5 text-sm text-brown transition-colors hover:bg-bright/60 ${
                  isActive ? "bg-bright font-semibold" : ""
                }`
              }
            >
              <Icon size={22} aria-hidden="true" />
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
