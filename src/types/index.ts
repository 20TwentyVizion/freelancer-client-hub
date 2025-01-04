// Update the Client interface
export interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  phone?: string;
  status: 'active' | 'inactive';
  createdAt: Date;
}

// Add File type
export interface File {
  id: string;
  name: string;
  type: string;
  url: string;
  size: number;
  clientId: string;
  projectId?: string;
  uploadedAt: Date;
}

// Update Project interface
export interface Project {
  id: string;
  name: string;
  clientId: string;
  status: 'in_progress' | 'completed' | 'on_hold';
  progress: number;
  dueDate: Date;
  createdAt: Date;
}

// Update Invoice interface
export interface Invoice {
  id: string;
  invoiceNumber: string;
  projectId: string;
  clientId: string;
  amount: number;
  status: 'pending' | 'paid';
  dueDate: Date;
  createdAt: Date;
}