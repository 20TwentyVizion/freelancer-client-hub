import React from 'react';
import { Upload, Palette } from 'lucide-react';
import { FileUploader } from '../files/FileUploader';

interface BrandingSettingsProps {
  onSave: (settings: BrandingSettings) => void;
  initialSettings?: BrandingSettings;
}

interface BrandingSettings {
  logo?: File;
  primaryColor: string;
  accentColor: string;
}

export const BrandingSettings: React.FC<BrandingSettingsProps> = ({
  onSave,
  initialSettings,
}) => {
  const [settings, setSettings] = React.useState<BrandingSettings>({
    primaryColor: initialSettings?.primaryColor || '#2563eb',
    accentColor: initialSettings?.accentColor || '#1d4ed8',
  });

  const handleLogoUpload = (files: File[]) => {
    if (files[0]) {
      setSettings((prev) => ({ ...prev, logo: files[0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(settings);
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Branding Settings
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Customize how your client portal looks
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Logo</label>
          <div className="mt-1">
            <FileUploader
              onFileSelect={handleLogoUpload}
              maxSize={5 * 1024 * 1024} // 5MB
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Primary Color
            </label>
            <div className="mt-1 flex items-center">
              <input
                type="color"
                value={settings.primaryColor}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    primaryColor: e.target.value,
                  }))
                }
                className="h-8 w-8 rounded-md border border-gray-300"
              />
              <input
                type="text"
                value={settings.primaryColor}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    primaryColor: e.target.value,
                  }))
                }
                className="ml-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Accent Color
            </label>
            <div className="mt-1 flex items-center">
              <input
                type="color"
                value={settings.accentColor}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    accentColor: e.target.value,
                  }))
                }
                className="h-8 w-8 rounded-md border border-gray-300"
              />
              <input
                type="text"
                value={settings.accentColor}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    accentColor: e.target.value,
                  }))
                }
                className="ml-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};