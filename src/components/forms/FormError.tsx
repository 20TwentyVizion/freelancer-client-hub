import React from 'react';
import { AlertCircle } from 'lucide-react';

interface FormErrorProps {
  message: string;
}

export const FormError: React.FC<FormErrorProps> = ({ message }) => {
  return (
    <div className="text-red-600 text-sm flex items-center mt-1">
      <AlertCircle className="w-4 h-4 mr-1" />
      {message}
    </div>
  );
};