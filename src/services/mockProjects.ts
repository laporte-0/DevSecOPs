// src/services/mockProjects.ts

import { Project } from "../pages/types"; // Corrigé : importer depuis types.ts

export type ProjectKey = "projectA" | "projectB";

export const mockProjects: Project[] = [
  {
    id: "projectA",
    name: "Project Alpha",
    status: "secure",
    score: 87,
    vulnerabilities: {
      critical: 0,
      medium: 2,
      low: 4,
    },
    projectStats: {
      activeProjects: 1,
      teamMembers: 3,
      deployments: 5,
      pullRequests: 12,
    },
    recentActivity: [
      {
        id: "1",
        user: "alice",
        action: "pushed a commit",
        timestamp: "2025-04-03 10:21",
      },
      {
        id: "2",
        user: "bob",
        action: "opened a pull request",
        timestamp: "2025-04-03 09:12",
      },
    ],
  },
  {
    id: "projectB",
    name: "Project Beta",
    status: "warning",
    score: 65,
    vulnerabilities: {
      critical: 2,
      medium: 5,
      low: 10,
    },
    projectStats: {
      activeProjects: 1,
      teamMembers: 5,
      deployments: 8,
      pullRequests: 20,
    },
    recentActivity: [
      {
        id: "1",
        user: "charlie",
        action: "triggered a pipeline",
        timestamp: "2025-04-02 14:03",
      },
    ],
  },
];

export const mockInsights: Record<ProjectKey, { date: string; score: number }[]> = {
  projectA: [
    { date: "2025-03-28", score: 78 },
    { date: "2025-03-29", score: 81 },
    { date: "2025-03-30", score: 85 },
    { date: "2025-03-31", score: 84 },
    { date: "2025-04-01", score: 87 },
    { date: "2025-04-02", score: 86 },
    { date: "2025-04-03", score: 87 },
  ],
  projectB: [
    { date: "2025-03-28", score: 55 },
    { date: "2025-03-29", score: 58 },
    { date: "2025-03-30", score: 60 },
    { date: "2025-03-31", score: 62 },
    { date: "2025-04-01", score: 65 },
    { date: "2025-04-02", score: 64 },
    { date: "2025-04-03", score: 65 },
  ],
};
export interface PipelineEntry {
  id: string;
  name: string;
  status: "success" | "failed" | "running";
  triggeredBy: string;
  createdAt: string;
}

export const mockPipelines: Record<ProjectKey, PipelineEntry[]> = {
  projectA: [
    {
      id: "pipeline-1",
      name: "CI Build",
      status: "success",
      triggeredBy: "alice",
      createdAt: "2025-04-03 10:30",
    },
    {
      id: "pipeline-2",
      name: "Security Scan",
      status: "running",
      triggeredBy: "bob",
      createdAt: "2025-04-03 10:00",
    },
  ],
  projectB: [
    {
      id: "pipeline-3",
      name: "Unit Tests",
      status: "failed",
      triggeredBy: "charlie",
      createdAt: "2025-04-02 15:30",
    },
  ],
};
export interface ProjectSettings {
  notifications: {
    email: boolean;
    slack: boolean;
  };
  alertThreshold: number;
  githubIntegration: boolean;
}

export const mockSettings: Record<ProjectKey, ProjectSettings> = {
  projectA: {
    notifications: {
      email: true,
      slack: false,
    },
    alertThreshold: 70,
    githubIntegration: true,
  },
  projectB: {
    notifications: {
      email: false,
      slack: true,
    },
    alertThreshold: 60,
    githubIntegration: false,
  },
};
export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  content: string;
  timestamp: string;
}

export const mockChats: ChatMessage[] = [
  {
    id: "1",
    sender: "user",
    content: "Why did the security scan fail?",
    timestamp: "2025-04-03 11:00",
  },
  {
    id: "2",
    sender: "bot",
    content:
      "The scan failed due to a critical vulnerability in 'express@4.17.1'. Consider upgrading to a patched version or use a mitigation strategy.",
    timestamp: "2025-04-03 11:00",
  },
  {
    id: "3",
    sender: "user",
    content: "How can I fix it?",
    timestamp: "2025-04-03 11:01",
  },
  {
    id: "4",
    sender: "bot",
    content:
      "You can update your `package.json` to use `express@4.18.2` and re-run the pipeline. Also make sure to scan dependencies using Snyk or npm audit.",
    timestamp: "2025-04-03 11:01",
  },
];
