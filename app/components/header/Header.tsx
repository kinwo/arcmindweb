import React from 'react'
import { Link, useMatch } from 'react-router-dom'

import style from './Header.module.css'

import { GuestMenu } from './GuestMenu'
import { UserMenu } from './UserMenu'
import { useInternetIdentity } from '../auth/InternetIdentity'
import { Logo } from '../icons'
import { DiscountBanner } from '../marketing/DiscountBanner'

export const Header = () => {
  const { isAuthenticated, identity, controllerId, signout } = useInternetIdentity()
  const isValidUser = isAuthenticated && identity != null && controllerId !== null

  const isHome = useMatch('/')

  return (
    <section>
      {isHome && <DiscountBanner />}

      <div className={style.header}>
        <div className={style.title}>
          <Link to='/'>
            <Logo className='w-[200px] md:w-[300px]' />
          </Link>
        </div>
        <div className={style.menu}>{isValidUser ? <UserMenu signout={signout} /> : <GuestMenu />}</div>
      </div>
      <h1 className={style.subtitle}>beta v0.1</h1>
    </section>
  )
}
