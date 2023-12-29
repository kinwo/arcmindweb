import useSWR, { Key, KeyedMutator } from 'swr';
import { createControllerActor } from '../../canister/arcmindai';
import { ChatHistory } from '@/declarations/arcmindai_controller/arcmindai_controller.did';
import { SWRKey } from '../../config';
import { log } from '../../util/log';
import { checkUserAuth } from '@/app/auth/checkUserAuth';
import { Identity } from '@dfinity/agent';

const AutoRefreshSecs = 2;

const fetcher =
  (identity: Identity, controllerId: string) =>
  async (id: string): Promise<ChatHistory[]> => {
    try {
      const messages = await createControllerActor(
        identity,
        controllerId
      ).get_chathistory();
      return messages;
    } catch (err) {
      log.error('Error in submitting goal', err as Error);
      return [];
    }
  };

type Response = {
  messages: ChatHistory[];
  mutate: KeyedMutator<ChatHistory[]>;
  isLoading: boolean;
  isError: boolean;
};

export const useChatHistory = (
  id: string,
  identity: Identity,
  controllerId: string
): Response => {
  const { data, error, isLoading, mutate } = useSWR(
    `${SWRKey.Chat}${id}`,
    fetcher(identity, controllerId),
    {
      refreshInterval: 1000 * AutoRefreshSecs,
    }
  );

  return {
    messages: data || [],
    mutate,
    isLoading,
    isError: error,
  };
};
