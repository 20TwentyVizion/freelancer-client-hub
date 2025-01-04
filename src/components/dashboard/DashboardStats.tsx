import React from 'react';
import { motion } from 'framer-motion';
import { Users, Briefcase, DollarSign, Calendar } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { useTheme } from '../../contexts/ThemeContext';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';
import { useAnalytics } from '../../hooks/useAnalytics';
import { format } from 'date-fns';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend: number;
  color: string;
  data: { date: Date; value: number }[];
  delay: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, color, data, delay }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const chartData = data.map(item => ({
    value: item.value,
    date: format(new Date(item.date), 'MMM d')
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02 }}
      className={`p-6 rounded-xl ${
        isDark 
          ? 'bg-gray-800 shadow-lg shadow-gray-900/10' 
          : 'bg-white shadow-lg shadow-gray-200/50'
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          {icon}
        </div>
        <div className="h-16 w-24">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <Line
                type="monotone"
                dataKey="value"
                stroke={isDark ? '#fff' : '#000'}
                strokeWidth={2}
                dot={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? '#1f2937' : '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
                labelStyle={{ color: isDark ? '#fff' : '#000' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <h3 className={`text-lg font-medium mb-1 ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
        {title}
      </h3>
      
      <div className="flex items-center justify-between">
        <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {value}
        </span>
        <div
          className={`flex items-center text-sm ${
            trend > 0 
              ? 'text-green-500' 
              : trend < 0 
                ? 'text-red-500' 
                : isDark ? 'text-gray-400' : 'text-gray-500'
          }`}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: delay + 0.2 }}
          >
            {trend > 0 ? '↑' : trend < 0 ? '↓' : '−'}
            {Math.abs(trend)}%
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
};

interface DashboardStatsProps {
  activeClients: number;
  activeProjects: number;
  pendingInvoices: number;
  upcomingDeadlines: number;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({
  activeClients,
  activeProjects,
  pendingInvoices,
  upcomingDeadlines,
}) => {
  const analytics = useAnalytics(7);
  const now = new Date('2025-01-04T15:46:49-05:00');

  // Calculate trends
  const calculateTrend = (data: { date: Date; value: number }[]) => {
    if (data.length < 2) return 0;
    const current = data[data.length - 1].value;
    const previous = data[0].value;
    if (previous === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - previous) / previous) * 100);
  };

  const stats = [
    {
      title: 'Active Clients',
      value: activeClients,
      icon: <Users className="h-6 w-6 text-blue-600" />,
      trend: calculateTrend(analytics.clientGrowth),
      color: 'bg-blue-100 dark:bg-blue-900/50',
      data: analytics.clientGrowth,
    },
    {
      title: 'Active Projects',
      value: activeProjects,
      icon: <Briefcase className="h-6 w-6 text-purple-600" />,
      trend: calculateTrend(analytics.projectCompletion),
      color: 'bg-purple-100 dark:bg-purple-900/50',
      data: analytics.projectCompletion,
    },
    {
      title: 'Pending Invoices',
      value: formatCurrency(pendingInvoices),
      icon: <DollarSign className="h-6 w-6 text-green-600" />,
      trend: calculateTrend(analytics.revenueTimeline),
      color: 'bg-green-100 dark:bg-green-900/50',
      data: analytics.revenueTimeline,
    },
    {
      title: 'Upcoming Deadlines',
      value: upcomingDeadlines,
      icon: <Calendar className="h-6 w-6 text-red-600" />,
      trend: calculateTrend(analytics.deadlineDistribution),
      color: 'bg-red-100 dark:bg-red-900/50',
      data: analytics.deadlineDistribution,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {format(now, 'EEEE, MMMM d, yyyy h:mm a')}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard
            key={stat.title}
            {...stat}
            delay={index * 0.1}
          />
        ))}
      </div>
    </div>
  );
};