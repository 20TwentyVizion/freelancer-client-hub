import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { ClientProfile } from './components/clients/ClientProfile';
import { ActiveClientsList } from './components/clients/ActiveClientsList';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'clients',
        element: <ActiveClientsList />,
      },
      {
        path: 'clients/:clientId',
        element: <ClientProfile />,
      },
    ],
  },
]);
