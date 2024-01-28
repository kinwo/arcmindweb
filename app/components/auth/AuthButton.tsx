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

  useEffect(() => {
    if (isAuthenticated && identity) {
      const loadControllerId = async () => {
        try {
          setLoading(true)
          const controllerId = await queryUserController(identity)
          if (controllerId) navigate(`/ai/${controllerId}`)
        } catch (error) {
          log.error('Error in loadControllerId', error as Error)
        } finally {
          setLoading(false)
        }
      }

      loadControllerId()
    }
  }, [identity, isAuthenticated, navigate])

  return (
    <>
      {isLoading && <CenterSpinner />}
      {!isLoading && (
        <Button outline onClick={isAuthenticated ? signout : authenticate}>
          {isAuthenticated ? 'Logout' : 'Sign In'}
        </Button>
      )}
    </>
  )
}
