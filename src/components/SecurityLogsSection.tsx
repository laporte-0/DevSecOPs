import { AlertCircle, Info, ShieldCheck, AlertTriangle } from "lucide-react"; // ✅ Correction
import { useState } from "react";

interface Log {
  id: string;
  timestamp: string;
  tool: "SAST" | "SCA" | "DAST";
  level: "INFO" | "WARNING" | "ERROR";
  message: string;
}

const mockLogs: Log[] = [
  {
    id: "log1",
    timestamp: "2025-04-20 12:01:45",
    tool: "SAST",
    level: "ERROR",
    message: "Injection de commande potentielle détectée.",
  },
  {
    id: "log2",
    timestamp: "2025-04-20 12:01:50",
    tool: "SCA",
    level: "WARNING",
    message: "Dépendance obsolète : lodash < 4.17.21",
  },
  {
    id: "log3",
    timestamp: "2025-04-20 12:02:10",
    tool: "DAST",
    level: "INFO",
    message: "Scan terminé sans vulnérabilités critiques.",
  },
  {
    id: "log4",
    timestamp: "2025-04-20 12:02:40",
    tool: "SAST",
    level: "ERROR",
    message: "Fuite de données possible via journalisation sensible.",
  },
];

export default function SecurityLogsSection() {
  const [filter, setFilter] = useState<"ALL" | "SAST" | "SCA" | "DAST">("ALL");

  const filtered =
    filter === "ALL" ? mockLogs : mockLogs.filter((log) => log.tool === filter);

  const levelIcon = {
    INFO: <Info className="h-5 w-5 text-blue-600" />,
    WARNING: <AlertTriangle className="h-5 w-5 text-yellow-600" />, // ✅ Correction
    ERROR: <AlertCircle className="h-5 w-5 text-red-600" />,
  };

  const toolColor = {
    SAST: "bg-purple-100 text-purple-800",
    SCA: "bg-yellow-100 text-yellow-800",
    DAST: "bg-blue-100 text-blue-800",
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border dark:border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">🧩 Logs de sécurité</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
          className="text-sm px-2 py-1 border rounded-md bg-white dark:bg-gray-900 dark:text-white dark:border-gray-700"
        >
          <option value="ALL">Tous</option>
          <option value="SAST">SAST</option>
          <option value="SCA">SCA</option>
          <option value="DAST">DAST</option>
        </select>
      </div>

      <ul className="divide-y dark:divide-gray-700 text-sm">
        {filtered.map((log) => (
          <li key={log.id} className="flex items-start gap-4 py-3">
            <div>{levelIcon[log.level]}</div>
            <div className="flex-1">
              <p className="text-gray-800 dark:text-white">{log.message}</p>
              <p className="text-xs text-gray-500 mt-1">
                {log.timestamp} –{" "}
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    toolColor[log.tool]
                  }`}
                >
                  {log.tool}
                </span>{" "}
                – <span className="font-semibold">{log.level}</span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
