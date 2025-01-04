import React from 'react';
import { FilePreview } from '../files/FilePreview';
import { Progress } from '../shared/Progress';

interface ClientPortalProps {
  clientId: string;
  projectId: string;
  isPasswordProtected?: boolean;
}

export const ClientPortal: React.FC<ClientPortalProps> = ({
  clientId,
  projectId,
  isPasswordProtected
}) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(!isPasswordProtected);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-sm max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6">Enter Password</h2>
          <form className="space-y-4">
            <input
              type="password"
              placeholder="Project password"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Access Project
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Project Progress</h2>
              <Progress value={75} />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Milestones</h3>
              <div className="space-y-4">
                {/* Milestone items will be mapped here */}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Project Files</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* File previews will be mapped here */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};