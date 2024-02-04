import React, { useEffect, useState } from 'react'

import { useInternetIdentity } from './InternetIdentity'
import { log } from '@/app/util/log'
import { Button } from '../library/Button'
import { CenterSpinner } from '../Spinner'
import { queryUserController } from '@/app/client/user'
import { useNavigate } from 'react-router-dom'

export const AuthButton = () => {
  const { authenticate, signout, isAuthenticated, identity } = useInternetIdentity()
  const [isLoading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [isAutoRedirect, setIsAutoRedirect] = useState(false)

  const [controllerId, setControllerId] = useState<string | null>(null)

  useEffect(() => {
    if (isAuthenticated && identity) {
      const loadControllerId = async () => {
        try {
          setLoading(true)
          const controllerId = await queryUserController(identity)
          setControllerId(controllerId)

          if (isAutoRedirect && controllerId) {
            navigate(`/ai/${controllerId}`)
          }
        } catch (error) {
          log.error('Error in loadControllerId', error as Error)
        } finally {
          setLoading(false)
        }
      }

      loadControllerId()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [identity, isAuthenticated, navigate])

  const processSignout = async () => {
    setControllerId(null)
    await signout()
  }

  const processAuthenticate = async () => {
    setIsAutoRedirect(true)
    await authenticate()
  }

  return (
    <>
      {isLoading && <CenterSpinner />}
      {!isLoading && (
        <Button outline onClick={isAuthenticated ? processSignout : processAuthenticate}>
          {isAuthenticated ? 'Logout' : 'Sign In'}
        </Button>
      )}
      {controllerId && <Button onClick={() => navigate(`/ai/${controllerId}`)}>Open ArcMind AI</Button>}
    </>
  )
}
