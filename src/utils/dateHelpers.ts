import { formatDistanceToNow as formatDistance } from 'date-fns';

export const isValidDate = (date: any): boolean => {
  if (!date) return false;
  const d = new Date(date);
  return d instanceof Date && !isNaN(d.getTime());
};

export const formatDistanceToNow = (date: Date | string | undefined): string => {
  if (!date || !isValidDate(date)) return 'No date set';
  return formatDistance(new Date(date), { addSuffix: true });
};

export const formatDate = (date: Date | string | undefined): string => {
  if (!date || !isValidDate(date)) return 'No date set';
  return new Date(date).toLocaleDateString();
};