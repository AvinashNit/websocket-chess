import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X ,LogOut} from "lucide-react";
import { useAuthStore } from "@/store/auth.store";

const navItems = [
  { name: "Dashboard", path: "/home" },
  { name: "Players", path: "/home/players" },
  { name: "Leaderboard", path: "/home/leaderboard" },
];

export  function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate  =  useNavigate();
  const user = useAuthStore( state =>  state.user )
  const isAuthenticated = true;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <NavLink
            to="/home"
            className="text-2xl font-bold text-white"
          >
            ♟ Chess
          </NavLink>

          {/* Desktop */}
          <div className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/home"}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-2 transition ${
                    isActive
                      ? "bg-emerald-500 text-white"
                      : "text-gray-300 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

         {/* Desktop Auth Buttons */}
        <div className="hidden items-center gap-3 md:flex">
            {isAuthenticated && (
            <button
        
                    className="flex cursor-pointer items-center gap-2 rounded-lg bg-red-500 px-4 py-2 font-semibold text-white transition hover:bg-red-600"
            >
            <LogOut size={18} />
                Logout
            </button>
            )}
        </div>

          {/* Mobile */}
          <button
            onClick={() => setOpen( (state) => !state)}
            className="rounded-lg p-2 text-white md:hidden cursor-pointer"
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity md:hidden ${
          open
            ? "opacity-100 visible"
            : "opacity-0 invisible "
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-72 bg-slate-950 transition-transform duration-300 md:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-800 p-5">
          <h2 className="text-xl font-bold text-white">
            ♟ Chess
          </h2>

          <button onClick={() => setOpen(false)} className="cursor-pointer">
            <X className="text-white" />
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-2 px-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              end={item.path === "/home"}
              className={({ isActive }) =>
                `rounded-lg px-4 py-3 transition ${
                  isActive
                    ? "bg-emerald-500 text-white"
                    : "text-gray-300 hover:bg-slate-800"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          <div className="mt-8 border-t border-slate-800 pt-6">
          {isAuthenticated && (
                <button
                    onClick={() => {
                        
                        setOpen(false);
                            }}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-500 py-3 font-semibold text-white transition hover:bg-red-600"
                >
            <LogOut size={18} />
                Logout
                </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}