interface EmailConfig {
  to: string;
  subject: string;
  body: string;
}

export class EmailService {
  private static instance: EmailService;
  private notificationsEnabled: boolean = false;

  private constructor() {}

  static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  setNotificationsEnabled(enabled: boolean) {
    this.notificationsEnabled = enabled;
  }

  async sendNotification({ to, subject, body }: EmailConfig): Promise<boolean> {
    if (!this.notificationsEnabled) {
      console.log('Email notifications are disabled');
      return false;
    }

    // In a real application, this would integrate with an email service
    console.log('Sending email notification:', { to, subject, body });
    return true;
  }
}