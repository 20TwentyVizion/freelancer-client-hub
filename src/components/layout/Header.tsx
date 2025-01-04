import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { NotificationCenter } from '../notifications/NotificationCenter';
import { SettingsPanel } from '../settings/SettingsPanel';
import type { Notification } from '../../types';

interface HeaderProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ notifications, onMarkAsRead }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <header className="mb-8 flex justify-between items-center">
      <h1 className="text-3xl font-bold text-gray-900">Freelancer Client Hub</h1>
      <div className="flex items-center space-x-4">
        <NotificationCenter
          notifications={notifications}
          onMarkAsRead={onMarkAsRead}
        />
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="p-2 text-surface-600 hover:text-surface-900 rounded-full hover:bg-surface-100"
        >
          <Settings className="w-6 h-6" />
        </button>
      </div>
      {isSettingsOpen && <SettingsPanel onClose={() => setIsSettingsOpen(false)} />}
    </header>
  );
};