import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Briefcase, 
  CheckSquare, 
  BarChart3, 
  Trophy, 
  Settings, 
  Zap,
  Target,
  Users
} from "lucide-react";
import { cn } from "../../lib/utils";
import { useAuth } from "../../hooks/useAuth";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Briefcase, label: "Projects", path: "/projects" },
  { icon: CheckSquare, label: "My Tasks", path: "/tasks" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
  { icon: Trophy, label: "Gamification", path: "/gamification" },
  { icon: Users, label: "Team", path: "/team" },
];

export const Sidebar = () => {
  const { profile } = useAuth();

  return (
    <aside className="w-64 bg-zinc-950 border-r border-zinc-900 flex flex-col h-screen fixed left-0 top-0 z-50">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-zinc-100 rounded flex items-center justify-center">
          <Zap className="w-5 h-5 text-zinc-950" />
        </div>
        <span className="text-xl font-bold tracking-tight text-zinc-100">
          SyncSphere
        </span>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-0.5">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-4 py-2.5 rounded-md transition-all group",
              isActive 
                ? "bg-zinc-800 text-zinc-100 ring-1 ring-white/5" 
                : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50"
            )}
          >
            <item.icon className={cn("w-4 h-4 transition-colors", "group-hover:text-zinc-300")} />
            <span className="text-sm font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-zinc-900">
        <div className="bg-zinc-900/30 rounded-lg p-4 border border-zinc-900">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">Health</span>
            <span className="text-[10px] font-medium text-zinc-300">92%</span>
          </div>
          <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-zinc-400 w-[92%]" />
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-zinc-900">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 text-xs font-bold">
            {profile?.displayName?.charAt(0) || "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-zinc-200 truncate">{profile?.displayName}</p>
            <p className="text-[10px] text-zinc-500 uppercase tracking-tight">{profile?.role}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
