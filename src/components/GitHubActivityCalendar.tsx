import GitHubCalendar from "react-github-calendar";
import { auth } from "../Config/firebaseConfigs";

export default function GitHubActivityCalendar() {
  const username = auth.currentUser?.providerData[0]?.uid;

  if (!username) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow border dark:border-gray-700">
      <h3 className="text-lg font-bold mb-2">📅 Contributions GitHub</h3>
      <GitHubCalendar username={username} />
    </div>
  );
}
