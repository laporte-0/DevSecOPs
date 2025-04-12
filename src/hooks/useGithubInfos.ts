import { useEffect, useState } from "react";

export default function useGithubInfos(username: string | undefined) {
  const [followers, setFollowers] = useState<number>(0);
  const [languages, setLanguages] = useState<string[]>([]);

  useEffect(() => {
    if (!username) return;

    const fetchData = async () => {
      try {
        const userRes = await fetch(`https://api.github.com/users/${username}`, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
          },
        });
        const userData = await userRes.json();
        setFollowers(userData.followers);

        const repoRes = await fetch(`https://api.github.com/users/${username}/repos`, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
          },
        });
        const repos = await repoRes.json();
        const langs = new Set<string>();
        repos.forEach((r: any) => r.language && langs.add(r.language));
        setLanguages(Array.from(langs));
      } catch (err) {
        console.error("GitHub info error", err);
      }
    };

    fetchData();
  }, [username]);

  return { followers, languages };
}
