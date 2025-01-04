import React, { useState } from 'react';
import { generateInvoicePDF } from '../../utils/invoiceGenerator';
import { saveAs } from 'file-saver';
import { LineItem } from './LineItem';
import { InvoiceHeader } from './InvoiceHeader';
import type { InvoiceData, LineItemType } from '../../types/invoice';

interface InvoiceFormProps {
  clientId: string;
  projectId: string;
  onSubmit: (data: InvoiceData) => void;
}

export const InvoiceForm: React.FC<InvoiceFormProps> = ({ 
  clientId, 
  projectId, 
  onSubmit 
}) => {
  const [formData, setFormData] = useState<InvoiceData>({
    dueDate: '',
    invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
    lineItems: [{ description: '', quantity: 0, price: 0 }]
  });

  const addLineItem = () => {
    setFormData(prev => ({
      ...prev,
      lineItems: [...prev.lineItems, { description: '', quantity: 0, price: 0 }]
    }));
  };

  const updateLineItem = (index: number, field: keyof LineItemType, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      lineItems: prev.lineItems.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const updateHeader = (field: 'dueDate' | 'invoiceNumber', value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const pdfBlob = await generateInvoicePDF({
        ...formData,
        clientName: "John Doe", // Replace with actual client name from props
        clientEmail: "john@example.com", // Replace with actual client email from props
        clientCompany: "ACME Inc" // Replace with actual company from props
      });
      
      saveAs(pdfBlob, `invoice-${formData.invoiceNumber}.pdf`);
      onSubmit(formData);
    } catch (error) {
      console.error('Error generating invoice:', error);
      // Add error handling UI feedback here
    }
  };

  const total = formData.lineItems.reduce((sum, item) => 
    sum + (item.quantity * item.price), 0
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <InvoiceHeader
          dueDate={formData.dueDate}
          invoiceNumber={formData.invoiceNumber}
          onUpdate={updateHeader}
        />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Line Items</h3>
          {formData.lineItems.map((item, index) => (
            <LineItem
              key={index}
              item={item}
              index={index}
              onUpdate={updateLineItem}
            />
          ))}
          <button
            type="button"
            onClick={addLineItem}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            + Add Line Item
          </button>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <div className="text-lg font-medium">
            Total: ${total.toFixed(2)}
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Generate Invoice
          </button>
        </div>
      </div>
    </form>
  );
};