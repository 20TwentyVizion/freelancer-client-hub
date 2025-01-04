import React from 'react';
import { motion } from 'framer-motion';
import { Users, Briefcase, DollarSign, Calendar } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { useTheme } from '../../contexts/ThemeContext';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend: number;
  color: string;
  data: { value: number }[];
  delay: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, color, data, delay }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

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
            <LineChart data={data}>
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
  // Mock data for the charts - in a real app, this would come from your data source
  const mockChartData = (baseline: number) => 
    Array.from({ length: 7 }, (_, i) => ({
      value: baseline + Math.floor(Math.random() * 5)
    }));

  const stats = [
    {
      title: 'Active Clients',
      value: activeClients,
      icon: <Users className="h-6 w-6 text-blue-600" />,
      trend: 12,
      color: 'bg-blue-100 dark:bg-blue-900/50',
      data: mockChartData(activeClients),
    },
    {
      title: 'Active Projects',
      value: activeProjects,
      icon: <Briefcase className="h-6 w-6 text-purple-600" />,
      trend: 8,
      color: 'bg-purple-100 dark:bg-purple-900/50',
      data: mockChartData(activeProjects),
    },
    {
      title: 'Pending Invoices',
      value: formatCurrency(pendingInvoices),
      icon: <DollarSign className="h-6 w-6 text-green-600" />,
      trend: -5,
      color: 'bg-green-100 dark:bg-green-900/50',
      data: mockChartData(pendingInvoices / 1000),
    },
    {
      title: 'Upcoming Deadlines',
      value: upcomingDeadlines,
      icon: <Calendar className="h-6 w-6 text-red-600" />,
      trend: 0,
      color: 'bg-red-100 dark:bg-red-900/50',
      data: mockChartData(upcomingDeadlines),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard
          key={stat.title}
          {...stat}
          delay={index * 0.1}
        />
      ))}
    </div>
  );
};