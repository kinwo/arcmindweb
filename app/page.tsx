'use client';

import { ChangeEvent, FormEvent, useCallback, useId, useState } from 'react';

import { actor } from './canister/arcmindai';
import { useChatHistory } from './useChatHistory';
import { CenterSpinner } from './components/Spinner';

import './page.css';
import { AlertMessage } from './components/Alert';

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
        setInput('');
        await actor.insert_goal(input);
      } catch (err) {
        console.error('Error in submitting goal', err as Error);
      }
    },
    [input]
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <main className="main">
      <h1 className="title">ArcMind AI (alpha v0.1)</h1>
      {isLoading && <CenterSpinner aria-label="Loading chat..." />}
      {isError && (
        <AlertMessage message="We have a problem loading your chat" />
      )}

      <section className="chat-container">
        {messages?.map((m, index) => {
          const isUser = 'User' in m.role;
          const fromName: string = isUser ? 'User: ' : 'ArcMind: ';
          return (
            <div
              className={isUser ? 'message-user' : 'message-arcmind'}
              key={index}
            >
              {fromName}
              {m.content}
            </div>
          );
        })}
      </section>
      <form onSubmit={submitGoal}>
        <div className="question-container">
          <input
            className="question"
            value={input}
            onChange={handleInputChange}
            placeholder="Say something..."
          />
          <button className="send-btn" type="submit">
            Send
          </button>
        </div>
      </form>
    </main>
  );
}
