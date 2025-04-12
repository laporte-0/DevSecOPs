import { auth } from "../Config/firebaseConfigs";
import { Github } from "lucide-react";

export default function GitHubCard() {
  const user = auth.currentUser;
  const provider = user?.providerData.find(
    (p) => p.providerId === "github.com"
  );
  const githubUsername = provider?.uid;

  if (!user || !githubUsername) return null;

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow w-full max-w-md">
      <div className="flex items-center space-x-4">
        <img
          src={user.photoURL || ""}
          alt="avatar"
          className="h-16 w-16 rounded-full object-cover border dark:border-gray-600"
        />
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {user.displayName || "GitHub User"}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {user.email}
          </p>
          <a
            href={`https://github.com/${githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 text-sm hover:underline flex items-center mt-1"
          >
            <Github className="w-4 h-4 mr-1" /> github.com/{githubUsername}
          </a>
        </div>
      </div>
    </div>
  );
}
