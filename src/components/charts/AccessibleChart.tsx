import React from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { format } from 'date-fns';
import { useTheme } from '../../contexts/ThemeContext';
import { motion } from 'framer-motion';

interface ChartData {
  date: Date;
  value: number;
}

interface AccessibleChartProps {
  data: ChartData[];
  type?: 'line' | 'area' | 'bar';
  color?: string;
  label: string;
  valuePrefix?: string;
  valueSuffix?: string;
  height?: number;
  showAxis?: boolean;
  animate?: boolean;
}

export const AccessibleChart: React.FC<AccessibleChartProps> = ({
  data,
  type = 'line',
  color = '#3B82F6',
  label,
  valuePrefix = '',
  valueSuffix = '',
  height = 300,
  showAxis = true,
  animate = true,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const chartData = data.map(item => ({
    date: format(new Date(item.date), 'MMM d'),
    value: item.value,
    originalDate: item.date,
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-3 rounded-lg shadow-lg ${
          isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        }`}>
          <p className="text-sm font-medium mb-1">{format(payload[0].payload.originalDate, 'MMM d, yyyy')}</p>
          <p className="text-sm text-blue-500">
            {valuePrefix}{payload[0].value.toLocaleString()}{valueSuffix}
          </p>
        </div>
      );
    }
    return null;
  };

  const ChartComponent = type === 'area' ? AreaChart : type === 'bar' ? BarChart : LineChart;
  const DataComponent = type === 'area' ? Area : type === 'bar' ? Bar : Line;

  const chartProps = {
    data: chartData,
    margin: { top: 10, right: 10, left: showAxis ? 40 : 0, bottom: showAxis ? 20 : 0 },
  };

  const dataProps = {
    type: "monotone",
    dataKey: "value",
    stroke: color,
    fill: type !== 'line' ? color : 'none',
    strokeWidth: 2,
    fillOpacity: type === 'area' ? 0.2 : 1,
    animationDuration: 1000,
  };

  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 20 } : false}
      animate={animate ? { opacity: 1, y: 0 } : false}
      transition={{ duration: 0.5 }}
      role="img"
      aria-label={label}
      className="w-full"
      style={{ height }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <ChartComponent {...chartProps}>
          {showAxis && (
            <>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={isDark ? '#374151' : '#E5E7EB'}
              />
              <XAxis
                dataKey="date"
                stroke={isDark ? '#9CA3AF' : '#6B7280'}
                fontSize={12}
              />
              <YAxis
                stroke={isDark ? '#9CA3AF' : '#6B7280'}
                fontSize={12}
                tickFormatter={(value) => `${valuePrefix}${value.toLocaleString()}${valueSuffix}`}
              />
            </>
          )}
          <Tooltip content={<CustomTooltip />} />
          <DataComponent {...dataProps} />
        </ChartComponent>
      </ResponsiveContainer>
    </motion.div>
  );
};
