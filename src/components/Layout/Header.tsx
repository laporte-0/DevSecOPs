import { Search } from "lucide-react";
import UserMenu from "../Auth/UserMenu";
import NotificationMenu from "./NotificationMenu";
import DarkModeToggle from "../DarkModeToggle"; // 👈 ajout du toggle

export default function Header() {
  return (
    <header className="h-16 bg-white dark:bg-gray-800 border-b dark:border-gray-700 flex items-center justify-between px-6">
      <div className="flex items-center flex-1">
        <div className="max-w-md w-full relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <NotificationMenu />
        <DarkModeToggle /> {/* 👈 nouveau switch */}
        <UserMenu />
      </div>
    </header>
  );
}
