import React, { useState } from 'react';
import { DollarSign, Users, FileText, Clock } from 'lucide-react';
import { Modal } from '../shared/Modal';
import { StatsDetail } from './StatsDetail';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  onClick: () => void;
}

const StatsCard = ({ title, value, icon, trend, onClick }: StatsCardProps) => (
  <div 
    className="glass-card p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer"
    onClick={onClick}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-surface-600">{title}</p>
        <h3 className="text-2xl font-bold text-surface-900 mt-1">{value}</h3>
        {trend && (
          <p className="text-sm text-primary-600 mt-1 font-medium">
            {trend}
          </p>
        )}
      </div>
      <div className="p-3 bg-primary-100 text-primary-600 rounded-xl">
        {icon}
      </div>
    </div>
  </div>
);

interface DashboardStatsProps {
  activeProjects: number;
  activeClients: number;
  pendingInvoices: number;
  upcomingDeadlines: number;
  projects: any[];
  clients: any[];
  invoices: any[];
  deadlines: any[];
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({
  activeProjects,
  activeClients,
  pendingInvoices,
  upcomingDeadlines,
  projects,
  clients,
  invoices,
  deadlines
}) => {
  const [selectedStat, setSelectedStat] = useState<string | null>(null);

  const getModalContent = () => {
    switch (selectedStat) {
      case 'projects':
        return <StatsDetail type="projects" items={projects} />;
      case 'clients':
        return <StatsDetail type="clients" items={clients} />;
      case 'invoices':
        return <StatsDetail type="invoices" items={invoices} />;
      case 'deadlines':
        return <StatsDetail type="deadlines" items={deadlines} />;
      default:
        return null;
    }
  };

  const getModalTitle = () => {
    switch (selectedStat) {
      case 'projects':
        return 'Active Projects';
      case 'clients':
        return 'Active Clients';
      case 'invoices':
        return 'Pending Invoices';
      case 'deadlines':
        return 'Upcoming Deadlines';
      default:
        return '';
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Active Projects"
          value={activeProjects}
          icon={<FileText className="w-6 h-6" />}
          onClick={() => setSelectedStat('projects')}
        />
        <StatsCard
          title="Active Clients"
          value={activeClients}
          icon={<Users className="w-6 h-6" />}
          onClick={() => setSelectedStat('clients')}
        />
        <StatsCard
          title="Pending Invoices"
          value={`$${pendingInvoices.toLocaleString()}`}
          icon={<DollarSign className="w-6 h-6" />}
          onClick={() => setSelectedStat('invoices')}
        />
        <StatsCard
          title="Upcoming Deadlines"
          value={upcomingDeadlines}
          icon={<Clock className="w-6 h-6" />}
          trend={upcomingDeadlines > 0 ? "Next: Tomorrow" : undefined}
          onClick={() => setSelectedStat('deadlines')}
        />
      </div>

      <Modal
        isOpen={!!selectedStat}
        onClose={() => setSelectedStat(null)}
        title={getModalTitle()}
      >
        {getModalContent()}
      </Modal>
    </>
  );
};