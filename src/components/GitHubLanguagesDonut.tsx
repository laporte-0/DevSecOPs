import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { auth } from "../Config/firebaseConfigs";

const COLORS = [
  "#4F46E5",
  "#16A34A",
  "#F59E0B",
  "#DB2777",
  "#0EA5E9",
  "#9333EA",
];

export default function GitHubLanguagesDonut() {
  const username = auth.currentUser?.providerData[0]?.uid;
  const [data, setData] = useState<{ name: string; value: number }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem("githubAccessToken");
    if (!username || !token) return;


    const fetchLangsFromStorage = () => {
      const userDataString = localStorage.getItem("userData");
      if (!userDataString) return;

      try {
        const userData = JSON.parse(userDataString);

        // Assuming userData.user.github.repos contains the repository information
        const repos = userData?.repos || [];
        const langCount: Record<string, number> = {};

        for (const repo of repos) {
          if (repo.language) {
            langCount[repo.language] = (langCount[repo.language] || 0) + 1;
          }
        }

        const pieData = Object.entries(langCount).map(([name, value]) => ({
          name,
          value,
        }));
        
        setData(pieData);
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    };

    fetchLangsFromStorage();
  }, [username]);

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow border dark:border-gray-700">
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );
  }

  if (!data.length) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow border dark:border-gray-700">
      <h3 className="text-lg font-bold mb-2">🧁 Langages les plus utilisés</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={80}>
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
