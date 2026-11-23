import Lily from "../assets/floral/Lily";
import Sprig from "../assets/floral/Sprig";

export default function Header() {
  return (
    <header className="relative overflow-hidden rounded-b-[2rem] bg-blush px-5 pb-7 pt-5 text-center shadow-md">
      <span className="absolute left-4 top-6 rounded-full border border-rose bg-offwhite px-3 py-0.5 font-display italic text-rose">
        by Eiqa
      </span>
      <Lily className="pointer-events-none absolute -right-2 -top-1 h-28 w-28 sm:h-32 sm:w-32" />
      <Sprig className="pointer-events-none absolute -bottom-1 left-1 h-10 w-24 opacity-90" />
      <h1 className="mt-7 font-display text-[2rem] font-bold leading-[0.95] tracking-wide text-brown sm:text-4xl">
        DAILY TASK
        <br />
        TRACKER
      </h1>
      <p className="font-display text-lg italic text-brown">keep on track</p>
    </header>
  );
}
