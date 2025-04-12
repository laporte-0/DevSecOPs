import GitHubCard from "./GitHubCard";
import RepoList from "./RepoList";
import GitHubActivityCalendar from "./GitHubActivityCalendar";
import GitHubSummary from "./GitHubSummary";
import GitHubLanguagesDonut from "./GitHubLanguagesDonut";
import RecentCommits from "./RecentCommits";

export default function GitHubSidebar() {
  return (
    <div className="w-full lg:w-80 space-y-4">
      <GitHubCard />
      <GitHubSummary />
      <GitHubLanguagesDonut />
      <RepoList />
      <GitHubActivityCalendar />
      <RecentCommits />
    </div>
  );
}
