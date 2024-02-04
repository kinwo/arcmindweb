'use client'

import React, { useContext, useEffect, useCallback, createContext, useState } from 'react'

import { log } from '@/app/util/log'
import { Identity } from '@dfinity/agent'
import { AuthClient, AuthClientLoginOptions } from '@dfinity/auth-client'

interface InternetIdentityContextState {
  error: string | null
  authClient: AuthClient | null
  identityProvider: string
  isAuthenticated: boolean
  identity: Identity | null
  authenticate: () => Promise<void>
  signout: () => Promise<void>
}

export const InternetIdentityContext = createContext<InternetIdentityContextState>({
  error: null,
  authClient: null,
  identityProvider: '',
  isAuthenticated: false,
  identity: null,
  authenticate: () => new Promise(() => null),
  signout: () => new Promise(() => null),
})

interface AuthClientOptions extends Omit<AuthClientLoginOptions, 'onSuccess'> {
  onSuccess?: (identity: Identity) => void
}

interface UseInternetIdentityProps {
  authClientOptions?: AuthClientOptions
}

const useICIIAuth = ({
  authClientOptions: { onError, onSuccess, ...authClientOptions } = {},
}: UseInternetIdentityProps = {}) => {
  const [authClient, setAuthClient] = useState<AuthClient | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const identityProvider = (authClientOptions.identityProvider || '').toString()

  const createAuthClient = useCallback(async () => {
    const authClient = await AuthClient.create()
    setAuthClient(authClient)
  }, [])

  useEffect(() => {
    createAuthClient()
  }, [createAuthClient])

  const setAuthStatus = useCallback(async (authClient: AuthClient) => {
    if (authClient) {
      const isAuthenticated = await authClient.isAuthenticated()
      return setIsAuthenticated(isAuthenticated)
    }
    return setIsAuthenticated(false)
  }, [])

  useEffect(() => {
    authClient && setAuthStatus(authClient)
  }, [authClient, setAuthStatus])

  const handleOnSuccess = useCallback(
    (authClient: AuthClient) => {
      setIsAuthenticated(true)
      onSuccess && onSuccess(authClient.getIdentity())
    },
    [onSuccess]
  )

  const handleOnError = useCallback(
    (error: string | undefined) => {
      setError(error ?? '')
      onError && onError(error)
    },
    [onError]
  )

  const authenticate = useCallback(async () => {
    if (authClient) {
      log.info('>> authenticate: ', { authClient, identityProvider })

      await authClient.login({
        onSuccess: () => handleOnSuccess(authClient),
        onError: handleOnError,
        identityProvider,
        ...authClientOptions,
      })
    } else {
      log.info('>> authenticate: no client')
    }
  }, [authClient, authClientOptions, handleOnError, handleOnSuccess, identityProvider])

  const signout = useCallback(async () => {
    if (authClient) {
      await authClient.logout()
      setIsAuthenticated(false)
    }
  }, [authClient])

  return {
    error,
    authClient,
    identityProvider,
    isAuthenticated,
    identity: authClient ? authClient.getIdentity() : null,
    authenticate,
    signout,
  }
}

interface InternetIdentityProviderProps {
  authClientOptions?: AuthClientOptions
  children: React.ReactNode
}

export const InternetIdentityProvider: React.FC<InternetIdentityProviderProps> = ({
  children,
  authClientOptions = {},
}) => {
  const authContext = useICIIAuth({ authClientOptions })
  return <InternetIdentityContext.Provider value={authContext}>{children}</InternetIdentityContext.Provider>
}

export const useInternetIdentity: () => InternetIdentityContextState = () => {
  return useContext<InternetIdentityContextState>(InternetIdentityContext)
}
