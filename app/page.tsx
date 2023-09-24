'use client';

import { ChangeEvent, FormEvent, useCallback, useId, useState } from 'react';

import { actor } from './canister/arcmindai';
import { useChatHistory } from './useChatHistory';

import { ChatRole } from '@/declarations/arcmindai_controller/arcmindai_controller.did';

const initialInput = 'My name is Henry Chan. What is my first name?';

export default function Chat() {
  // Generate a unique id for the chat if not provided.
  const hookId = useId();
  const chatId = hookId;

  const { messages, mutate, isLoading, isError } = useChatHistory(chatId);
  const [input, setInput] = useState<string>(initialInput);

  const submitGoal = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!input) return;

      try {
        const updatedMessages = [
          ...messages,
          { role: { User: null }, content: input },
        ];

        mutate(updatedMessages, false);
        setInput('');
        await actor.insert_goal(input);
      } catch (err) {
        console.error('Error in submitting goal', err as Error);
      }
    },
    [input, mutate, messages]
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <main className="mx-auto w-full h-screen max-w-[800px] p-24 flex flex-col">
      <section className="mb-auto m">
        {messages?.map((m, index) => (
          <div className="mb-4" key={index}>
            {'User' in m.role ? 'User: ' : 'ArcMind: '}
            {m.content}
          </div>
        ))}
      </section>
      <form className="flex space-x-4" onSubmit={submitGoal}>
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
