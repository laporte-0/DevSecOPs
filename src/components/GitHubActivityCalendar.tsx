import GitHubCalendar from "react-github-calendar";


export default function GitHubActivityCalendar() {
  const githubUserDataString = localStorage.getItem("userData");
  
  let githubUsername = "";
  
  if (githubUserDataString) {
    const userData = JSON.parse(githubUserDataString);
    githubUsername = userData?.github?.userName || "";
    console.log(githubUsername)
  }

  if (!githubUsername) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow border dark:border-gray-700">
      <h3 className="text-lg font-bold mb-2">📅 Contributions GitHub</h3>
      <GitHubCalendar username={githubUsername} />
    </div>
  );
}
