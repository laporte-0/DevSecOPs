import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  GitBranch,
  LineChart,
  Settings,
  MessageSquareMore,
  Users,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/app" },
  { icon: GitBranch, label: "Pipelines", path: "/app/pipelines" },
  { icon: LineChart, label: "Insights", path: "/app/insights" },
  { icon: Users, label: "Organizations", path: "/app/organizations" },
  { icon: Settings, label: "Settings", path: "/app/settings" },
  { icon: MessageSquareMore, label: "Chatbot", path: "/app/chatbot" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="h-full w-64 bg-gray-900 text-white dark:bg-gray-950 dark:text-gray-100 p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold px-4">DevPortal</h1>
      </div>
      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 text-sm rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Icon className="h-5 w-5 mr-3" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
