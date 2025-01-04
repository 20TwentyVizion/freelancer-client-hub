import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, DollarSign, Calendar } from 'lucide-react';
import { useAnalytics } from '../../hooks/useAnalytics';
import { AccessibleChart } from '../charts/AccessibleChart';
import { useTheme } from '../../contexts/ThemeContext';
import { formatCurrency } from '../../utils/formatters';

export const AnalyticsDashboard: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const analytics = useAnalytics(7); // Get last 7 days of data

  const chartSections = [
    {
      title: 'Client Growth',
      description: 'Total number of clients over time',
      icon: <Users className="h-5 w-5 text-blue-500" />,
      data: analytics.clientGrowth,
      type: 'line' as const,
      color: '#3B82F6',
    },
    {
      title: 'Project Completion',
      description: 'Completed projects over time',
      icon: <TrendingUp className="h-5 w-5 text-green-500" />,
      data: analytics.projectCompletion,
      type: 'area' as const,
      color: '#10B981',
    },
    {
      title: 'Revenue',
      description: 'Total revenue from paid invoices',
      icon: <DollarSign className="h-5 w-5 text-purple-500" />,
      data: analytics.revenueTimeline,
      type: 'bar' as const,
      color: '#8B5CF6',
      valuePrefix: '$',
    },
    {
      title: 'Upcoming Deadlines',
      description: 'Project deadlines distribution',
      icon: <Calendar className="h-5 w-5 text-red-500" />,
      data: analytics.deadlineDistribution,
      type: 'line' as const,
      color: '#EF4444',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {chartSections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`p-6 rounded-xl ${
              isDark 
                ? 'bg-gray-800 shadow-lg shadow-gray-900/10' 
                : 'bg-white shadow-lg shadow-gray-200/50'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {section.title}
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {section.description}
                </p>
              </div>
              <div className={`p-2 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                {section.icon}
              </div>
            </div>
            <AccessibleChart
              data={section.data}
              type={section.type}
              color={section.color}
              label={section.title}
              valuePrefix={section.valuePrefix}
              height={200}
              animate={false}
            />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Most Active Clients */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className={`p-6 rounded-xl ${
            isDark 
              ? 'bg-gray-800 shadow-lg shadow-gray-900/10' 
              : 'bg-white shadow-lg shadow-gray-200/50'
          }`}
        >
          <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Most Active Clients
          </h3>
          <div className="space-y-4">
            {analytics.clientActivity.map((client, index) => (
              <div
                key={client.id}
                className={`flex items-center justify-between ${
                  index !== analytics.clientActivity.length - 1 
                    ? `pb-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-100'}` 
                    : ''
                }`}
              >
                <div>
                  <p className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                    {client.name}
                  </p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {client.activity} activities
                  </p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm ${
                  isDark ? 'bg-blue-900/50 text-blue-400' : 'bg-blue-100 text-blue-600'
                }`}>
                  {formatTimeAgo(client.lastActive)}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className={`p-6 rounded-xl ${
            isDark 
              ? 'bg-gray-800 shadow-lg shadow-gray-900/10' 
              : 'bg-white shadow-lg shadow-gray-200/50'
          }`}
        >
          <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Top Projects
          </h3>
          <div className="space-y-4">
            {analytics.topProjects.map((project, index) => (
              <div
                key={project.id}
                className={`space-y-2 ${
                  index !== analytics.topProjects.length - 1 
                    ? `pb-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-100'}` 
                    : ''
                }`}
              >
                <div className="flex justify-between">
                  <p className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                    {project.name}
                  </p>
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                    {project.progress}%
                  </span>
                </div>
                <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
                  />
                </div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Due {formatTimeAgo(project.deadline)}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
