export interface LineItemType {
  description: string;
  quantity: number;
  price: number;
}

export interface InvoiceData {
  dueDate: string;
  invoiceNumber: string;
  lineItems: LineItemType[];
  clientName?: string;
  clientEmail?: string;
  clientCompany?: string;
}