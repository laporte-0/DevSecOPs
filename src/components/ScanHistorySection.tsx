import { useState } from "react";

interface ScanEntry {
  date: string;
  score: number;
  critical: number;
  medium: number;
  low: number;
  status: "success" | "warning" | "failed";
}

const mockScanHistory: ScanEntry[] = [
  {
    date: "2025-04-03",
    score: 87,
    critical: 1,
    medium: 3,
    low: 5,
    status: "success",
  },
  {
    date: "2025-04-01",
    score: 84,
    critical: 0,
    medium: 4,
    low: 8,
    status: "success",
  },
  {
    date: "2025-03-29",
    score: 76,
    critical: 2,
    medium: 6,
    low: 9,
    status: "warning",
  },
  {
    date: "2025-03-28",
    score: 70,
    critical: 3,
    medium: 5,
    low: 10,
    status: "failed",
  },
];

const statusLabel = {
  success: "text-green-600",
  warning: "text-yellow-600",
  failed: "text-red-600",
};

export default function ScanHistorySection() {
  const [history] = useState(mockScanHistory);

  return (
    <div className="bg-white border rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">🕓 Scan History</h2>
      <table className="min-w-full text-sm text-left">
        <thead>
          <tr className="text-gray-500">
            <th className="py-2 px-3">Date</th>
            <th className="py-2 px-3">Score</th>
            <th className="py-2 px-3">Critical</th>
            <th className="py-2 px-3">Medium</th>
            <th className="py-2 px-3">Low</th>
            <th className="py-2 px-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {history.map((scan, idx) => (
            <tr key={idx} className="border-t">
              <td className="py-2 px-3">{scan.date}</td>
              <td className="py-2 px-3 font-medium text-blue-700">
                {scan.score}%
              </td>
              <td className="py-2 px-3">{scan.critical}</td>
              <td className="py-2 px-3">{scan.medium}</td>
              <td className="py-2 px-3">{scan.low}</td>
              <td
                className={`py-2 px-3 font-semibold ${
                  statusLabel[scan.status]
                }`}
              >
                {scan.status.charAt(0).toUpperCase() + scan.status.slice(1)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
