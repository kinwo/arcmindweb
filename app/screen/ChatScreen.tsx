'use client';

import { ChangeEvent, FormEvent, useCallback, useId, useState } from 'react';

import { actor } from '../canister/arcmindai';
import { useChatHistory } from '../useChatHistory';
import { CenterSpinner } from '../components/Spinner';

import './ChatScreen.css';
import { AlertMessage } from '../components/Alert';
import { log } from '../util/log';

const initialInput = 'What is the current weather in Gold Coast?';

export const ChatScreen = () => {
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
        await actor.start_new_goal(input);
      } catch (err) {
        log.error('Error in submitting goal', err as Error);
      }
    },
    [input]
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const togglePauseCOF = async () => {
    try {
      const result = await actor.toggle_pause_cof();
      log.info('Pause Chain of thoughts', { result });
    } catch (err) {
      log.error('Error in pausing Chain of thoughts', err as Error);
    }
  };

  const clearAllGoals = async () => {
    try {
      await actor.clear_all_goals();
    } catch (err) {
      log.error('Error in clearing all goals', err as Error);
    }
  };

  return (
    <>
      <div className="header">
        <h1 className="title inline">ArcMind AI</h1>
        <button
          className="new-btn ml-2 hidden md:block"
          onClick={togglePauseCOF}
        >
          Pause / Unpause
        </button>
        <button className="new-btn" onClick={clearAllGoals}>
          Clear
        </button>
      </div>
      <h1 className="subtitle">alpha v0.2</h1>
      {isLoading && <CenterSpinner aria-label="Loading chat..." />}
      {isError && (
        <AlertMessage message="We have a problem loading your chat" />
      )}

      <section className="chat-container">
        {messages?.map((m, index) => {
          const isUser = 'User' in m.role;
          const isSystem = 'System' in m.role;
          const fromName: string = isUser
            ? 'User: '
            : isSystem
            ? 'System: '
            : 'ArcMind: ';
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
        <div className="question-parant">
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
        </div>
      </form>
    </>
  );
};
