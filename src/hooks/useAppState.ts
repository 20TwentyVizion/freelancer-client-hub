import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { Client, Project, Invoice, AccessLog, Notification } from '../types';
import { nanoid } from 'nanoid';

export function useAppState() {
  const [clients, setClients] = useLocalStorage<Client[]>('clients', []);
  const [projects, setProjects] = useLocalStorage<Project[]>('projects', []);
  const [invoices, setInvoices] = useLocalStorage<Invoice[]>('invoices', []);
  const [accessLogs, setAccessLogs] = useLocalStorage<AccessLog[]>('accessLogs', []);
  const [notifications, setNotifications] = useLocalStorage<Notification[]>('notifications', []);

  const addClient = useCallback(async (client: Omit<Client, 'id' | 'createdAt'>) => {
    const newClient = {
      ...client,
      id: nanoid(),
      createdAt: new Date(),
    };
    setClients(prev => [...prev, newClient]);
    return newClient;
  }, [setClients]);

  const addProject = useCallback(async (project: Omit<Project, 'id' | 'createdAt'>) => {
    const newProject = {
      ...project,
      id: nanoid(),
      createdAt: new Date(),
    };
    setProjects(prev => [...prev, newProject]);
    return newProject;
  }, [setProjects]);

  const addInvoice = useCallback(async (invoice: Omit<Invoice, 'id'>) => {
    const newInvoice = {
      ...invoice,
      id: nanoid(),
    };
    setInvoices(prev => [...prev, newInvoice]);
    return newInvoice;
  }, [setInvoices]);

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'read' | 'createdAt'>) => {
    const newNotification = {
      ...notification,
      id: nanoid(),
      read: false,
      createdAt: new Date(),
    };
    setNotifications(prev => [...prev, newNotification]);
    return newNotification;
  }, [setNotifications]);

  const markNotificationAsRead = useCallback((id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  }, [setNotifications]);

  const exportAllData = useCallback(() => {
    return {
      version: '1.0',
      exportDate: new Date().toISOString(),
      clients,
      projects,
      invoices,
      accessLogs,
    };
  }, [clients, projects, invoices, accessLogs]);

  const importData = useCallback(async (data: any) => {
    if (data.version !== '1.0') {
      throw new Error('Unsupported data format version');
    }
    setClients(data.clients || []);
    setProjects(data.projects || []);
    setInvoices(data.invoices || []);
    setAccessLogs(data.accessLogs || []);
  }, [setClients, setProjects, setInvoices, setAccessLogs]);

  return {
    clients,
    projects,
    invoices,
    notifications,
    addClient,
    addProject,
    addInvoice,
    addNotification,
    markNotificationAsRead,
    exportAllData,
    importData,
  };
}