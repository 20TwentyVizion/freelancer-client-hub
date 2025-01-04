import React from 'react';
import { DollarSign } from 'lucide-react';
import type { LineItemType } from '../../types/invoice';

interface LineItemProps {
  item: LineItemType;
  index: number;
  onUpdate: (index: number, field: keyof LineItemType, value: string | number) => void;
}

export const LineItem: React.FC<LineItemProps> = ({ item, index, onUpdate }) => {
  const handleNumberInput = (field: keyof LineItemType, value: string) => {
    const numValue = value === '' ? 0 : Number(value);
    onUpdate(index, field, numValue);
  };

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-6">
        <input
          type="text"
          placeholder="Description"
          value={item.description}
          onChange={(e) => onUpdate(index, 'description', e.target.value)}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div className="col-span-3">
        <input
          type="number"
          placeholder="Quantity"
          min="0"
          value={item.quantity || ''}
          onChange={(e) => handleNumberInput('quantity', e.target.value)}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div className="col-span-3">
        <div className="relative">
          <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="number"
            placeholder="Price"
            min="0"
            step="0.01"
            value={item.price || ''}
            onChange={(e) => handleNumberInput('price', e.target.value)}
            className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};