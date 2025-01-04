import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

interface LineItem {
  description: string;
  quantity: number;
  price: number;
}

interface InvoiceData {
  invoiceNumber: string;
  dueDate: string;
  lineItems: LineItem[];
  clientName: string;
  clientEmail: string;
  clientCompany?: string;
}

export const generateInvoicePDF = async (data: InvoiceData): Promise<Blob> => {
  const doc = new jsPDF();
  
  // Add header
  doc.setFontSize(20);
  doc.text('INVOICE', 105, 20, { align: 'center' });
  
  // Add invoice details
  doc.setFontSize(12);
  doc.text(`Invoice #: ${data.invoiceNumber}`, 20, 40);
  doc.text(`Due Date: ${new Date(data.dueDate).toLocaleDateString()}`, 20, 50);
  
  // Add client details
  doc.text('Bill To:', 20, 70);
  doc.text(data.clientName, 20, 80);
  if (data.clientCompany) {
    doc.text(data.clientCompany, 20, 90);
  }
  doc.text(data.clientEmail, 20, data.clientCompany ? 100 : 90);
  
  // Add line items
  const tableData = data.lineItems.map(item => [
    item.description,
    item.quantity.toString(),
    `$${item.price.toFixed(2)}`,
    `$${(item.quantity * item.price).toFixed(2)}`
  ]);
  
  const total = data.lineItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  
  (doc as any).autoTable({
    startY: data.clientCompany ? 110 : 100,
    head: [['Description', 'Quantity', 'Price', 'Total']],
    body: tableData,
    foot: [['', '', 'Total:', `$${total.toFixed(2)}`]],
    theme: 'striped',
    headStyles: { fillColor: [66, 139, 202] }
  });

  return doc.output('blob');
};