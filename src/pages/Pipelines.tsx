import { useState, useEffect } from "react";
import {
  mockProjects,
  mockPipelines,
  ProjectKey,
} from "../services/mockProjects";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

export default function Pipelines() {
  const [selectedProjectId, setSelectedProjectId] =
    useState<ProjectKey>("projectA");
  const [pipelines, setPipelines] = useState(mockPipelines["projectA"]);

  useEffect(() => {
    setPipelines(mockPipelines[selectedProjectId]);
  }, [selectedProjectId]);

  const statusColor = {
    success: "text-green-600",
    failed: "text-red-600",
    running: "text-blue-600 animate-spin",
  };

  const statusLabel = {
    success: "Success",
    failed: "Failed",
    running: "Running",
  };

  const statusIcon = {
    success: CheckCircle,
    failed: XCircle,
    running: Loader2,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Pipelines</h1>
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

      {/* Pipeline List */}
      <div className="bg-white rounded-lg border shadow-sm">
        <ul>
          {pipelines.map((pipeline) => {
            const Icon = statusIcon[pipeline.status];
            return (
              <li
                key={pipeline.id}
                className="flex justify-between items-center px-6 py-4 border-b last:border-b-0"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {pipeline.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    Triggered by {pipeline.triggeredBy} – {pipeline.createdAt}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Icon className={`h-5 w-5 ${statusColor[pipeline.status]}`} />
                  <span
                    className={`text-sm font-medium ${
                      statusColor[pipeline.status]
                    }`}
                  >
                    {statusLabel[pipeline.status]}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
