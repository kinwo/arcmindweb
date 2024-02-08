'use client'

import React, { ChangeEvent, FormEvent, useCallback, useId, useState } from 'react'

import classNames from 'classnames'

import _, { isArray } from 'lodash'

import { createControllerActor } from '../canister/arcmindai'
import { useChatHistory } from '../components/chat/useChatHistory'
import { CenterSpinner } from '../components/Spinner'

import { AlertMessage } from '../components/Alert'
import { log } from '../util/log'
import { useParams } from 'react-router-dom'
import { useInternetIdentity } from '../components/auth/InternetIdentity'
import { AuthButton } from '../components/auth/AuthButton'
import { isJSON } from '../util/jsonutils'
import { GenericContentProps, SearchResult, SearchResultContentProps, ThoughtContentProps } from './types'

import style from './ChatScreen.module.css'
import { Accordion, List } from 'flowbite-react'
import Link from 'next/link'

const initialInput = ''

const ThoughtContent = ({ thoughts, command, fromName }: ThoughtContentProps) => {
  const plans = thoughts.plan.split('- ').filter(plan => !_.isEmpty(plan.trim()))
  const argKeys: string[] = Object.keys(command.args)

  return (
    <div className={style.message}>
      <div className='text-amorange'>{fromName}</div>
      <div className='py-2'>{thoughts.speak}</div>

      <Accordion>
        <Accordion.Panel>
          <Accordion.Title>Thoughts</Accordion.Title>
          <Accordion.Content>
            <div className='flex flex-col gap-y-3'>
              <div className={classNames(style['thought-title'], 'text-amorange')}>Thoughts</div>
              <div>{thoughts.text}</div>
              <div className={classNames(style['thought-title'], 'text-amyellow')}>Plan</div>
              <List>
                {plans.map((plan, index) => {
                  return (
                    <div className={style.message} key={index}>
                      <List.Item key={index}>{plan}</List.Item>
                    </div>
                  )
                })}
              </List>
              <div className={classNames(style['thought-title'], 'text-amgreen')}>Reasoning</div>
              <div>{thoughts.reasoning}</div>
              <div className={classNames(style['thought-title'], 'text-amblue')}>Criticism</div>
              <div>{thoughts.criticism}</div>
              <div className={classNames(style['thought-title'], 'text-ampink')}>Command - {command.name}</div>
              <div>
                {argKeys.map((key, index) => {
                  return (
                    <div key={index}>
                      <span className='font-semibold'>{key}:</span> {command.args[key]}
                    </div>
                  )
                })}
              </div>
            </div>
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
    </div>
  )
}

const SearchResultContent = ({ fromName, searchResult }: SearchResultContentProps) => {
  return (
    <div className={style.message}>
      <div className='text-amorange py-2'>{fromName}</div>
      <Accordion>
        <Accordion.Panel>
          <Accordion.Title>Search Result</Accordion.Title>
          <Accordion.Content>
            <div className='flex flex-col gap-y-3'>
              {searchResult.map((result, index) => {
                return (
                  <div className={style.message} key={index}>
                    <Link href={result.link} className='text-amorange decoration-1 underline'>
                      {result.title}
                    </Link>
                    <div>{result.snippet}</div>
                  </div>
                )
              })}
            </div>
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
    </div>
  )
}

const NormalContent = ({ fromName, content }: GenericContentProps) => {
  return (
    <div className={style.message}>
      <div className='text-amorange'>{fromName}</div>
      <div className='py-2'>{content}</div>
    </div>
  )
}

const UserContent = ({ fromName, content }: GenericContentProps) => {
  return (
    <div className={style.message}>
      <div className='text-ampink'>{fromName}</div>
      <div className='py-2'>{content}</div>
    </div>
  )
}

const ChatScreen = () => {
  const { identity, isAuthenticated } = useInternetIdentity()

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

  if (!isAuthenticated) {
    return (
      <div className={classNames(style.header, 'mx-auto')}>
        <AuthButton />
      </div>
    )
  }

  return (
    <>
      <div className={style.header}>
        <button className={classNames(style['new-btn'], 'ml-2', 'hidden md:block')} onClick={togglePauseCOF}>
          Pause / Unpause
        </button>
        <button className={style['new-btn']} onClick={clearAllGoals}>
          Clear
        </button>
      </div>
      {isLoading && <CenterSpinner aria-label='Loading chat...' />}
      {isError && <AlertMessage message='We have a problem loading your chat' />}

      <section className={style['chat-container']}>
        {messages?.map((m, index) => {
          const isUser = 'User' in m.role
          const isSystem = 'System' in m.role
          const fromName: string = isUser ? 'User' : isSystem ? 'System' : 'ArcMind'
          const content = m.content

          // check if content has thoughts property
          const contentJSON = isJSON(content)
          const isThought = contentJSON && 'thoughts' in contentJSON
          const isSearchResult = contentJSON && isArray(contentJSON) && 'link' in contentJSON[0]

          if (isThought) {
            const thoughtsContent = contentJSON as ThoughtContentProps
            const { thoughts, command } = thoughtsContent

            return <ThoughtContent fromName={fromName} thoughts={thoughts} command={command} key={index} />
          }

          if (isSearchResult) {
            const searchResult = contentJSON as SearchResult[]
            return <SearchResultContent fromName={fromName} searchResult={searchResult} key={index} />
          }

          if (isUser) {
            return <UserContent fromName={fromName} content={content} key={index} />
          }

          return <NormalContent fromName={fromName} content={content} key={index} />
        })}
      </section>
      <form onSubmit={submitGoal}>
        <div className={style['question-parant']}>
          <div className={style['question-container']}>
            <input
              className={style.question}
              value={input}
              onChange={handleInputChange}
              placeholder='Enter your goal...'
            />
            <button className={style['send-btn']} type='submit'>
              Send
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default ChatScreen
