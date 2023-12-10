import { Identity } from '@dfinity/agent';
import { checkIIUserAuth } from './provider/nfid';

export const checkUserAuth = async (): Promise<Identity | null> => {
  return await checkIIUserAuth();
};
