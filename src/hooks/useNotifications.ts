import { useEffect } from 'react';
import { useSettings } from './useSettings';
import { EmailService } from '../services/emailService';

export function useNotifications() {
  const { settings } = useSettings();
  const emailService = EmailService.getInstance();

  useEffect(() => {
    emailService.setNotificationsEnabled(settings.emailNotifications);
  }, [settings.emailNotifications]);

  const sendNotification = async (to: string, subject: string, body: string) => {
    return emailService.sendNotification({ to, subject, body });
  };

  return { sendNotification };
}