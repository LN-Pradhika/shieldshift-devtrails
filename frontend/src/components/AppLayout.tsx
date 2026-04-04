import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Shield, 
  FileText, 
  Settings, 
  Menu, 
  X,
  ShieldCheck
} from "lucide-react";

const navItems = [
  { title: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { title: "Policies", path: "/policies", icon: Shield },
  { title: "Claims", path: "/claims", icon: FileText },
  { title: "Settings", path: "/settings", icon: Settings },
];

const bottomNavItems = navItems.slice(0, 4);

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 gradient-primary fixed inset-y-0 left-0 z-30">
        <div className="flex items-center gap-3 px-6 py-6 border-b border-sidebar-border">
          <ShieldCheck className="h-8 w-8 text-secondary" />
          <span className="text-xl font-bold text-sidebar-foreground tracking-tight">ShieldShift</span>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-sidebar-accent text-sidebar-foreground"
                    : "text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-foreground"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.title}
              </Link>
            );
          })}
        </nav>
        <div className="px-6 py-4 border-t border-sidebar-border">
          <p className="text-xs text-sidebar-muted">© 2026 ShieldShift</p>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}>
          <div className="absolute inset-0 bg-foreground/50" />
          <aside
            className="absolute left-0 top-0 bottom-0 w-64 gradient-primary animate-slide-in-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-6 border-b border-sidebar-border">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-8 w-8 text-secondary" />
                <span className="text-xl font-bold text-sidebar-foreground">ShieldShift</span>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="text-sidebar-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="px-3 py-4 space-y-1">
              {navItems.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      active
                        ? "bg-sidebar-accent text-sidebar-foreground"
                        : "text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-foreground"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.title}
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen pb-16 lg:pb-0">
        {/* Mobile header */}
        <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-card card-shadow sticky top-0 z-20">
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg hover:bg-muted transition-colors">
            <Menu className="h-5 w-5 text-foreground" />
          </button>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-secondary" />
            <span className="font-bold text-foreground">ShieldShift</span>
          </div>
          <div className="w-9" />
        </header>

        <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      </div>

      {/* Mobile bottom navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-20">
        <div className="flex justify-around py-2">
          {bottomNavItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg transition-colors ${
                  active ? "text-secondary" : "text-muted-foreground"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-[10px] font-medium">{item.title.split(" ")[0]}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
