import { useLocalStorage } from './useLocalStorage';

export interface Settings {
  darkMode: boolean;
  emailNotifications: boolean;
  twoFactorAuth: boolean;
  language: string;
}

const defaultSettings: Settings = {
  darkMode: false,
  emailNotifications: true,
  twoFactorAuth: false,
  language: 'en'
};

export function useSettings() {
  const [settings, setSettings] = useLocalStorage<Settings>('app-settings', defaultSettings);

  const updateSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    
    // Handle side effects for specific settings
    if (key === 'darkMode') {
      if (value) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  const resetToDefaults = () => {
    setSettings(defaultSettings);
    document.documentElement.classList.remove('dark');
  };

  return {
    settings,
    updateSetting,
    resetToDefaults
  };
}