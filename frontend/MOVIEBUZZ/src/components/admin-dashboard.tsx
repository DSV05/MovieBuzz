import { AdminSidebar } from "./admin-sidebar";
import { StatsCards } from "./stats-cards";
import { UsersTable } from "./users-table";
import { MoviesTable } from "./movies-table";
import { AdminNavbar } from "./admin-navbar";
import { useState } from "react";

interface AdminDashboardProps {
  onLogout?: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeView, setActiveView] = useState<"dashboard" | "users" | "movies" | "analytics" | "settings">("dashboard");

  return (
    <div className="min-h-screen bg-zinc-50">
      <AdminNavbar onLogout={onLogout} />
      <div className="flex">
        <AdminSidebar activeView={activeView} onViewChange={setActiveView} />
        
        <main className="flex-1 p-8 ml-64">
          {activeView === "dashboard" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl">Dashboard Overview</h1>
                <p className="text-zinc-600 mt-1">Monitor your platform's performance and activity</p>
              </div>
              
              <StatsCards />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-xl mb-4">Recent Users</h2>
                  <UsersTable limit={5} />
                </div>
                <div>
                  <h2 className="text-xl mb-4">Recent Movies</h2>
                  <MoviesTable limit={5} />
                </div>
              </div>
            </div>
          )}

          {activeView === "users" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl">Manage Users</h1>
                <p className="text-zinc-600 mt-1">View and manage all registered users</p>
              </div>
              <UsersTable />
            </div>
          )}

          {activeView === "movies" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl">Manage Movies</h1>
                <p className="text-zinc-600 mt-1">Add, edit, or remove movies from the platform</p>
              </div>
              <MoviesTable />
            </div>
          )}

          {activeView === "analytics" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl">Analytics</h1>
                <p className="text-zinc-600 mt-1">Detailed insights and metrics</p>
              </div>
              <StatsCards />
              <div className="bg-white p-8 rounded-lg border border-zinc-200 text-center">
                <p className="text-zinc-500">Advanced analytics charts coming soon...</p>
              </div>
            </div>
          )}

          {activeView === "settings" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl">Settings</h1>
                <p className="text-zinc-600 mt-1">Configure platform settings</p>
              </div>
              <div className="bg-white p-8 rounded-lg border border-zinc-200">
                <p className="text-zinc-500">Settings panel coming soon...</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
