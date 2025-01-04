import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Building, Mail, Phone, Calendar } from 'lucide-react';
import { ClientProjects } from './ClientProjects';
import { ClientInvoices } from './ClientInvoices';
import { ClientFiles } from './ClientFiles';
import { Modal } from '../shared/Modal';
import { NewProjectForm } from '../forms/NewProjectForm';
import { InvoiceForm } from '../invoices/InvoiceForm';
import { FileUploader } from '../files/FileUploader';
import { useAppState } from '../../hooks/useAppState';
import type { Client } from '../../types';

export const ClientProfile: React.FC = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const { clients, addProject, addInvoice, addFile } = useAppState();
  const [activeModal, setActiveModal] = useState<'project' | 'invoice' | 'upload' | null>(null);

  const client = clients.find(c => c.id === clientId);

  if (!client) {
    return <div>Client not found</div>;
  }

  const getModalContent = () => {
    switch (activeModal) {
      case 'project':
        return (
          <NewProjectForm
            client={client}
            onSubmit={async (data) => {
              await addProject({ ...data, clientId: client.id });
              setActiveModal(null);
            }}
            onCancel={() => setActiveModal(null)}
          />
        );
      case 'invoice':
        return (
          <InvoiceForm
            client={client}
            onSubmit={async (data) => {
              await addInvoice({ ...data, clientId: client.id });
              setActiveModal(null);
            }}
            onCancel={() => setActiveModal(null)}
          />
        );
      case 'upload':
        return (
          <FileUploader
            client={client}
            onUpload={async (files) => {
              await addFile(files, client.id);
              setActiveModal(null);
            }}
            onCancel={() => setActiveModal(null)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Client Info Card */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{client.name}</h2>
            <div className="mt-2 space-y-2">
              <div className="flex items-center text-gray-600">
                <Building className="w-5 h-5 mr-2" />
                <span>{client.company}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Mail className="w-5 h-5 mr-2" />
                <span>{client.email}</span>
              </div>
              {client.phone && (
                <div className="flex items-center text-gray-600">
                  <Phone className="w-5 h-5 mr-2" />
                  <span>{client.phone}</span>
                </div>
              )}
              <div className="flex items-center text-gray-600">
                <Calendar className="w-5 h-5 mr-2" />
                <span>Client since {new Date(client.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <div className="space-x-3">
            <button
              onClick={() => setActiveModal('project')}
              className="btn-primary"
            >
              Create Project
            </button>
            <button
              onClick={() => setActiveModal('invoice')}
              className="btn-secondary"
            >
              Create Invoice
            </button>
            <button
              onClick={() => setActiveModal('upload')}
              className="btn-secondary"
            >
              Upload Files
            </button>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <ClientProjects clientId={client.id} />

      {/* Invoices Section */}
      <ClientInvoices clientId={client.id} />

      {/* Files Section */}
      <ClientFiles clientId={client.id} />

      {/* Modals */}
      <Modal
        isOpen={activeModal !== null}
        onClose={() => setActiveModal(null)}
        title={activeModal ? `${activeModal.charAt(0).toUpperCase() + activeModal.slice(1)}` : ''}
      >
        {getModalContent()}
      </Modal>
    </div>
  );
};