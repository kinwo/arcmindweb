import React, { useContext, useEffect } from 'react';

import { AuthClientHook, useAuthClient } from './useAuthClient';
import { SignIn } from './SignIn';
import { log } from '@/app/util/log';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const authProtect = (Component: any) => (props: any) => {
  return protect(Component)(props);
};

const protect = (Component: any) => {
  const AuthProtectedComponent = (props: any) => {
    const { isAuthenticated, identity, signout, triggerAuthCheck } =
      useContext(AuthContext);

    const initUpdate = 0;

    useEffect(() => {
      triggerAuthCheck();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initUpdate]);

    if (!isAuthenticated) {
      return <></>;
    }

    return <Component identity={identity} signout={signout} {...props} />;
  };

  AuthProtectedComponent.displayName = `AuthProtected(${
    Component.displayName || Component.name || 'Component'
  })`;

  return AuthProtectedComponent;
};
