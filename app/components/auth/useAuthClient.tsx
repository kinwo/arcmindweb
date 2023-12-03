import { AuthClient } from '@dfinity/auth-client';
import { useCallback, useEffect, useState } from 'react';

export const useAuthClient = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authClient, setAuthClient] = useState<AuthClient | null>(null);

  const createAuthClient = useCallback(async () => {
    const authClient = await AuthClient.create({
      idleOptions: {
        disableIdle: true,
        disableDefaultIdleCallback: true,
      },
    });

    setAuthClient(authClient);
  }, []);

  const signout = useCallback(async () => {
    if (authClient) {
      await authClient.logout();
      setIsAuthenticated(false);
    }
  }, [authClient]);

  useEffect(() => {
    createAuthClient();
  }, [createAuthClient]);

  return { authClient, isAuthenticated, signout };
};
