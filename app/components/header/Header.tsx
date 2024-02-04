import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import style from './Header.module.css'

import { GuestMenu } from './GuestMenu'
import { UserMenu } from './UserMenu'
import { useInternetIdentity } from '../auth/InternetIdentity'
import { queryUserController } from '@/app/client/user'

export const Header = () => {
  const { isAuthenticated, identity, signout } = useInternetIdentity()
  const [controllerId, setControllerId] = useState<string | null>(null)
  const isValidUser = isAuthenticated && controllerId !== null

  useEffect(() => {
    const query = async () => {
      if (isAuthenticated && identity) {
        const result = await queryUserController(identity)
        setControllerId(result)
      }
    }

    query()
  }, [identity, isAuthenticated])

  return (
    <section>
      <div className={style.header}>
        <div className={style.title}>
          <Link to='/'>ArcMind AI</Link>
        </div>
        <div className={style.menu}>{isValidUser ? <UserMenu signout={signout} /> : <GuestMenu />}</div>
      </div>
      <h1 className={style.subtitle}>beta v0.1</h1>
    </section>
  )
}
