import useSWR, { Key, KeyedMutator } from 'swr';
import { actor } from './canister/arcmindai';
import { ChatHistory } from '@/declarations/arcmindai_controller/arcmindai_controller.did';
import { SWRKey } from './config';
import { log } from './util/log';

const AutoRefreshSecs = 2;

const fetcher = async (id: string): Promise<ChatHistory[]> => {
  try {
    const messages = await actor.get_chathistory();
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

export const useChatHistory = (id: string): Response => {
  const { data, error, isLoading, mutate } = useSWR(
    `${SWRKey.Chat}${id}`,
    fetcher,
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
