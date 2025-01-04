import { useMemo } from 'react';
import { addDays, startOfDay, endOfDay, isWithinInterval } from 'date-fns';
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
}

export const useAnalytics = (days = 7): AnalyticsData => {
  const { clients, projects, invoices } = useAppState();
  const now = new Date('2025-01-04T15:39:05-05:00'); // Using provided timestamp

  return useMemo(() => {
    // Generate date range
    const dateRange = Array.from({ length: days }, (_, i) => 
      startOfDay(addDays(now, -i))
    ).reverse();

    // Client growth over time
    const clientGrowth = dateRange.map(date => ({
      date,
      value: clients.filter(client => 
        new Date(client.createdAt) <= endOfDay(date)
      ).length
    }));

    // Project completion rate
    const projectCompletion = dateRange.map(date => ({
      date,
      value: projects.filter(project =>
        project.status === 'completed' &&
        new Date(project.completedAt) <= endOfDay(date)
      ).length
    }));

    // Revenue timeline
    const revenueTimeline = dateRange.map(date => ({
      date,
      value: invoices
        .filter(invoice => 
          invoice.status === 'paid' &&
          new Date(invoice.paidAt) <= endOfDay(date)
        )
        .reduce((sum, invoice) => sum + invoice.amount, 0)
    }));

    // Deadline distribution
    const deadlineDistribution = dateRange.map(date => ({
      date,
      value: projects.filter(project =>
        new Date(project.dueDate) <= endOfDay(date)
      ).length
    }));

    // Client activity
    const clientActivity = clients
      .map(client => {
        const clientProjects = projects.filter(p => p.clientId === client.id);
        const lastProjectUpdate = Math.max(
          ...clientProjects.map(p => new Date(p.updatedAt).getTime())
        );
        const activityCount = clientProjects.length + 
          invoices.filter(i => i.clientId === client.id).length;

        return {
          id: client.id,
          name: client.name,
          activity: activityCount,
          lastActive: new Date(lastProjectUpdate)
        };
      })
      .sort((a, b) => b.activity - a.activity)
      .slice(0, 5);

    // Top projects by progress
    const topProjects = projects
      .filter(p => p.status === 'in_progress')
      .map(project => ({
        id: project.id,
        name: project.name,
        progress: project.progress || 0,
        deadline: new Date(project.dueDate)
      }))
      .sort((a, b) => b.progress - a.progress)
      .slice(0, 5);

    return {
      clientGrowth,
      projectCompletion,
      revenueTimeline,
      deadlineDistribution,
      clientActivity,
      topProjects
    };
  }, [clients, projects, invoices]);
};
