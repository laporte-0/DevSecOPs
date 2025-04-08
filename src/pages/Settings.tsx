import { useState, useEffect } from "react";
import {
  mockProjects,
  mockSettings,
  ProjectKey,
} from "../services/mockProjects";

export default function Settings() {
  const [selectedProjectId, setSelectedProjectId] =
    useState<ProjectKey>("projectA");
  const [settings, setSettings] = useState(mockSettings["projectA"]);

  useEffect(() => {
    setSettings(mockSettings[selectedProjectId]);
  }, [selectedProjectId]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Project Settings</h1>
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

      {/* Settings Panel */}
      <div className="bg-white border rounded-lg shadow-sm p-6 space-y-6">
        {/* Notifications */}
        <div>
          <h2 className="text-lg font-medium mb-2">Notifications</h2>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.notifications.email}
                readOnly
              />
              <span>Email Alerts</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.notifications.slack}
                readOnly
              />
              <span>Slack Alerts</span>
            </label>
          </div>
        </div>

        {/* Threshold */}
        <div>
          <h2 className="text-lg font-medium mb-2">Security Alert Threshold</h2>
          <p className="text-sm text-gray-600 mb-2">
            Receive alerts when the security score drops below this value.
          </p>
          <input
            type="number"
            value={settings.alertThreshold}
            readOnly
            className="border rounded px-3 py-1 w-20"
          />
        </div>

        {/* GitHub Integration */}
        <div>
          <h2 className="text-lg font-medium mb-2">GitHub Integration</h2>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.githubIntegration}
              readOnly
            />
            <span>Enable GitHub Webhook Integration</span>
          </label>
        </div>
      </div>
    </div>
  );
}
