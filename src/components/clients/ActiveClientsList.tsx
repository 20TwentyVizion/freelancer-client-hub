import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building, ArrowRight } from 'lucide-react';
import type { Client } from '../../types';

interface ActiveClientsListProps {
  clients: Client[];
}

export const ActiveClientsList: React.FC<ActiveClientsListProps> = ({ clients }) => {
  const navigate = useNavigate();
  const activeClients = clients.filter(client => client.status === 'active');

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Active Clients</h2>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {activeClients.map(client => (
          <div 
            key={client.id}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => navigate(`/clients/${client.id}`)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
                <div className="mt-2 text-gray-600 flex items-center">
                  <Building className="w-4 h-4 mr-2" />
                  <span>{client.company}</span>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
