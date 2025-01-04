import React from 'react';
import { Download, Upload, FileJson, FileText } from 'lucide-react';
import { exportData, importData } from '../../utils/dataHelpers';

interface DataExportProps {
  onExport: () => Promise<void>;
  onImport: (data: any) => Promise<void>;
}

export const DataExport: React.FC<DataExportProps> = ({ onExport, onImport }) => {
  const [importing, setImporting] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setImporting(true);
      const data = await importData(file);
      await onImport(data);
    } catch (error) {
      console.error('Import failed:', error);
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Data Management</h3>
      
      <div className="space-y-4">
        <div>
          <button
            onClick={onExport}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </button>
          <p className="mt-1 text-sm text-gray-500">
            Download all project and client data as JSON
          </p>
        </div>

        <div className="border-t pt-4">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={importing}
          >
            <Upload className="h-4 w-4 mr-2" />
            {importing ? 'Importing...' : 'Import Data'}
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImport}
            accept=".json,.csv"
            className="hidden"
          />
          <p className="mt-1 text-sm text-gray-500">
            Restore data from a backup file
          </p>
        </div>
      </div>
    </div>
  );
};