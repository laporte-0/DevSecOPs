import { auth } from "../Config/firebaseConfigs";
import useGithubInfos from "../hooks/useGithubInfos";

export default function GitHubSummary() {
  const username = auth.currentUser?.providerData[0]?.uid;
  const { followers, languages } = useGithubInfos(username);

  if (!username) return null;

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
