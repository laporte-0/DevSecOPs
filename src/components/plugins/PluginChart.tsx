import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const mockPluginHistory = [
  { date: "2025-04-01", score: 72 },
  { date: "2025-04-02", score: 76 },
  { date: "2025-04-03", score: 82 },
  { date: "2025-04-04", score: 79 },
  { date: "2025-04-05", score: 85 },
];

export default function PluginChart({}: { pluginName: string }) {
  // Dans un cas réel, on utiliserait pluginName pour filtrer les données
  const data = mockPluginHistory;

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700 shadow">
      <h3 className="text-lg font-bold mb-4">📈 Évolution du score sécurité</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
          <XAxis dataKey="date" stroke="#ccc" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#4F46E5"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
