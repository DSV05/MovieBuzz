import { Film, LayoutDashboard, Users, Clapperboard, BarChart3, Settings } from "lucide-react";
import { cn } from "../lib/utils";

interface AdminSidebarProps {
  activeView: string;
  onViewChange: (view: "dashboard" | "users" | "movies" | "analytics" | "settings") => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "users", label: "Manage Users", icon: Users },
  { id: "movies", label: "Manage Movies", icon: Clapperboard },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
];

export function AdminSidebar({ activeView, onViewChange }: AdminSidebarProps) {
  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-zinc-200">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="p-2 bg-red-600 rounded-lg">
            <Film className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl tracking-tight">MOVIEBUZZ</span>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id as any)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  isActive
                    ? "bg-red-50 text-red-600"
                    : "text-zinc-700 hover:bg-zinc-100"
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
