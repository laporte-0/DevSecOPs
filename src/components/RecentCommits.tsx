import { useEffect, useState } from "react";
import { auth } from "../Config/firebaseConfigs";

interface Commit {
  repo: string;
  message: string;
  url: string;
  author: string;
  date: string;
}

export default function RecentCommits() {
  const username = auth.currentUser?.providerData[0]?.uid;
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) return;

    const fetchCommits = async () => {
      setLoading(true);
      try {
        const repoRes = await fetch(
          `https://api.github.com/users/${username}/repos`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
            },
          }
        );
        const repos = await repoRes.json();

        const commitPromises = repos.map(async (repo: any) => {
          const res = await fetch(
            `https://api.github.com/repos/${username}/${repo.name}/commits`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
              },
            }
          );
          const commits = await res.json();
          return commits.slice(0, 1).map((c: any) => ({
            repo: repo.name,
            message: c.commit.message,
            url: c.html_url,
            author: c.commit.author.name,
            date: c.commit.author.date,
          }));
        });

        const all = await Promise.all(commitPromises);
        const flat = all
          .flat()
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          );
        setCommits(flat.slice(0, 5));
      } catch (e) {
        console.error("Erreur commits :", e);
      } finally {
        setLoading(false);
      }
    };

    fetchCommits();
  }, [username]);

  if (!username) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow border dark:border-gray-700">
      <h3 className="text-lg font-bold mb-2">📝 Commits récents</h3>
      {loading ? (
        <p className="text-sm text-gray-500">Chargement des commits...</p>
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
