// types.ts
export type VulnerabilityLevel = "critical" | "medium" | "low";

export interface Vulnerabilities {
  critical: number;
  medium: number;
  low: number;
}

export interface ProjectStats {
  activeProjects: number;
  teamMembers: number;
  deployments: number;
  pullRequests: number;
}

export interface ActivityItem {
  id: string;
  user: string;
  action: string;
  timestamp: string;
}

export interface Project {
  id: string;
  name: string;
  score: number;
  status: "secure" | "warning" | "critical" | string;
  vulnerabilities: Vulnerabilities;
  projectStats: ProjectStats;
  recentActivity: ActivityItem[];
}
export interface ChatMessage {
    id: string;
    sender: "user" | "bot";
    content: string;
    timestamp: string;
  }
  
