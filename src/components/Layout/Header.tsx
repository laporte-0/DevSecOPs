import { useEffect, useState } from "react";
import { Home, Search, ChevronRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import NotificationMenu from "./NotificationMenu";
import DarkModeToggle from "../DarkModeToggle";
import UserMenu from "../Auth/UserMenu";
import { mockProjects } from "../../services/mockProjects";

export default function Header() {
  const [selectedProjectId, setSelectedProjectId] = useState("projectA");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProjects, setFilteredProjects] = useState(mockProjects);
  const navigate = useNavigate();
  const location = useLocation();

  const selectedProject = mockProjects.find((p) => p.id === selectedProjectId);

  // 🔎 Mise à jour de la liste filtrée
  useEffect(() => {
    const results = mockProjects.filter((project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProjects(results);
  }, [searchTerm]);

  // 🔁 Navigation automatique sur changement de projet
  useEffect(() => {
    if (
      location.pathname.includes("dashboard") ||
      location.pathname === "/app"
    ) {
      navigate("/app");
    }
  }, [selectedProjectId]);

  return (
    <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b dark:border-gray-700 px-6 py-4 shadow-sm sticky top-0 z-50">
      {/* Ligne 1 : Logo - Fil d’ariane - Actions */}
      <div className="flex flex-col lg:flex-row items-center justify-between mb-4 gap-4">
        {/* Logo agrandi */}
        <div className="flex items-center gap-3">
          <img
            src="/assets/DevPortalLogo.png"
            alt="DevPortal"
            className="h-14 w-auto animate-pulse drop-shadow-lg"
          />
        </div>

        {/* Fil d’ariane dynamique */}
        <div className="flex-1 flex justify-center">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-300 gap-2 transition-all duration-300">
            <Home className="h-4 w-4" />
            <ChevronRight className="h-4 w-4" />
            <span>Dashboard</span>
            <ChevronRight className="h-4 w-4" />
            <span className="font-medium text-gray-700 dark:text-white">
              {selectedProject?.name}
            </span>
          </div>
        </div>

        {/* Actions à droite */}
        <div className="flex items-center space-x-4">
          <NotificationMenu />
          <DarkModeToggle />
          <UserMenu />
        </div>
      </div>

      {/* Ligne 2 : Sélection + recherche */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Sélecteur de projet */}
        <select
          value={selectedProjectId}
          onChange={(e) => setSelectedProjectId(e.target.value)}
          className="px-4 py-2 border text-sm rounded-md bg-white dark:bg-gray-900 dark:border-gray-700 dark:text-white hover:border-blue-500 transition"
        >
          {mockProjects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        {/* Barre de recherche dynamique */}
        <div className="relative w-full max-w-md ml-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher un projet..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {searchTerm && (
            <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow mt-1 z-20 max-h-60 overflow-auto">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => {
                      setSelectedProjectId(project.id);
                      setSearchTerm("");
                    }}
                    className="px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    {project.name}
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-sm text-gray-500">
                  Aucun résultat
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
