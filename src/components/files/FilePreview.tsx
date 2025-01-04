import React from 'react';
import { File, Image, FileText } from 'lucide-react';

interface FilePreviewProps {
  file: {
    name: string;
    type: string;
    url: string;
  };
}

export const FilePreview: React.FC<FilePreviewProps> = ({ file }) => {
  const getPreviewContent = () => {
    if (file.type.startsWith('image/')) {
      return (
        <div className="relative w-full h-48">
          <img
            src={file.url}
            alt={file.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      );
    }

    if (file.type === 'application/pdf') {
      return (
        <iframe
          src={`${file.url}#toolbar=0`}
          className="w-full h-[600px] rounded-lg"
          title={file.name}
        />
      );
    }

    return (
      <div className="flex items-center justify-center h-48 bg-gray-100 rounded-lg">
        <FileText className="h-16 w-16 text-gray-400" />
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {getPreviewContent()}
      <div className="p-4 border-t">
        <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
      </div>
    </div>
  );
};