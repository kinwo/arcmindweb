'use client'

import React, { ChangeEvent, FormEvent, useCallback, useId, useState } from 'react'

import { createControllerActor } from '../canister/arcmindai'
import { useChatHistory } from '../components/chat/useChatHistory'
import { CenterSpinner } from '../components/Spinner'

import './ChatScreen.css'
import { AlertMessage } from '../components/Alert'
import { log } from '../util/log'
import { useParams } from 'react-router-dom'
import { useInternetIdentity } from '../components/auth/InternetIdentity'

const initialInput = ''

const ChatScreen = () => {
  const { identity } = useInternetIdentity()

  log.info('ChatScreen', { identity: identity?.getPrincipal().toString() })

  // Generate a unique id for the chat if not provided.
  const hookId = useId()
  const chatId = hookId

  const { controllerId } = useParams()

  const myControllerId = controllerId || ''

  const { messages, isLoading, isError } = useChatHistory(chatId, identity, myControllerId)
  const [input, setInput] = useState<string>(initialInput)

  const submitGoal = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!input || !identity) return

      try {
        setInput('')
        await createControllerActor(identity, myControllerId).start_new_goal(input)
      } catch (err) {
        log.error('Error in submitting goal', err as Error)
      }
    },
    [input, identity, myControllerId]
  )

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const togglePauseCOF = async () => {
    if (!identity) return

    try {
      const result = await createControllerActor(identity, myControllerId).toggle_pause_cof()
      log.info('Pause Chain of thoughts', { result })
    } catch (err) {
      log.error('Error in pausing Chain of thoughts', err as Error)
    }
  }

  const clearAllGoals = async () => {
    if (!identity) return

    try {
      await createControllerActor(identity, myControllerId).clear_all_goals()
    } catch (err) {
      log.error('Error in clearing all goals', err as Error)
    }
  }

  return (
    <>
      <div className='header'>
        <button className='new-btn ml-2 hidden md:block' onClick={togglePauseCOF}>
          Pause / Unpause
        </button>
        <button className='new-btn' onClick={clearAllGoals}>
          Clear
        </button>
      </div>
      {isLoading && <CenterSpinner aria-label='Loading chat...' />}
      {isError && <AlertMessage message='We have a problem loading your chat' />}

      <section className='chat-container'>
        {messages?.map((m, index) => {
          const isUser = 'User' in m.role
          const isSystem = 'System' in m.role
          const fromName: string = isUser ? 'User: ' : isSystem ? 'System: ' : 'ArcMind: '
          return (
            <div className={isUser ? 'message-user' : 'message-arcmind'} key={index}>
              {fromName}
              {m.content}
            </div>
          )
        })}
      </section>
      <form onSubmit={submitGoal}>
        <div className='question-parant'>
          <div className='question-container'>
            <input className='question' value={input} onChange={handleInputChange} placeholder='Say something...' />
            <button className='send-btn' type='submit'>
              Send
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default ChatScreen
