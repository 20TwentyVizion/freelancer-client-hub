import { useMemo } from 'react';
import { addDays, startOfDay, endOfDay, isWithinInterval, subDays } from 'date-fns';
import { useAppState } from './useAppState';

interface TimelineData {
  date: Date;
  value: number;
}

interface AnalyticsData {
  clientGrowth: TimelineData[];
  projectCompletion: TimelineData[];
  revenueTimeline: TimelineData[];
  deadlineDistribution: TimelineData[];
  clientActivity: {
    id: string;
    name: string;
    activity: number;
    lastActive: Date;
  }[];
  topProjects: {
    id: string;
    name: string;
    progress: number;
    deadline: Date;
  }[];
  totals: {
    activeClients: number;
    activeProjects: number;
    pendingInvoices: number;
    completedProjects: number;
    totalRevenue: number;
  };
}

interface AnalyticsOptions {
  days?: number;
  startDate?: Date;
  endDate?: Date;
  clientId?: string;
  projectStatus?: string[];
  invoiceStatus?: string[];
}

export const useAnalytics = (options: AnalyticsOptions = {}): AnalyticsData => {
  const { clients, projects, invoices } = useAppState();
  const now = new Date('2025-01-04T15:46:49-05:00');

  return useMemo(() => {
    const {
      days = 7,
      startDate = subDays(now, days - 1),
      endDate = now,
      clientId,
      projectStatus = ['in_progress', 'completed'],
      invoiceStatus = ['paid', 'pending'],
    } = options;

    // Filter data based on options
    const filteredClients = clients.filter(client => 
      !clientId || client.id === clientId
    );

    const filteredProjects = projects.filter(project => 
      (!clientId || project.clientId === clientId) &&
      (!projectStatus.length || projectStatus.includes(project.status))
    );

    const filteredInvoices = invoices.filter(invoice => 
      (!clientId || invoice.clientId === clientId) &&
      (!invoiceStatus.length || invoiceStatus.includes(invoice.status))
    );

    // Generate date range
    const dateRange = Array.from({ length: days }, (_, i) => 
      startOfDay(addDays(startDate, i))
    );

    // Client growth over time
    const clientGrowth = dateRange.map(date => ({
      date,
      value: filteredClients.filter(client => 
        new Date(client.createdAt) <= endOfDay(date)
      ).length
    }));

    // Project completion rate
    const projectCompletion = dateRange.map(date => ({
      date,
      value: filteredProjects.filter(project =>
        project.status === 'completed' &&
        new Date(project.completedAt) <= endOfDay(date)
      ).length
    }));

    // Revenue timeline
    const revenueTimeline = dateRange.map(date => ({
      date,
      value: filteredInvoices
        .filter(invoice => 
          invoice.status === 'paid' &&
          new Date(invoice.paidAt) <= endOfDay(date)
        )
        .reduce((sum, invoice) => sum + invoice.amount, 0)
    }));

    // Deadline distribution
    const deadlineDistribution = dateRange.map(date => ({
      date,
      value: filteredProjects.filter(project =>
        new Date(project.dueDate) <= endOfDay(date)
      ).length
    }));

    // Client activity
    const clientActivity = filteredClients
      .map(client => {
        const clientProjects = filteredProjects.filter(p => p.clientId === client.id);
        const lastProjectUpdate = Math.max(
          ...clientProjects.map(p => new Date(p.updatedAt).getTime())
        );
        const activityCount = clientProjects.length + 
          filteredInvoices.filter(i => i.clientId === client.id).length;

        return {
          id: client.id,
          name: client.name,
          activity: activityCount,
          lastActive: new Date(lastProjectUpdate)
        };
      })
      .sort((a, b) => b.activity - a.activity)
      .slice(0, 5);

    // Top projects
    const topProjects = filteredProjects
      .filter(p => p.status === 'in_progress')
      .map(project => ({
        id: project.id,
        name: project.name,
        progress: project.progress || 0,
        deadline: new Date(project.dueDate)
      }))
      .sort((a, b) => b.progress - a.progress)
      .slice(0, 5);

    // Calculate totals
    const totals = {
      activeClients: filteredClients.filter(c => c.status === 'active').length,
      activeProjects: filteredProjects.filter(p => p.status === 'in_progress').length,
      pendingInvoices: filteredInvoices
        .filter(i => i.status === 'pending')
        .reduce((sum, invoice) => sum + invoice.amount, 0),
      completedProjects: filteredProjects.filter(p => p.status === 'completed').length,
      totalRevenue: filteredInvoices
        .filter(i => i.status === 'paid')
        .reduce((sum, invoice) => sum + invoice.amount, 0),
    };

    return {
      clientGrowth,
      projectCompletion,
      revenueTimeline,
      deadlineDistribution,
      clientActivity,
      topProjects,
      totals,
    };
  }, [clients, projects, invoices, options]);
};
