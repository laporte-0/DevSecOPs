import { useEffect, useState } from "react";
import { Project } from "../pages/types";
import { mockProjects } from "../services/mockProjects";
import ScanHistorySection from "../components/ScanHistorySection";
import OverviewSection from "../components/OverviewSection";
import VulnerabilitySection from "../components/VulnerabilitySection";
import ActivitySection from "../components/ActivitySection";

const mockScoreHistory: {
  [projectId: string]: { date: string; score: number }[];
} = {
  projectA: [
    { date: "2025-03-30", score: 78 },
    { date: "2025-03-31", score: 81 },
    { date: "2025-04-01", score: 83 },
    { date: "2025-04-02", score: 85 },
    { date: "2025-04-03", score: 87 },
  ],
  projectB: [
    { date: "2025-03-30", score: 65 },
    { date: "2025-03-31", score: 66 },
    { date: "2025-04-01", score: 68 },
    { date: "2025-04-02", score: 69 },
    { date: "2025-04-03", score: 70 },
  ],
};

const mockVulns = [
  {
    id: "vuln1",
    level: "critical",
    file: "package.json",
    package: "express@4.17.1",
    fix: "Upgrade to 4.18.2",
    type: "SCA",
    description: "Known vulnerability allowing prototype pollution.",
  },
  {
    id: "vuln2",
    level: "medium",
    file: "src/utils/validator.ts",
    package: "custom sanitization",
    fix: "Refactor input check",
    type: "SAST",
    description: "Unescaped user input may lead to unsafe data.",
  },
];

export default function Dashboard() {
  const [projects] = useState<Project[]>(mockProjects);
  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    mockProjects[0].id
  );
  const [projectData, setProjectData] = useState<Project>(mockProjects[0]);
  const [activeTab, setActiveTab] = useState("overview");
  const [isScanning, setIsScanning] = useState(false);
  const [scanMessage, setScanMessage] = useState<string | null>(null);
  const [scoreHistory, setScoreHistory] = useState(
    mockScoreHistory[selectedProjectId]
  );

  useEffect(() => {
    setScoreHistory(mockScoreHistory[selectedProjectId]);
  }, [selectedProjectId]);

  useEffect(() => {
    const selected = projects.find((p) => p.id === selectedProjectId);
    if (selected) setProjectData(selected);
  }, [selectedProjectId, projects]);

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "secure":
        return "bg-green-100 text-green-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "critical":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleScan = () => {
    setIsScanning(true);
    setScanMessage(null);
    setTimeout(() => {
      const updatedProject = {
        ...projectData,
        score: Math.floor(Math.random() * 20) + 80,
        vulnerabilities: {
          critical: Math.floor(Math.random() * 2),
          medium: Math.floor(Math.random() * 5),
          low: Math.floor(Math.random() * 8),
        },
      };
      setProjectData(updatedProject);
      setIsScanning(false);
      setScanMessage("✅ Scan completed successfully. Security score updated.");
    }, 2000);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <select
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="border px-3 py-1 rounded-lg"
          >
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <span
          className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(
            projectData.status
          )}`}
        >
          {projectData.status}
        </span>
      </div>

      <div className="flex gap-4 border-b pb-2 mb-4 text-sm font-medium">
        {["overview", "vulns", "activity", "history"].map((tab) => (
          <button
            key={tab}
            className={
              activeTab === tab
                ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                : "text-gray-500 hover:text-gray-800"
            }
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <OverviewSection
          projectData={projectData}
          handleScan={handleScan}
          isScanning={isScanning}
          scanMessage={scanMessage}
          scoreHistory={scoreHistory}
        />
      )}
      {activeTab === "vulns" && (
        <VulnerabilitySection vulnerabilities={mockVulns} />
      )}
      {activeTab === "history" && <ScanHistorySection />}
      {activeTab === "activity" && (
        <ActivitySection projectData={projectData} />
      )}
    </div>
  );
}
