import useSWR, { KeyedMutator } from 'swr'

import { Identity } from '@dfinity/agent'
import { queryUserController } from '@/app/client/user'

import { SWRKey } from '../../config'
import { log } from '../../util/log'
import { useInternetIdentity } from '../auth/InternetIdentity'

const AutoRefreshSecs = 5

const fetcher =
  (identity: Identity | null) =>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (id: string): Promise<string | null> => {
    if (identity === null) return null

    try {
      const controllerId = await queryUserController(identity)
      return controllerId
    } catch (err) {
      log.error('Error in useControllerId queryUserController', err as Error)
      return null
    }
  }

type Response = {
  controllerId: string | null
  mutate: KeyedMutator<string | null>
  isLoading: boolean
  isError: boolean
}

export const useControllerId = (identity: Identity | null): Response => {
  const principalId = identity?.getPrincipal().toString() ?? ''
  const { data, error, isLoading, mutate } = useSWR(`${SWRKey.ControllerId}${principalId}`, fetcher(identity), {
    refreshInterval: 1000 * AutoRefreshSecs,
  })

  const { setControllerId } = useInternetIdentity()
  setControllerId(data ?? null)

  return {
    controllerId: data ?? null,
    mutate,
    isLoading,
    isError: error,
  }
}
