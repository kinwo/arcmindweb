import React, { useState } from 'react';

import { createNFIDLogin } from '@/app/auth/provider/nfid';
import { AuthProvider } from '@/app/config';
import { Button, Toast } from 'flowbite-react';
import { log } from '@/app/util/log';
import { useAuthClient } from './useAuthClient';
import { Identity } from '@dfinity/agent';

type Props = {
  triggerAuth?: (identity: Identity) => void;
};

export const SignIn = ({ triggerAuth }: Props) => {
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState('');
  const { authClient } = useAuthClient();

  const selectAuth = async (authProvider: AuthProvider) => {
    switch (authProvider) {
      case AuthProvider.NFID: {
        if (authClient == null) break;

        const authLogin = createNFIDLogin(
          authClient,
          handleAuthUpdate,
          authProvider
        );
        await authLogin();
        break;
      }
    }
  };

  const handleAuthUpdate = (identity: any, authProvider: AuthProvider) => {
    if (identity == null) {
      setMessage('We have a problem signing in. Please try again later.');
      setShowToast(true);
      return;
    }

    if (triggerAuth) triggerAuth(identity);
  };

  return (
    <div className="flex justify-center">
      <Button
        gradientDuoTone="purpleToBlue"
        className="text-xl w-[200px]"
        onClick={() => selectAuth(AuthProvider.NFID)}
      >
        Sign In
      </Button>
      {showToast && (
        <Toast>
          <div className="ml-3 text-sm font-normal">{message}</div>
        </Toast>
      )}
    </div>
  );
};
