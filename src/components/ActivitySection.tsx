import { Project } from "../pages/types";
import { User } from "lucide-react";

interface Props {
  projectData: Project;
}

export default function ActivitySection({ projectData }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-lg font-medium mb-4">📋 Recent Activity</h2>
      <div className="space-y-4">
        {projectData.recentActivity?.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center py-3 border-b last:border-0"
          >
            <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="h-5 w-5 text-gray-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900">
                {activity.user} {activity.action}
              </p>
              <p className="text-sm text-gray-500">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
