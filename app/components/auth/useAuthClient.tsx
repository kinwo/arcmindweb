import { Identity } from '@dfinity/agent';
import { AuthClient } from '@dfinity/auth-client';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export type AuthClientHook = {
  authClient: AuthClient | null;
  identity: Identity | null;
  isAuthenticated: boolean;
  signout: () => void;
  triggerAuth: () => void;
  triggerAuthCheck: () => void;
};

export const useAuthClient = (): AuthClientHook => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authClient, setAuthClient] = useState<AuthClient | null>(null);
  const [identity, setIdentity] = useState<Identity | null>(null);
  const [numUpdates, setNumUpdates] = useState(0);
  const [numAuthCheckUpdates, setNumAuthCheckUpdates] = useState(0);

  const navigae = useNavigate();

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

  const checkAuth = useCallback(async () => {
    if (!authClient) return;

    const isAuthenticated = await authClient.isAuthenticated();
    if (isAuthenticated) {
      const identity = await authClient.getIdentity();
      setIdentity(identity);
    } else {
      setIdentity(null);
    }

    setIsAuthenticated(isAuthenticated);
  }, [authClient]);

  const signout = useCallback(async () => {
    if (authClient) {
      await authClient.logout();
      setIsAuthenticated(false);
      navigae('/');
    }
  }, [authClient, navigae]);

  useEffect(() => {
    createAuthClient();
  }, [createAuthClient, numUpdates]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth, numAuthCheckUpdates]);

  const triggerAuth = () => {
    setNumUpdates(numUpdates + 1);
  };

  const triggerAuthCheck = () => {
    setNumAuthCheckUpdates(numAuthCheckUpdates + 1);
  };

  return {
    authClient,
    identity,
    isAuthenticated,
    signout,
    triggerAuth,
    triggerAuthCheck,
  };
};
