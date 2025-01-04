import React from 'react';

interface InvoiceHeaderProps {
  dueDate: string;
  invoiceNumber: string;
  onUpdate: (field: 'dueDate' | 'invoiceNumber', value: string) => void;
}

export const InvoiceHeader: React.FC<InvoiceHeaderProps> = ({
  dueDate,
  invoiceNumber,
  onUpdate,
}) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Due Date</label>
        <input
          type="date"
          required
          value={dueDate}
          onChange={(e) => onUpdate('dueDate', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Invoice Number</label>
        <input
          type="text"
          required
          value={invoiceNumber}
          onChange={(e) => onUpdate('invoiceNumber', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};