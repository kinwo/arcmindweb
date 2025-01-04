'use client'

import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react'

import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import classNames from 'classnames'

import _, { isString } from 'lodash'

import { CenterSpinner } from '../components/Spinner'

import { AlertMessage } from '../components/Alert'
import { log } from '../util/log'
import { useParams } from 'react-router-dom'
import { GenericContentProps, SearchResultContentProps, ThoughtContentProps } from './types'

import style from './ChatScreen.module.css'
import { Accordion, List } from 'flowbite-react'
import Link from 'next/link'
import { ChatMessage, ChatRole, isSearchResult, isThoughtContentProps } from '../types'
import { collection, limit, onSnapshot, query, where, orderBy } from 'firebase/firestore'
import { db, loginToDefaultUser } from '../client/firebase'

const initialInput = ''

const ThoughtContent = ({ thoughts, command, fromName }: ThoughtContentProps) => {
  const plans = thoughts.plan.split('- ').filter(plan => !_.isEmpty(plan.trim()))
  const argKeys: string[] = Object.keys(command.args)

  return (
    <div className='text-slate-400 pb-2'>
      <div className='text-amorange'>{fromName}</div>
      <div className='py-3'>{thoughts.speak}</div>

      <Accordion>
        <Accordion.Panel>
          <Accordion.Title>Thoughts</Accordion.Title>
          <Accordion.Content>
            <div className={style.message}>
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
            </div>
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
    </div>
  )
}

const SearchResultContent = ({ fromName, searchResult }: SearchResultContentProps) => {
  return (
    <div className='text-slate-400 py-2'>
      <div className='text-amorange py-2'>{fromName}</div>
      <Accordion>
        <Accordion.Panel>
          <Accordion.Title>Search Result</Accordion.Title>
          <Accordion.Content>
            <div className={style.message}>
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
            </div>
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
    </div>
  )
}

const NormalContent = ({ fromName, content }: GenericContentProps) => {
  return (
    <div className='py-1'>
      <div className={style.message}>
        <div className='text-amorange'>{fromName}</div>
        <div className='py-1'>
          <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
        </div>
      </div>
    </div>
  )
}

const UserContent = ({ fromName, content }: GenericContentProps) => {
  return (
    <div className={style.message}>
      <div className='text-ampink'>{fromName}</div>
      <div className='py-1'>
        <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
      </div>
    </div>
  )
}

const TestUserId = 'testing'

const ChatScreen = () => {
  // const { identity, isAuthenticated } = useInternetIdentity()
  const { controllerId } = useParams()

  const [isFBUserAuthed, setIsFBUserAuthed] = useState<boolean>(false)

  const myControllerId = controllerId || ''

  log.info('ChatScreen myControllerId: ', { myControllerId })

  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  useEffect(() => {
    if (!myControllerId || !isFBUserAuthed) return

    try {
      setIsLoading(true)
      setIsError(false)

      const chatQuery = query(
        collection(db, 'chat'),
        where('userId', '==', TestUserId),
        orderBy('createdAt', 'asc'),
        limit(10)
      )
      const unsubscribe = onSnapshot(chatQuery, querySnapshot => {
        log.info('ChatScreen querySnapshot:', querySnapshot)
        const myMessages: ChatMessage[] = []

        querySnapshot.forEach(doc => {
          const message = doc.data()
          myMessages.push({
            id: doc.id,
            content: message.content,
            role: message.role,
            createdAt: message.createdAt,
          })
        })

        log.info('ChatScreen set messages:', myMessages)

        setMessages(myMessages)
      })

      return unsubscribe
    } catch (err) {
      log.error('Error in fetching chat history', err as Error)
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }, [myControllerId, setMessages, messages, isFBUserAuthed])

  const [input, setInput] = useState<string>(initialInput)

  useEffect(() => {
    async function loginFBAuth() {
      try {
        log.info('Logging in FB Auth')

        await loginToDefaultUser()
        setIsFBUserAuthed(true)

        log.info('Logged in FB Auth')
      } catch (err) {
        log.error('Error in login FB Auth', err as Error)
        setIsFBUserAuthed(false)
      }
    }

    loginFBAuth()
  }, [])

  const submitGoal = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // try {
    //   setInput('')
    //   await createControllerActor(identity, myControllerId).start_new_goal(input)
    // } catch (err) {
    //   log.error('Error in submitting goal', err as Error)
    // }
  }, [])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const togglePauseCOF = async () => {
    // if (!identity) return
    // try {
    //   const result = await createControllerActor(identity, myControllerId).toggle_pause_cof()
    //   log.info('Pause Chain of thoughts', { result })
    // } catch (err) {
    //   log.error('Error in pausing Chain of thoughts', err as Error)
    // }
  }

  const clearAllGoals = async () => {
    // if (!identity) return
    // try {
    //   await createControllerActor(identity, myControllerId).clear_all_goals()
    // } catch (err) {
    //   log.error('Error in clearing all goals', err as Error)
    // }
  }

  // if (!isAuthenticated) {
  //   return (
  //     <div className={classNames(style.header, 'mx-auto')}>
  //       <AuthButton />
  //     </div>
  //   )
  // }

  log.info('ChatScreen', { messages, isLoading, isError })

  log.info('ChatScreen messages length', { length: messages.length })

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
          log.info('ChatScreen message iterate:', m)

          const isUser = m.role === ChatRole.user
          const isSystem = m.role === ChatRole.system
          const fromName: string = isUser ? 'User' : isSystem ? 'System' : 'ArcMind'
          const content = m.content

          // check if content has thoughts property
          if (isThoughtContentProps(content)) {
            const { thoughts, command } = content
            return <ThoughtContent fromName={fromName} thoughts={thoughts} command={command} key={index} />
          }

          if (isSearchResult(content)) {
            return <SearchResultContent fromName={fromName} searchResult={content} key={index} />
          }

          const safeContent: string = !isString(content) ? JSON.stringify(content) : content
          log.info('ChatScreen safeContent:', { safeContent })

          if (isUser) {
            return <UserContent fromName={fromName} content={safeContent} key={index} />
          }

          return <NormalContent fromName={fromName} content={safeContent} key={index} />
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
