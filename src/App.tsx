import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { DashboardStats } from './components/dashboard/DashboardStats';
import { QuickActions } from './components/dashboard/QuickActions';
import { NewClientForm } from './components/forms/NewClientForm';
import { Header } from './components/layout/Header';
import { Modal } from './components/shared/Modal';
import { useAppState } from './hooks/useAppState';
import { useTheme } from './hooks/useTheme';
import { useNotifications } from './hooks/useNotifications';

const App: React.FC = () => {
  const [showNewClientModal, setShowNewClientModal] = React.useState(false);
  const location = useLocation();
  
  const {
    clients,
    projects,
    invoices,
    notifications,
    addClient,
    markNotificationAsRead,
    addNotification,
    exportAllData,
    importData,
  } = useAppState();
  
  const { sendNotification } = useNotifications();
  useTheme();

  // Calculate stats
  const activeProjects = projects.filter(p => p.status === 'in_progress').length;
  const activeClients = clients.filter(c => c.status === 'active').length;
  const pendingInvoices = invoices.filter(i => i.status === 'pending')
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  const upcomingDeadlines = projects.filter(p => {
    const daysUntilDue = Math.ceil((new Date(p.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return daysUntilDue > 0 && daysUntilDue <= 7;
  }).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Header
          notifications={notifications}
          onMarkAsRead={markNotificationAsRead}
        />
        
        {location.pathname === '/' && (
          <>
            <DashboardStats
              activeProjects={activeProjects}
              activeClients={activeClients}
              pendingInvoices={pendingInvoices}
              upcomingDeadlines={upcomingDeadlines}
              projects={projects}
              clients={clients}
              invoices={invoices}
              deadlines={projects.filter(p => p.dueDate)}
            />
            
            <QuickActions
              onAction={(action) => {
                if (action === 'new-client') {
                  setShowNewClientModal(true);
                }
              }}
              hasClients={clients.length > 0}
              hasProjects={projects.length > 0}
            />
          </>
        )}

        <Outlet context={{ clients, projects, invoices }} />

        {/* New Client Modal */}
        <Modal
          isOpen={showNewClientModal}
          onClose={() => setShowNewClientModal(false)}
          title="Add New Client"
        >
          <NewClientForm
            onSubmit={async (data) => {
              const newClient = await addClient(data);
              setShowNewClientModal(false);
              addNotification({
                title: 'Client Added',
                message: `${newClient.name} has been successfully added.`,
                type: 'success'
              });
              await sendNotification(
                newClient.email,
                'Welcome to Freelancer Client Hub',
                `Welcome ${newClient.name}! Your account has been created successfully.`
              );
            }}
            onCancel={() => setShowNewClientModal(false)}
          />
        </Modal>
      </div>
    </div>
  );
};

export default App;