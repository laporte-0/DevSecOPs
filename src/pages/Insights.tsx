import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  mockProjects,
  mockInsights,
  ProjectKey,
} from "../services/mockProjects";
import { Project } from "./types";

interface ScoreEntry {
  date: string;
  score: number;
}

export default function Insights() {
  const [selectedProjectId, setSelectedProjectId] =
    useState<ProjectKey>("projectA");
  const [, setProjectData] = useState<Project>(mockProjects[0]);
  const [scoreData, setScoreData] = useState<ScoreEntry[]>(
    mockInsights["projectA"]
  );

  useEffect(() => {
    const selected = mockProjects.find((p) => p.id === selectedProjectId);
    if (selected) {
      setProjectData(selected);
      setScoreData(mockInsights[selectedProjectId]);
    }
  }, [selectedProjectId]);

  const timeRanges = [
    { value: "7", label: "Last 7 Days" },
    { value: "30", label: "Last 30 Days" },
    { value: "90", label: "Last 90 Days" },
  ];

  const [timeRange, setTimeRange] = useState("7");

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Insights</h1>
        <select
          value={selectedProjectId}
          onChange={(e) => setSelectedProjectId(e.target.value as ProjectKey)}
          className="border px-3 py-1 rounded-lg"
        >
          {mockProjects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      {/* Time filter */}
      <div className="flex space-x-2">
        {timeRanges.map((range) => (
          <button
            key={range.value}
            onClick={() => setTimeRange(range.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              timeRange === range.value
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            {range.label}
          </button>
        ))}
      </div>

      {/* Graph */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-lg font-medium text-gray-900 mb-6">
          Security Score Trend
        </h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={scoreData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <YAxis domain={[0, 100]} />
              <Tooltip
                formatter={(value) => [`${value}%`, "Security Score"]}
                labelFormatter={(label) => new Date(label).toLocaleDateString()}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#2563eb"
                strokeWidth={2}
                dot={{ fill: "#2563eb", strokeWidth: 2 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Average Score
          </h3>
          <p className="text-2xl font-semibold text-gray-900">
            {Math.round(
              scoreData.reduce((acc, cur) => acc + cur.score, 0) /
                scoreData.length
            )}
            %
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Highest Score
          </h3>
          <p className="text-2xl font-semibold text-green-600">
            {Math.max(...scoreData.map((item) => item.score))}%
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Lowest Score
          </h3>
          <p className="text-2xl font-semibold text-red-600">
            {Math.min(...scoreData.map((item) => item.score))}%
          </p>
        </div>
      </div>
    </div>
  );
}
