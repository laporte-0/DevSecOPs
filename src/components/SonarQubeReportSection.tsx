// src/components/SonarQubeReportSection.tsx
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const mockSonarData = [
  { metric: "Bugs", count: 12 },
  { metric: "Vulnerabilities", count: 7 },
  { metric: "Code Smells", count: 45 },
  { metric: "Security Hotspots", count: 3 },
  { metric: "Duplications", count: 10 },
];

export default function SonarQubeReportSection() {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border dark:border-gray-700">
      <h2 className="text-2xl font-semibold mb-4">📊 Rapport SonarQube</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={mockSonarData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="metric" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
