import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Progress } from '../shared/Progress';
import { useAppState } from '../../hooks/useAppState';

interface ClientProjectsProps {
  clientId: string;
}

export const ClientProjects: React.FC<ClientProjectsProps> = ({ clientId }) => {
  const { projects } = useAppState();
  const clientProjects = projects.filter(p => p.clientId === clientId);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-xl font-semibold mb-4">Projects</h3>
      <div className="space-y-4">
        {clientProjects.length === 0 ? (
          <p className="text-gray-500">No projects yet</p>
        ) : (
          clientProjects.map(project => (
            <div key={project.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <h4 className="text-lg font-medium">{project.name}</h4>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  project.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                  project.status === 'completed' ? 'bg-green-100 text-green-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {project.status.replace('_', ' ')}
                </span>
              </div>
              <Progress value={project.progress || 0} />
              <div className="mt-3 flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-1" />
                <span>Due {new Date(project.dueDate).toLocaleDateString()}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};