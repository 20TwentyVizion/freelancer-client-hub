import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X } from 'lucide-react';
import { validateFileType, formatFileSize } from '../../utils/fileHelpers';

interface FileUploaderProps {
  onFileSelect: (files: File[]) => void;
  maxSize?: number;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ 
  onFileSelect,
  maxSize = 10 * 1024 * 1024 // 10MB default
}) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const validFiles = acceptedFiles.filter(validateFileType);
    onFileSelect(validFiles);
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize,
    multiple: true
  });

  return (
    <div 
      {...getRootProps()} 
      className={`border-2 border-dashed rounded-lg p-6 cursor-pointer
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
    >
      <input {...getInputProps()} />
      <div className="text-center">
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          {isDragActive ? 'Drop files here' : 'Drag files here or click to browse'}
        </p>
        <p className="mt-1 text-xs text-gray-500">
          PDF, DOC, DOCX, JPG, PNG up to {formatFileSize(maxSize)}
        </p>
      </div>
    </div>
  );
};