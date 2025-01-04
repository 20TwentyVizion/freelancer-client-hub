import React from 'react';
import { formatDistanceToNow, formatDate } from '../../utils/dateHelpers';

interface StatsDetailProps {
  type: 'projects' | 'clients' | 'invoices' | 'deadlines';
  items: Array<{
    id: string;
    name?: string;
    amount?: number;
    status: string;
    date?: Date;
  }>;
}

export const StatsDetail: React.FC<StatsDetailProps> = ({ type, items }) => {
  const renderItem = (item: any) => {
    switch (type) {
      case 'projects':
        return (
          <div key={item.id} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">Status: {item.status}</p>
            </div>
            <span className="text-sm text-gray-500">
              Due {formatDistanceToNow(item.date)}
            </span>
          </div>
        );
      
      case 'clients':
        return (
          <div key={item.id} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">Status: {item.status}</p>
            </div>
          </div>
        );
      
      case 'invoices':
        return (
          <div key={item.id} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Invoice #{item.id}</p>
              <p className="text-sm text-gray-500">Status: {item.status}</p>
            </div>
            <span className="font-medium">${item.amount?.toLocaleString() ?? 0}</span>
          </div>
        );
      
      case 'deadlines':
        return (
          <div key={item.id} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">
                Due {formatDate(item.date)}
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-2">
      {items.length === 0 ? (
        <p className="text-center text-gray-500 py-4">No items to display</p>
      ) : (
        items.map(renderItem)
      )}
    </div>
  );
};