import React from 'react';
import { FileText, Image, File } from 'lucide-react';
import { FilePreview } from '../files/FilePreview';
import { useAppState } from '../../hooks/useAppState';

interface ClientFilesProps {
  clientId: string;
}

export const ClientFiles: React.FC<ClientFilesProps> = ({ clientId }) => {
  const { files } = useAppState();
  const clientFiles = files.filter(f => f.clientId === clientId);

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="w-8 h-8 text-blue-500" />;
    if (type.includes('pdf')) return <FileText className="w-8 h-8 text-red-500" />;
    return <File className="w-8 h-8 text-gray-500" />;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-xl font-semibold mb-4">Files</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clientFiles.length === 0 ? (
          <p className="text-gray-500">No files uploaded yet</p>
        ) : (
          clientFiles.map(file => (
            <FilePreview key={file.id} file={file} />
          ))
        )}
      </div>
    </div>
  );
};