import { auth } from "../Config/firebaseConfigs";
import useGithubInfos from "../hooks/useGithubInfos";
import { useState, useEffect } from "react";

export default function GitHubSummary() {
  const username = auth.currentUser?.providerData[0]?.uid;
  const { followers, languages } = useGithubInfos();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (followers !== undefined && languages !== undefined) {
      setLoading(false);
    }
  }, [followers, languages]);

  if (!username) return null;

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow border dark:border-gray-700">
        <h3 className="text-lg font-bold mb-2 bg-gray-300 animate-pulse h-6 w-1/2"></h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 bg-gray-300 animate-pulse h-6 w-3/4"></p>
        <p className="text-sm text-gray-700 dark:text-gray-300 bg-gray-300 animate-pulse h-6 w-1/2"></p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow border dark:border-gray-700">
      <h3 className="text-lg font-bold mb-2">🔍 Profil GitHub</h3>
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
        👥 <strong>{followers}</strong> followers
      </p>
      <p className="text-sm text-gray-700 dark:text-gray-300">
        🧠 Langages :{" "}
        {languages.length > 0 ? languages.join(", ") : "Aucun détecté"}
      </p>
    </div>
  );
}
