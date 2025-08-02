import { Button, Dropdown } from 'flowbite-react'
import { HiLogin, HiOutlineMenu } from 'react-icons/hi'

import { useNavigate } from 'react-router-dom'
import style from './Menu.module.css'

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
      <Dropdown.Item icon={HiLogin} className={style.menuItem} onClick={() => navigate('/signin')}>
        Sign In
      </Dropdown.Item>
    </Dropdown>
  )
}
