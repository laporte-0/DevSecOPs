import { Menu, Transition } from "@headlessui/react";
import { Bell } from "lucide-react";
import { Fragment, useState } from "react";

const mockNotifications = [
  { id: 1, message: "Nouvelle vulnérabilité détectée", read: false },
  { id: 2, message: "Pipeline #24 terminé avec succès", read: false },
  { id: 3, message: "Un membre a rejoint votre organisation", read: true },
];

export default function NotificationMenu() {
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  };

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none">
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
        )}
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-in"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-md border z-50">
          <div className="px-4 py-2 border-b font-semibold text-sm text-gray-700 flex justify-between items-center">
            Notifications
            <button
              onClick={markAllAsRead}
              className="text-xs text-blue-600 hover:underline"
            >
              Marquer tout comme lu
            </button>
          </div>
          <div className="max-h-60 overflow-y-auto">
            {notifications.map((notif) => (
              <Menu.Item key={notif.id}>
                <div
                  className={`px-4 py-2 text-sm ${
                    notif.read ? "text-gray-400" : "text-gray-800 font-medium"
                  }`}
                >
                  {notif.message}
                </div>
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
