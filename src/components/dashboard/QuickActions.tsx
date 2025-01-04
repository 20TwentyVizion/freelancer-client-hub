import React from 'react';
import { UserPlus, FilePlus, Plus, Upload } from 'lucide-react';

interface QuickActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const QuickActionButton: React.FC<QuickActionButtonProps> = ({ 
  icon, 
  label, 
  onClick, 
  disabled 
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`glass-card flex items-center space-x-3 p-4 w-full group 
               transition-all duration-300 hover:shadow-lg hover:scale-[1.02]
               ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
  >
    <div className={`p-2 rounded-lg transition-colors duration-300
                    ${disabled 
                      ? 'bg-surface-100 text-surface-400 dark:bg-surface-700 dark:text-surface-500' 
                      : 'bg-primary-100 text-primary-600 group-hover:bg-primary-600 group-hover:text-white dark:bg-primary-900 dark:text-primary-400'
                    }`}>
      {icon}
    </div>
    <span className={`font-medium ${disabled ? 'text-surface-400 dark:text-surface-500' : 'text-surface-700 dark:text-surface-200 group-hover:text-surface-900 dark:group-hover:text-surface-50'}`}>
      {label}
    </span>
  </button>
);

interface QuickActionsProps {
  onAction: (action: string) => void;
  hasClients: boolean;
  hasProjects: boolean;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ 
  onAction,
  hasClients,
  hasProjects
}) => {
  return (
    <div className="glass-card p-6">
      <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-50 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickActionButton
          icon={<UserPlus className="w-5 h-5" />}
          label="Add New Client"
          onClick={() => onAction('client')}
        />
        <QuickActionButton
          icon={<Plus className="w-5 h-5" />}
          label="Create Project"
          onClick={() => onAction('project')}
          disabled={!hasClients}
        />
        <QuickActionButton
          icon={<FilePlus className="w-5 h-5" />}
          label="Create Invoice"
          onClick={() => onAction('invoice')}
          disabled={!hasClients || !hasProjects}
        />
        <QuickActionButton
          icon={<Upload className="w-5 h-5" />}
          label="Upload Files"
          onClick={() => onAction('upload')}
          disabled={!hasProjects}
        />
      </div>
    </div>
  );
};