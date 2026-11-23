import { Outlet } from "react-router-dom";
import Header from "./Header";
import Navigation from "./Navigation";

/** Shared shell: branding header, page content, bottom navigation. */
export default function Layout() {
  return (
    <div
      className="mx-auto flex min-h-screen max-w-xl flex-col bg-olive"
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      <Header />
      <main className="flex-1 px-4 pb-32 pt-4">
        <Outlet />
      </main>
      <Navigation />
    </div>
  );
}
