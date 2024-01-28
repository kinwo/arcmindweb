import React from 'react'

import { Button, Dropdown } from 'flowbite-react'
import { HiLogin, HiOutlineMenu, HiUserAdd } from 'react-icons/hi'

import style from './Menu.module.css'
import { useNavigate } from 'react-router-dom'

export const GuestMenu = () => {
  const navigate = useNavigate()

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
      <Dropdown.Item icon={HiUserAdd} className={style.menuItem} onClick={() => navigate('/signup')}>
        Sign Up
      </Dropdown.Item>
      <Dropdown.Item icon={HiLogin} className={style.menuItem} onClick={() => navigate('/signin')}>
        Sign In
      </Dropdown.Item>
    </Dropdown>
  )
}
