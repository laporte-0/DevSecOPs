import { useEffect, useState } from "react";
import { Github } from "lucide-react";


interface GitHubInfo {
  userName: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  avatar_url: string;
  createdAt: string;
}

export default function GitHubCard() {
  const [githubInfo, setGithubInfo] = useState<GitHubInfo | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    // Fetch and store the user data first
    const fetchAndStore = async () => {

      try {
        const userDataString = localStorage.getItem("userData");
        if (!userDataString) return;

        const userData = JSON.parse(userDataString);

        // Set state using fresh localStorage data
        setGithubInfo(userData.github);
        setEmail(userData.email);
      } catch (e) {
        console.error("Error parsing user data from localStorage", e);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchAndStore();
  }, []);

  if (loading) {
    // Skeleton loader state
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow border dark:border-gray-700 flex flex-col items-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-gray-300 animate-pulse"></div>
        <div className="w-full h-6 bg-gray-300 animate-pulse rounded-md"></div>
        <div className="w-3/4 h-6 bg-gray-300 animate-pulse rounded-md"></div>
        <div className="w-1/2 h-6 bg-gray-300 animate-pulse rounded-md"></div>
      </div>
    );
  }

  if (!githubInfo) return null;

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow w-full max-w-md">
      <div className="flex items-center space-x-4">
        <img
          src={githubInfo.avatar_url}
          alt="avatar"
          className="h-16 w-16 rounded-full object-cover border dark:border-gray-600"
        />
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {githubInfo.userName}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">{email}</p>
          <a
            href={githubInfo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 text-sm hover:underline flex items-center mt-1"
          >
            <Github className="w-4 h-4 mr-1" /> github.com/{githubInfo.userName}
          </a>
        </div>
      </div>
    </div>
  );
}
