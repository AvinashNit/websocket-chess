import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Features", path: "#features" },
  { name: "How It Works", path: "#how-it-works" },
  { name: "Leaderboard", path: "#leaderboard" },
  { name: "About", path: "#about" },
];

export function LandingNavbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <button
            onClick={() => navigate("/")}
            className="text-2xl font-bold text-white cursor-pointer"
          >
            ♟ Chess
          </button>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) =>
              item.path.startsWith("#") ? (
                <a
                  key={item.name}
                  href={item.path}
                  className="text-gray-300 transition hover:text-white"
                >
                  {item.name}
                </a>
              ) : (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className="text-gray-300 transition hover:text-white"
                >
                  {item.name}
                </NavLink>
              )
            )}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={() => navigate("/login")}
              className="cursor-pointer rounded-lg border border-slate-700 px-5 py-2 text-white transition hover:bg-slate-800"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/signup")}
              className="cursor-pointer rounded-lg bg-emerald-500 px-5 py-2 font-semibold text-white transition hover:bg-emerald-600"
            >
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="rounded-lg p-2 text-white md:hidden"
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-72 bg-slate-950 transition-transform duration-300 md:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-800 p-5">
          <h2 className="text-xl font-bold text-white">♟ Chess</h2>

          <button
            onClick={() => setOpen(false)}
            className="text-white"
          >
            <X />
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-2 px-4">
          {navItems.map((item) =>
            item.path.startsWith("#") ? (
              <a
                key={item.name}
                href={item.path}
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-gray-300 transition hover:bg-slate-800 hover:text-white"
              >
                {item.name}
              </a>
            ) : (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-gray-300 transition hover:bg-slate-800 hover:text-white"
              >
                {item.name}
              </NavLink>
            )
          )}

          <div className="mt-8 border-t border-slate-800 pt-6 space-y-3">
            <button
              onClick={() => {
                navigate("/login");
                setOpen(false);
              }}
              className="w-full rounded-lg border border-slate-700 py-3 text-white transition hover:bg-slate-800"
            >
              Login
            </button>

            <button
              onClick={() => {
                navigate("/signup");
                setOpen(false);
              }}
              className="w-full rounded-lg bg-emerald-500 py-3 font-semibold text-white transition hover:bg-emerald-600"
            >
              Sign Up
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}