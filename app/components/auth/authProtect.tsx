import React from 'react';

import { useAuthClient } from './useAuthClient';
import { SignIn } from './SignIn';
import { log } from '@/app/util/log';

export const authProtect = (Component: any) => (props: any) => {
  return protect(Component)(props);
};

const protect = (Component: any) => {
  const AuthProtectedComponent = (props: any) => {
    const { isAuthenticated, identity, signout, triggerAuth } = useAuthClient();

    return isAuthenticated ? (
      <Component identity={identity} signout={signout} {...props} />
    ) : (
      <SignIn {...props} triggerAuth={triggerAuth} />
    );
  };

  AuthProtectedComponent.displayName = `AuthProtected(${
    Component.displayName || Component.name || 'Component'
  })`;

  return AuthProtectedComponent;
};
