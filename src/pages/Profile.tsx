import { useEffect, useState } from "react";
import { auth } from "../Config/firebaseConfigs";
import GitHubCard from "../components/GitHubCard";
import GitHubSummary from "../components/GitHubSummary";
import GitHubLanguagesDonut from "../components/GitHubLanguagesDonut";
import GitHubActivityCalendar from "../components/GitHubActivityCalendar";
import RecentCommits from "../components/RecentCommits";
import StarChart from "../components/StarChart";

export default function Profile() {
  const user = auth.currentUser;
  const [created, setCreated] = useState("");

  useEffect(() => {
    if (user?.metadata?.creationTime) {
      const date = new Date(user.metadata.creationTime);
      setCreated(
        date.toLocaleDateString("fr-FR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
    }
  }, [user]);

  if (!user) return <div className="p-6">Utilisateur non connecté.</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow space-y-10">
      {/* Bannière utilisateur */}
      <div className="relative h-32 w-full rounded-lg bg-gradient-to-r from-gray-700 to-blue-600 shadow-inner">
        <img
          src={user.photoURL || ""}
          alt="avatar"
          className="absolute bottom-[-2rem] left-6 w-24 h-24 rounded-full border-4 border-white dark:border-gray-900 object-cover shadow"
        />
      </div>

      {/* Infos personnelles */}
      <div className="pt-12 px-2 space-y-2">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {user.displayName || "Inconnu"}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">📧 {user.email}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          UID Firebase : {user.uid}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Créé le : {created}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Provider : {user.providerData[0]?.providerId}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Dernière connexion :{" "}
          {new Date(user.metadata.lastSignInTime || "").toLocaleString("fr-FR")}
        </p>
      </div>

      {/* GitHubCard rapide */}
      <GitHubCard />

      {/* Section GitHub Insights */}
      <section className="pt-8 border-t mt-6">
        <h2 className="text-xl font-semibold mb-4">📊 GitHub Insights</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GitHubSummary />
          <GitHubLanguagesDonut />
          <StarChart />
          <GitHubActivityCalendar />
          <RecentCommits />
        </div>
      </section>
    </div>
  );
}
