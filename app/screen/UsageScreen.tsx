import { Card } from 'flowbite-react'
import React, { useCallback, useEffect, useState } from 'react'
import { createControllerActor } from '../canister/arcmindai'
import { log } from '../util/log'
import { queryUserController } from '../client/user'
import { useInternetIdentity } from '../components/auth/InternetIdentity'
import { CenterSpinner } from '../components/Spinner'

type MyCardProps = {
  title: string
  metric: string
}

const MyCard = ({ title, metric }: MyCardProps) => {
  return (
    <Card className='w-[90%] md:w-[600px] mx-auto'>
      <h5 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>{title}</h5>
      <p className='font-normal text-gray-700 dark:text-gray-400'>{metric} thoughts</p>
    </Card>
  )
}

export const UsageScreen = () => {
  const { identity } = useInternetIdentity()
  const [controllerId, setControllerId] = useState<string | null>(null)
  const [isLoading, setLoading] = useState(true)

  const updateControllerId = useCallback(async () => {
    if (!identity) return

    const controllerId = await queryUserController(identity)

    if (controllerId === null) {
      log.warn('No controller found')
      return
    }

    setControllerId(controllerId)
  }, [identity])

  useEffect(() => {
    updateControllerId()
  }, [updateControllerId])

  const [maxNumThoughtsAllowed, setMaxNumThoughtsAllowed] = useState<bigint | null>(null)
  const [numThoughtsProcessed, setNumThoughtsProcessed] = useState<bigint | null>(null)
  const numThoughtsRemaining = Number(maxNumThoughtsAllowed) - Number(numThoughtsProcessed)
  const isMetricsPending = maxNumThoughtsAllowed === null || numThoughtsProcessed === null

  const queryMaxNumThoughtsAllowed = useCallback(async () => {
    if (!identity || !controllerId) return

    try {
      const result = await createControllerActor(identity, controllerId).get_max_num_thoughts_allowed()

      log.info('queryMaxNumThoughtsAllowed', { result })

      setMaxNumThoughtsAllowed(result)
    } catch (err) {
      log.error('Error in queryMaxNumThoughtsAllowed', err as Error)
    }
  }, [controllerId, identity])

  const queryNumThoughtsProcessed = useCallback(async () => {
    if (!identity || !controllerId) return

    try {
      const result = await createControllerActor(identity, controllerId).get_num_thoughts_processed()

      log.info('queryNumThoughtsProcessed', { result })

      setNumThoughtsProcessed(result)
    } catch (err) {
      log.error('Error in queryNumThoughtsProcessed', err as Error)
    }
  }, [controllerId, identity])

  useEffect(() => {
    const queryAll = async () => {
      try {
        setLoading(true)

        const promises = [queryMaxNumThoughtsAllowed(), queryNumThoughtsProcessed()]
        await Promise.all(promises)
      } catch (error) {
        log.error('Error in queryAll', error as Error)
      } finally {
        setLoading(false)
      }
    }

    queryAll()
  }, [queryMaxNumThoughtsAllowed, queryNumThoughtsProcessed])

  return (
    <main style={{ padding: '1rem' }}>
      {isLoading && <CenterSpinner />}
      {!isLoading && !isMetricsPending && (
        <div className='flex flex-col gap-6'>
          <MyCard title='No. of thoughts included in your plan' metric={String(maxNumThoughtsAllowed)} />
          <MyCard title='No. of thoughts used' metric={String(numThoughtsProcessed)} />
          <MyCard title='No. of thoughts remaining' metric={String(numThoughtsRemaining)} />
        </div>
      )}
    </main>
  )
}
