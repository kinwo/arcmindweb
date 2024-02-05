import React from 'react'

import { Button, Dropdown } from 'flowbite-react'
import { HiCurrencyDollar, HiLogout, HiOutlineChat, HiOutlineMenu, HiOutlineTrendingUp } from 'react-icons/hi'

import style from './Menu.module.css'
import { useNavigate } from 'react-router-dom'
import { useInternetIdentity } from '../auth/InternetIdentity'

type UserMenuProps = {
  signout: () => Promise<void>
}

export const UserMenu = ({ signout }: UserMenuProps) => {
  const navigate = useNavigate()
  const { controllerId } = useInternetIdentity()

  const processLogout = async () => {
    await signout()
    navigate('/')
  }

  return (
    <Dropdown
      label='Menu'
      outline
      renderTrigger={() => (
        <Button outline gradientDuoTone='purpleToPink'>
          <HiOutlineMenu className='h-6 w-6' />
        </Button>
      )}
    >
      <Dropdown.Item icon={HiOutlineChat} className={style.menuItem} onClick={() => navigate(`/ai/${controllerId}`)}>
        ArcMind
      </Dropdown.Item>
      <Dropdown.Item icon={HiOutlineTrendingUp} className={style.menuItem} onClick={() => navigate('/usage')}>
        Usage
      </Dropdown.Item>
      <Dropdown.Item icon={HiCurrencyDollar} className={style.menuItem} onClick={() => navigate('/myplan')}>
        My Plan
      </Dropdown.Item>
      <Dropdown.Item icon={HiLogout} className={style.menuItem} onClick={() => processLogout()}>
        Logout
      </Dropdown.Item>
    </Dropdown>
  )
}
