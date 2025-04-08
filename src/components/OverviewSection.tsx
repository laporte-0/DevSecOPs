import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  Clock4,
  Code,
  GitPullRequest,
  Loader2,
  Users,
  Activity,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Project, VulnerabilityLevel } from "../pages/types";

interface OverviewSectionProps {
  projectData: Project;
  handleScan: () => void;
  isScanning: boolean;
  scanMessage: string | null;
  scoreHistory: { date: string; score: number }[];
}

const colorMap: Record<VulnerabilityLevel, string> = {
  critical: "red",
  medium: "yellow",
  low: "blue",
};

const iconMap: Record<VulnerabilityLevel, React.ElementType> = {
  critical: AlertOctagon,
  medium: AlertTriangle,
  low: AlertCircle,
};

const mockTimeline = [
  { id: 1, label: "Scan Started", time: "2025-04-03 10:30" },
  { id: 2, label: "SAST analysis", time: "2025-04-03 10:31" },
  { id: 3, label: "Dependency scan (SCA)", time: "2025-04-03 10:32" },
  { id: 4, label: "Results saved", time: "2025-04-03 10:33" },
];

export default function OverviewSection({
  projectData,
  handleScan,
  isScanning,
  scanMessage,
  scoreHistory,
}: OverviewSectionProps) {
  return (
    <>
      {/* Scan action */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleScan}
          disabled={isScanning}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isScanning ? (
            <span className="flex items-center gap-2">
              <Loader2 className="animate-spin w-4 h-4" /> Running Scan...
            </span>
          ) : (
            "Run Security Scan"
          )}
        </button>
        {scanMessage && <p className="text-green-700 text-sm">{scanMessage}</p>}
      </div>

      {/* Critical warning */}
      {(projectData.vulnerabilities.critical > 0 || projectData.score < 70) && (
        <div className="bg-red-100 border border-red-300 text-red-800 p-4 rounded-lg shadow-sm mt-4">
          🚨 Project is at risk: {projectData.vulnerabilities.critical} critical
          issues detected, score below threshold.
        </div>
      )}

      {/* Score breakdown */}
      <div className="bg-white p-4 rounded-lg shadow-sm border text-sm text-gray-600">
        <p>
          🔍 Score Breakdown: {projectData.vulnerabilities.critical} critical,{" "}
          {projectData.vulnerabilities.medium} medium,{" "}
          {projectData.vulnerabilities.low} low vulnerabilities.
        </p>
      </div>

      {/* Score & Vulnerabilities */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border col-span-1">
          <h3 className="text-lg font-medium mb-4">Security Score</h3>
          <div className="text-4xl font-bold text-center text-blue-600">
            {projectData.score}%
          </div>
        </div>
        {(["critical", "medium", "low"] as VulnerabilityLevel[]).map(
          (level) => {
            const Icon = iconMap[level];
            const color = colorMap[level];
            return (
              <div
                key={level}
                className={`bg-${color}-50 p-6 rounded-lg shadow-sm border`}
              >
                <div className="flex items-center">
                  <div className={`p-2 bg-${color}-100 rounded-lg`}>
                    <Icon className={`h-6 w-6 text-${color}-600`} />
                  </div>
                  <div className="ml-4">
                    <p className={`text-sm font-medium text-${color}-600`}>
                      {level.charAt(0).toUpperCase() + level.slice(1)}{" "}
                      Vulnerabilities
                    </p>
                    <p className={`text-2xl font-semibold text-${color}-900`}>
                      {projectData.vulnerabilities[level]}
                    </p>
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>

      {/* Graph */}
      <div className="bg-white p-6 rounded-lg shadow-sm border col-span-full">
        <h3 className="text-lg font-medium mb-4">Security Score Evolution</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={scoreHistory}
              margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis domain={[60, 100]} />
              <Tooltip formatter={(value) => [`${value}%`, "Score"]} />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#2563eb"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recommended Actions */}
      <div className="bg-white border rounded-lg p-6 space-y-2">
        <h2 className="text-lg font-medium mb-2">🛠️ Recommended Actions</h2>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          {projectData.vulnerabilities.critical > 0 && (
            <li>Fix critical vulnerabilities in key files immediately.</li>
          )}
          <li>Re-run the security scan to validate recent fixes.</li>
          <li>Review dependency updates for flagged packages.</li>
          <li>Ask the chatbot for guidance on recent failures.</li>
        </ul>
      </div>

      {/* CI/CD Timeline */}
      <div className="bg-white border rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
          <Clock4 className="h-5 w-5 text-gray-500" /> CI/CD Scan Timeline
        </h2>
        <ol className="relative border-l border-gray-300 space-y-4 ml-3">
          {mockTimeline.map((step) => (
            <li key={step.id} className="ml-4">
              <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-1.5 top-1"></div>
              <div className="text-sm">
                <span className="font-medium text-gray-800">{step.label}</span>
                <p className="text-xs text-gray-500">{step.time}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Project Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: "Active Projects",
            value: projectData.projectStats?.activeProjects,
            icon: Activity,
          },
          {
            label: "Team Members",
            value: projectData.projectStats?.teamMembers,
            icon: Users,
          },
          {
            label: "Deployments",
            value: projectData.projectStats?.deployments,
            icon: Code,
          },
          {
            label: "Pull Requests",
            value: projectData.projectStats?.pullRequests,
            icon: GitPullRequest,
          },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Icon className="h-6 w-6 text-gray-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
