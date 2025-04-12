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

  useEffect(() => {
    if (!username) return;

    const fetchRepos = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://api.github.com/users/${username}/repos`, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
          },
        });
        const data = await res.json();
        if (Array.isArray(data)) setRepos(data);
      } catch (err) {
        console.error("Erreur récupération dépôts GitHub :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [username]);

  return { repos, loading };
}
