import { useEffect, useState } from "react";
import { auth } from "../Config/firebaseConfigs";

interface Repo {
  id: string;
  name: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

export default function RepoList() {
  const githubUsername = auth.currentUser?.providerData[0]?.uid;
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const userDataString = localStorage.getItem("userData");
      if (!userDataString) {
        setLoading(false);
        return;
      }

      const userData = JSON.parse(userDataString);
      setRepos(userData.repos || []);
    } catch (error) {
      console.error("Error reading repos from localStorage:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  if (!githubUsername) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow border dark:border-gray-700">
      <h3 className="text-lg font-bold mb-3">
        📦 Dépôts GitHub 
      </h3>
      {loading ? (
        <p className="text-sm text-gray-500">Chargement des dépôts...</p>
      ) : repos.length === 0 ? (
        <p className="text-sm text-gray-500">Aucun dépôt trouvé.</p>
      ) : (
        <ul className="space-y-2 text-sm">
          {repos.slice(0, 5).map((repo) => (
            <li key={repo.id || repo.name} className="border-b pb-2 last:border-none">
              <a
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
              >
                {repo.name}
              </a>
              <p className="text-gray-500 dark:text-gray-400 text-xs">
                ★ {repo.stargazers_count} – Forks: {repo.forks_count} – Dernière
                maj: {new Date(repo.updated_at).toLocaleDateString("fr-FR")}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
