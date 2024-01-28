import React from 'react'
import { Link } from 'react-router-dom'

import style from './Header.module.css'

import { GuestMenu } from './GuestMenu'
import { UserMenu } from './UserMenu'
import { useInternetIdentity } from '../auth/InternetIdentity'

export const Header = () => {
  const { isAuthenticated, signout } = useInternetIdentity()

  return (
    <section>
      <div className={style.header}>
        <div className={style.title}>
          <Link to='/'>ArcMind AI</Link>
        </div>
        <div className={style.menu}>{isAuthenticated ? <UserMenu signout={signout} /> : <GuestMenu />}</div>
      </div>
      <h1 className={style.subtitle}>beta v0.1</h1>
    </section>
  )
}
