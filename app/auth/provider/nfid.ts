// Dfinity
import { AuthConfig, AuthProvider } from '@/app/config';
import { Identity } from '@dfinity/agent';
import { AuthClient } from '@dfinity/auth-client';

import { log } from '../../util/log';

// NFID
const NFID_APPLICATION_NAME = 'ArcMindAi';
const NFID_APPLICATION_LOGO_URL = 'https%3A%2F%2Farcmindai.app%2Flogo.png';
const NFID_ORIGIN = process.env.NEXT_PUBLIC_NFID_ORIGIN;

const NFID_AUTH_PATH =
  '/authenticate/?applicationName=' +
  NFID_APPLICATION_NAME +
  '&applicationLogo=' +
  NFID_APPLICATION_LOGO_URL +
  '#authorize';

const NFID_AUTH_PROVIDER_URL = NFID_ORIGIN + NFID_AUTH_PATH;

export function createNFIDLogin(
  authClient: AuthClient,
  handleAuthenticated: any,
  authProvider: AuthProvider
) {
  return async () => {
    const isAuthenticated = await authClient.isAuthenticated();
    if (isAuthenticated) {
      const identity = await authClient.getIdentity();
      await handleAuthenticated(identity, authProvider);
      return;
    }

    const openerFeatures =
      `left=${window.screen.width / 2 - 525 / 2}, ` +
      `top=${window.screen.height / 2 - 705 / 2},` +
      `toolbar=0,location=0,menubar=0,width=525,height=705`;

    await authClient.login({
      maxTimeToLive: AuthConfig.MaxSessionDurationNanoSecs,
      windowOpenerFeatures: openerFeatures,
      onSuccess: async () => {
        const identity =
          (await authClient.getIdentity()) as unknown as Identity;
        await handleAuthenticated(identity, authProvider);
      },
      onError: async (error) => {
        log.error('Error caught in authClient.login', error);
        await handleAuthenticated(null, authProvider);
      },
      identityProvider: NFID_AUTH_PROVIDER_URL,
    });
  };
}

export async function checkIIUserAuth() {
  const authClient = await AuthClient.create({
    idleOptions: {
      disableIdle: true,
      disableDefaultIdleCallback: true,
    },
  });

  const isAuthenticated = await authClient.isAuthenticated();
  if (isAuthenticated) {
    const identity = await authClient.getIdentity();
    return identity;
  }

  return null;
}
