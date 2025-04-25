import { useEffect, useState } from "react";

interface Commit {
  repo: string;
  message: string;
  url: string;
  author: string;
  date: string;
}

export default function RecentCommits() {
  const username = sessionStorage.getItem("githubUsername");
  const token = sessionStorage.getItem("githubAccessToken");
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username || !token) return;

    const fetchCommitsFromStorage = () => {
      setLoading(true);
      setError(null);

      try {

        // Get user data from localStorage
        const userDataString = localStorage.getItem("userData");
        if (!userDataString) return;

        const userData = JSON.parse(userDataString);

        // Assuming the commits are stored under `userData.user.github.commits`
        const commitsData: Commit[] = userData?.recentCommits || [];

        // Sort commits by date and take the most recent 5
        const sortedCommits = commitsData
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 5);

        setCommits(sortedCommits);
      } catch (e) {
        console.error("Erreur lors de la lecture des commits :", e);
        
      } finally {
        setLoading(false);
      }
    };


    fetchCommitsFromStorage();
  }, [username]);


  if (!username || !token) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow border dark:border-gray-700">
      <h3 className="text-lg font-bold mb-2">📝 Commits récents</h3>
      {loading ? (
        <p className="text-sm text-gray-500">Chargement des commits...</p>
      ) : error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : commits.length === 0 ? (
        <p className="text-sm text-gray-500">Aucun commit trouvé.</p>
      ) : (
        <ul className="space-y-2 text-sm">
          {commits.map((commit, idx) => (
            <li key={idx} className="border-b pb-2 last:border-none">
              <a
                href={commit.url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
              >
                {commit.message}
              </a>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {commit.repo} – par {commit.author} •{" "}
                {new Date(commit.date).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
