import { Identity } from '@dfinity/agent';
import { checkIIUserAuth } from './provider/nfid';
import { AuthProvider } from '../config';

const { NFID } = AuthProvider;

export const checkUserAuth = async () => {
  let identity = await checkIIUserAuth();
  if (identity != null) {
    return identity;
  }

  return identity;
};

export const checkUserAuthPrincipalId = async (): Promise<string> => {
  let identity = await checkIIUserAuth();
  if (identity != null) {
    return identity?.getPrincipal()?.toString();
  }

  throw new Error('Cannot get principal id');
};

export const checkUserAuthProvider = async (): Promise<AuthProvider> => {
  let identity = await checkIIUserAuth();
  if (identity != null) {
    return NFID;
  }

  throw new Error('Cannot get auth provider');
};
