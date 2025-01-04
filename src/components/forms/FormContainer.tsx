import React from 'react';

interface FormContainerProps {
  title: string;
  children: React.ReactNode;
}

export const FormContainer: React.FC<FormContainerProps> = ({ title, children }) => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
};