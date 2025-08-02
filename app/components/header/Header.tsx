import { Link, useMatch } from 'react-router-dom'

import style from './Header.module.css'

import { useInternetIdentity } from '../auth/InternetIdentity'
import { Logo } from '../icons'
import { ShutdownBanner } from '../marketing/ShutdownBanner'
import { GuestMenu } from './GuestMenu'
import { UserMenu } from './UserMenu'

export const Header = () => {
  const { isAuthenticated, identity, controllerId, signout } = useInternetIdentity()
  const isValidUser = isAuthenticated && identity != null && controllerId !== null

  const isHome = useMatch('/')

  return (
    <section>
      {isHome && <ShutdownBanner />}

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
