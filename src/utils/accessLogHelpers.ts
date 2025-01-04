import type { AccessLog } from '../types';

export const formatUserAgent = (userAgent: string): string => {
  const ua = new UAParser(userAgent);
  return `${ua.browser.name} ${ua.browser.version} on ${ua.os.name}`;
};

export const calculateDuration = (startTime: Date, endTime?: Date): number | null => {
  if (!endTime) return null;
  return Math.round((endTime.getTime() - startTime.getTime()) / 60000);
};