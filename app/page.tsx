'use client';

import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';

import useSWR from 'swr';
import { CreateMessage, Message } from './types';
import { actor } from './canister/arcmindai';
import { randomId } from './util/random';

const initialInput = 'My name is Henry Chan. What is my first name?';

export default function Chat() {
  // Generate a unique id for the chat if not provided.
  const hookId = useId();
  const chatId = hookId;

  // Store the chat state in SWR, using the chatId as the key to share states.
  const { data: messages, mutate } = useSWR<Message[]>([chatId], null, {
    fallbackData: [],
  });

  // We store loading state in another hook to sync loading states across hook invocations
  const { data: isLoading = false, mutate: mutateLoading } = useSWR<boolean>(
    [chatId, 'loading'],
    null
  );

  // Keep the latest messages in a ref.
  const messagesRef = useRef<Message[]>(messages || []);

  useEffect(() => {
    messagesRef.current = messages || [];
  }, [messages]);

  // Actual mutation hook to send messages to the API endpoint and update the chat state.
  const [error, setError] = useState<undefined | Error>();
  const [input, setInput] = useState<string>(initialInput);

  const triggerRequest = useCallback(
    async (message: Message) => {
      // Do an optimistic update to the chat state to show the updated messages immediately.
      mutate([message], false);
      const previousMessages = messagesRef.current;
      messagesRef.current = [...previousMessages, message];

      mutateLoading(true);

      try {
        const result = await actor.ask(message.content);
        const resultMsg: Message = {
          id: randomId(),
          role: 'system',
          content: result,
          createdAt: new Date(),
        };

        const merged = [...messagesRef.current, resultMsg];
        mutate(merged);
      } catch (err) {
        // Restore the previous messages if the request fails.
        mutate(previousMessages, false);

        setError(err as Error);
      } finally {
        mutateLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mutate, mutateLoading, messagesRef.current]
  );

  const append = useCallback(
    async (message: Message | CreateMessage) => {
      if (!message.id) {
        message.id = randomId();
      }

      messagesRef.current.concat(message as Message);

      return triggerRequest(message as Message);
    },
    [triggerRequest]
  );

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!input) return;

      append({
        content: input,
        role: 'user',
        createdAt: new Date(),
      });
      setInput('');
    },
    [input, append]
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <main className="mx-auto w-full h-screen max-w-[800px] p-24 flex flex-col">
      <section className="mb-auto m">
        {messages?.map((m) => (
          <div className="mb-4" key={m.id}>
            {m.role === 'user' ? 'User: ' : 'ArcMind: '}
            {m.content}
          </div>
        ))}
      </section>
      <form className="flex space-x-4" onSubmit={handleSubmit}>
        <input
          className="rounded-md p-2 text-black w-[740px]"
          value={input}
          onChange={handleInputChange}
          placeholder="Say something..."
        />
        <button
          className="border-solid border-2 border-white p-2 rounded-md"
          type="submit"
        >
          Send
        </button>
      </form>
    </main>
  );
}
