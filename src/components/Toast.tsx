/** Small success message shown above the bottom navigation. */
export default function Toast({ message }: { message: string }) {
  return (
    <div
      role="status"
      className="fixed left-1/2 z-50 -translate-x-1/2 animate-pop rounded-full bg-offwhite px-5 py-2.5 text-sm font-medium text-brown shadow-lg"
      style={{ bottom: "calc(5.5rem + env(safe-area-inset-bottom, 0px))" }}
    >
      {message}
    </div>
  );
}
