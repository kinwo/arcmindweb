'use client'

import React, { useContext } from 'react'

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

export const InternetIdentityContext = React.createContext<InternetIdentityContextState>({
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
  const [authClient, setAuthClient] = React.useState<AuthClient | null>(null)
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const identityProvider = (authClientOptions.identityProvider || '').toString()

  const createAuthClient = React.useCallback(async () => {
    const authClient = await AuthClient.create()
    setAuthClient(authClient)
  }, [])

  React.useEffect(() => {
    createAuthClient()
  }, [createAuthClient])

  const setAuthStatus = React.useCallback(async (authClient: AuthClient) => {
    if (authClient) {
      const isAuthenticated = await authClient.isAuthenticated()
      return setIsAuthenticated(isAuthenticated)
    }
    return setIsAuthenticated(false)
  }, [])

  React.useEffect(() => {
    authClient && setAuthStatus(authClient)
  }, [authClient, setAuthStatus])

  const handleOnSuccess = React.useCallback(
    (authClient: AuthClient) => {
      setIsAuthenticated(true)
      onSuccess && onSuccess(authClient.getIdentity())
    },
    [onSuccess]
  )

  const handleOnError = React.useCallback(
    (error: string | undefined) => {
      setError(error ?? '')
      onError && onError(error)
    },
    [onError]
  )

  const authenticate = React.useCallback(async () => {
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

  const signout = React.useCallback(async () => {
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
