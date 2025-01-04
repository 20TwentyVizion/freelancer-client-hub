import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, Users, Search, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { formatTimeAgo } from '../../utils/formatters';

interface QuickActionsProps {
  onAction: (action: string) => void;
  hasClients: boolean;
}

const mockActivities = [
  {
    id: 1,
    type: 'new_client',
    title: 'New client "Acme Corp" added',
    date: new Date('2025-01-04T14:28:17'),
    color: 'bg-green-500',
  },
  {
    id: 2,
    type: 'project_update',
    title: 'Project status updated for "Website Redesign"',
    date: new Date('2025-01-04T11:28:17'),
    color: 'bg-blue-500',
  },
  {
    id: 3,
    type: 'invoice_paid',
    title: 'Invoice paid by "Tech Solutions Inc"',
    date: new Date('2025-01-03T15:28:17'),
    color: 'bg-purple-500',
  },
];

export const QuickActions: React.FC<QuickActionsProps> = ({ onAction, hasClients }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Client Management
        </h2>
        <div className="relative">
          <motion.div
            initial={{ width: 200 }}
            whileFocus={{ width: 300 }}
            transition={{ duration: 0.3 }}
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search clients..."
              className={`pl-10 pr-4 py-2 rounded-lg border focus:ring-2 outline-none w-full
                ${isDark 
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20' 
                  : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/20'
                }`}
            />
          </motion.div>
          <Search className={`absolute left-3 top-2.5 h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onAction('new-client')}
          className="cursor-pointer rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-6 shadow-lg shadow-blue-500/10"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center space-x-4"
          >
            <div className="rounded-full bg-white/20 p-3">
              <UserPlus className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Add New Client</h3>
              <p className="text-blue-100">Create a new client profile</p>
            </div>
          </motion.div>
        </motion.div>

        <Link to="/clients">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`rounded-xl p-6 shadow-lg ${
              isDark 
                ? 'bg-gray-800 shadow-gray-900/10 border border-gray-700' 
                : 'bg-white shadow-gray-200/50 border border-gray-100'
            }`}
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center space-x-4"
            >
              <div className={`rounded-full p-3 ${isDark ? 'bg-blue-900/50' : 'bg-blue-50'}`}>
                <Users className={`h-6 w-6 ${isDark ? 'text-blue-400' : 'text-blue-500'}`} />
              </div>
              <div>
                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  View All Clients
                </h3>
                <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                  {hasClients
                    ? 'Manage your existing clients'
                    : 'No clients yet - add your first one!'}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </Link>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Recent Activity
          </h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-2 rounded-full ${
              isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
          >
            <Bell className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
          </motion.button>
        </div>
        
        <div className={`rounded-xl shadow-lg ${
          isDark ? 'bg-gray-800 shadow-gray-900/10' : 'bg-white shadow-gray-200/50'
        } p-6 space-y-4`}>
          <AnimatePresence>
            {hasClients ? (
              mockActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center justify-between py-3 ${
                    index !== mockActivities.length - 1 
                      ? `border-b ${isDark ? 'border-gray-700' : 'border-gray-100'}` 
                      : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`h-2 w-2 rounded-full ${activity.color}`} />
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {activity.title}
                    </p>
                  </div>
                  <span className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    {formatTimeAgo(activity.date)}
                  </span>
                </motion.div>
              ))
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-center py-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
              >
                No recent activity
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};