// src/components/PluginScanOverview.tsx
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useNavigate } from "react-router-dom";

const pluginResults = [
  { name: "SAST", score: 82, issues: 6 },
  { name: "DAST", score: 70, issues: 12 },
  { name: "SCA", score: 90, issues: 3 },
];

export default function PluginScanOverview() {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border dark:border-gray-700 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">
          🔍 Vue d’ensemble des scans de sécurité
        </h2>
        <button
          onClick={() => navigate("/plugin/SAST")}
          className="text-sm px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Détails par plugin →
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {pluginResults.map((plugin) => (
          <div
            key={plugin.name}
            className="bg-gray-100 dark:bg-gray-700 rounded p-4 shadow-md hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold">{plugin.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Score : <span className="font-bold">{plugin.score}/100</span>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Problèmes détectés :{" "}
              <span className="font-bold">{plugin.issues}</span>
            </p>
          </div>
        ))}
      </div>

      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={pluginResults}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="score" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
