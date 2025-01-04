import React from 'react';
import { Calendar, CheckCircle } from 'lucide-react';
import { Progress } from '../shared/Progress';
import { AccessLogTable } from '../access/AccessLogTable';
import type { Project, AccessLog } from '../../types';

interface ProjectViewProps {
  project: Project;
  accessLogs: AccessLog[];
  onUpdateProgress: (progress: number) => void;
  onUpdateMilestone: (milestoneId: string, completed: boolean) => void;
}

export const ProjectView: React.FC<ProjectViewProps> = ({
  project,
  accessLogs,
  onUpdateProgress,
  onUpdateMilestone,
}) => {
  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <h2 className="text-2xl font-bold text-surface-900 mb-4">{project.name}</h2>
        <Progress value={project.progress} />
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Milestones</h3>
          <div className="space-y-3">
            {project.milestones.map((milestone) => (
              <div
                key={milestone.id}
                className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm"
              >
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => onUpdateMilestone(milestone.id, !milestone.completed)}
                    className={`p-1 rounded-full ${
                      milestone.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    <CheckCircle className="w-5 h-5" />
                  </button>
                  <span className="font-medium">{milestone.title}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(milestone.dueDate).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AccessLogTable logs={accessLogs} />
    </div>
  );
};