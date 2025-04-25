import { useEffect, useState } from "react";

export interface Repo {
  id: number;
  name: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

export default function useGithubRepos(username: string | undefined) {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem("githubAccessToken");

    if (!username || !token) {
      setLoading(false);
      return;
    }

    const fetchRepos = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://api.github.com/users/${username}/repos`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Échec récupération des dépôts GitHub.");
        }

        const data = await res.json();
        if (Array.isArray(data)) {
          setRepos(data);
        } else {
          setRepos([]);
        }
      } catch (err: any) {
        console.error("Erreur récupération dépôts GitHub :", err.message);
        setError("Impossible de charger les dépôts GitHub.");
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [username]);

  return { repos, loading, error };
}
