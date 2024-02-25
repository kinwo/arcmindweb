import React, { useEffect, useState } from 'react'

import { useInternetIdentity } from './InternetIdentity'
import { Button } from '../library/Button'
import { useNavigate } from 'react-router-dom'

export const AuthButton = () => {
  const { authenticate, signout, isAuthenticated, controllerId, setControllerId } = useInternetIdentity()
  const navigate = useNavigate()
  const [isAutoRedirect, setIsAutoRedirect] = useState(false)

  useEffect(() => {
    if (isAutoRedirect && isAuthenticated && controllerId) {
      navigate(`/ai/${controllerId}`)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controllerId, isAuthenticated, navigate])

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
      <Button outline onClick={isAuthenticated ? processSignout : processAuthenticate}>
        {isAuthenticated ? 'Logout' : 'Sign In'}
      </Button>
      {controllerId && <Button onClick={() => navigate(`/ai/${controllerId}`)}>Open ArcMind AI</Button>}
    </>
  )
}
