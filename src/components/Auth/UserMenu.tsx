import { Menu, Transition } from "@headlessui/react";
import { ChevronDown, LogOut, Settings } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../../Config/firebaseConfigs";
import { useNavigate } from "react-router-dom";

export default function UserMenu() {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="relative inline-block text-left">
      <Menu>
        <Menu.Button className="inline-flex items-center gap-2 px-4 py-2 bg-white border rounded-md shadow-sm hover:bg-gray-50">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt="avatar"
              className="h-8 w-8 rounded-full object-cover"
            />
          ) : (
            <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold">
              {user?.displayName?.[0] || "?"}
            </div>
          )}
          <span className="text-sm font-medium text-gray-700">
            {user?.displayName || "Utilisateur"}
          </span>
          <ChevronDown className="w-4 h-4 text-gray-600" />
        </Menu.Button>

        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-in"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white border rounded-md shadow-lg focus:outline-none z-50">
            <div className="py-1 text-sm text-gray-700">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => navigate("/settings")}
                    className={`${
                      active ? "bg-gray-100" : ""
                    } flex items-center w-full px-4 py-2`}
                  >
                    <Settings className="w-4 h-4 mr-2" /> Paramètres
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleLogout}
                    className={`${
                      active ? "bg-gray-100" : ""
                    } flex items-center w-full px-4 py-2 text-red-600`}
                  >
                    <LogOut className="w-4 h-4 mr-2" /> Déconnexion
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
