import { Identity } from '@dfinity/agent';
import { AuthClient } from '@dfinity/auth-client';
import { useCallback, useEffect, useState } from 'react';

export const useAuthClient = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authClient, setAuthClient] = useState<AuthClient | null>(null);
  const [identity, setIdentity] = useState<Identity | null>(null);
  const [numUpdates, setNumUpdates] = useState(0);

  const createAuthClient = useCallback(async () => {
    const authClient = await AuthClient.create({
      idleOptions: {
        disableIdle: true,
        disableDefaultIdleCallback: true,
      },
    });

    setAuthClient(authClient);

    const isAuthenticated = await authClient.isAuthenticated();
    if (isAuthenticated) {
      const identity = await authClient.getIdentity();
      setIdentity(identity);
    } else {
      setIdentity(null);
    }

    setIsAuthenticated(isAuthenticated);
  }, []);

  const signout = useCallback(async () => {
    if (authClient) {
      await authClient.logout();
      setIsAuthenticated(false);
    }
  }, [authClient]);

  useEffect(() => {
    createAuthClient();
  }, [createAuthClient, numUpdates]);

  const triggerAuth = () => {
    setNumUpdates(numUpdates + 1);
  };

  return { authClient, identity, isAuthenticated, signout, triggerAuth };
};
