import React from 'react';
import { Settings, Moon, Bell, Shield, Database, Globe, RotateCcw } from 'lucide-react';
import { useSettings } from '../../hooks/useSettings';

interface SettingsPanelProps {
  onClose: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ onClose }) => {
  const { settings, updateSetting, resetToDefaults } = useSettings();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateSetting('language', e.target.value);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/20 dark:bg-black/40" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-96 max-w-full">
        <div className="h-full glass-card overflow-y-auto">
          <div className="p-6 border-b border-surface-200 dark:border-surface-700">
            <div className="flex items-center justify-between">
              <h2 className="text-xl heading-primary">Settings</h2>
              <button onClick={onClose} className="text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-sm heading-primary mb-4">Appearance</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Moon className="w-5 h-5 text-secondary" />
                    <span className="text-primary">Dark Mode</span>
                  </div>
                  <button 
                    onClick={() => updateSetting('darkMode', !settings.darkMode)}
                    className={`relative w-11 h-6 rounded-full transition-colors ${
                      settings.darkMode ? 'bg-primary-600' : 'bg-surface-200 dark:bg-surface-700'
                    }`}
                  >
                    <div 
                      className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                        settings.darkMode ? 'translate-x-5' : 'translate-x-0'
                      }`} 
                    />
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm heading-primary mb-4">Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Bell className="w-5 h-5 text-secondary" />
                    <span className="text-primary">Email Notifications</span>
                  </div>
                  <button 
                    onClick={() => updateSetting('emailNotifications', !settings.emailNotifications)}
                    className={`relative w-11 h-6 rounded-full transition-colors ${
                      settings.emailNotifications ? 'bg-primary-600' : 'bg-surface-200 dark:bg-surface-700'
                    }`}
                  >
                    <div 
                      className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                        settings.emailNotifications ? 'translate-x-5' : 'translate-x-0'
                      }`} 
                    />
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm heading-primary mb-4">Security</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-secondary" />
                    <span className="text-primary">Two-Factor Auth</span>
                  </div>
                  <button 
                    onClick={() => updateSetting('twoFactorAuth', !settings.twoFactorAuth)}
                    className={`relative w-11 h-6 rounded-full transition-colors ${
                      settings.twoFactorAuth ? 'bg-primary-600' : 'bg-surface-200 dark:bg-surface-700'
                    }`}
                  >
                    <div 
                      className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                        settings.twoFactorAuth ? 'translate-x-5' : 'translate-x-0'
                      }`} 
                    />
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm heading-primary mb-4">Language</h3>
              <select 
                value={settings.language}
                onChange={handleLanguageChange}
                className="input-field"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
              </select>
            </div>

            <div className="pt-4 border-t border-surface-200 dark:border-surface-700">
              <button
                onClick={resetToDefaults}
                className="btn-secondary w-full flex items-center justify-center space-x-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset to Defaults</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};