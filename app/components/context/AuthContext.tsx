import React, { createContext } from 'react';
import { AuthClientHook } from '../auth/useAuthClient';

export const AuthContext = createContext<AuthClientHook>({
  authClient: null,
  identity: null,
  isAuthenticated: false,
  signout: function (): void {
    throw new Error('Function not implemented.');
  },
  triggerAuth: function (): void {
    throw new Error('Function not implemented.');
  },
  triggerAuthCheck: function (): void {
    throw new Error('Function not implemented.');
  },
});
