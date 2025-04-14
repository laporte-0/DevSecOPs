import { useEffect, useState } from "react";

export default function useGithubInfos() {
  const [followers, setFollowers] = useState<number>(0);
  const [languages, setLanguages] = useState<string[]>([]);

  useEffect(() => {
    const userDataString = localStorage.getItem("userData");
    if (!userDataString) return;

    try {
      const userData = JSON.parse(userDataString);
      setFollowers(userData.github?.followers ?? 0);

      const langsSet = new Set<string>();
      userData.repos?.forEach((repo: any) => {
        if (repo.language) langsSet.add(repo.language);
      });

      setLanguages(Array.from(langsSet));
    } catch (err) {
      console.error("Failed to parse user data from localStorage", err);
    }
  }, []);

  return { followers, languages };
}
