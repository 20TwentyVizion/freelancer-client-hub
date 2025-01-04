import React from 'react';
import { DollarSign, Calendar, CheckCircle, Clock } from 'lucide-react';
import { useAppState } from '../../hooks/useAppState';

interface ClientInvoicesProps {
  clientId: string;
}

export const ClientInvoices: React.FC<ClientInvoicesProps> = ({ clientId }) => {
  const { invoices } = useAppState();
  const clientInvoices = invoices.filter(i => i.clientId === clientId);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-xl font-semibold mb-4">Invoices</h3>
      <div className="space-y-4">
        {clientInvoices.length === 0 ? (
          <p className="text-gray-500">No invoices yet</p>
        ) : (
          clientInvoices.map(invoice => (
            <div key={invoice.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center">
                    <span className="text-lg font-medium">#{invoice.invoiceNumber}</span>
                    <span className={`ml-3 px-2 py-1 rounded-full text-sm ${
                      invoice.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {invoice.status}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>Due {new Date(invoice.dueDate).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="text-xl font-semibold">
                  ${invoice.amount.toLocaleString()}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};