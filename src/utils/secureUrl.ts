import { customAlphabet } from 'nanoid';

// Generate URL-safe random strings
const generateSecureId = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 32);

export const generateClientUrl = (clientId: string): string => {
  const secureToken = generateSecureId();
  return `${clientId}-${secureToken}`;
};

export const validateClientUrl = (url: string): boolean => {
  const [clientId, token] = url.split('-');
  return clientId && token && token.length === 32;
};