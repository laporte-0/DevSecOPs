import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { auth } from "../Config/firebaseConfigs";

const COLORS = [
  "#4F46E5",
  "#16A34A",
  "#F59E0B",
  "#DB2777",
  "#0EA5E9",
  "#9333EA",
];

export default function StarChart() {
  const username = auth.currentUser?.providerData[0]?.uid;
  const [data, setData] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    if (!username) return;

    const fetchData = async () => {
      const res = await fetch(
        `https://api.github.com/users/${username}/repos`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
          },
        }
      );
      const repos = await res.json();
      const starData = repos
        .filter((r: any) => r.stargazers_count > 0)
        .map((r: any) => ({
          name: r.name,
          value: r.stargazers_count,
        }));
      setData(starData);
    };

    fetchData();
  }, [username]);

  if (!data.length) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow border dark:border-gray-700">
      <h3 className="text-lg font-bold mb-2">
        🌟 Répartition des étoiles par dépôt
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={90}
            label={({ name }) => name}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
