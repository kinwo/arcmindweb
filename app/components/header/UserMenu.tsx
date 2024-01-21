import React from 'react';

import { Button, Dropdown } from 'flowbite-react';
import {
  HiCurrencyDollar,
  HiLogin,
  HiLogout,
  HiOutlineMenu,
  HiOutlineTrendingUp,
} from 'react-icons/hi';

import style from './Menu.module.css';
import { useAuthClient } from '../auth/useAuthClient';

type UserMenuProps = {
  signout: () => void;
};

export const UserMenu = ({ signout }: UserMenuProps) => {
  return (
    <Dropdown
      label="Menu"
      outline
      renderTrigger={() => (
        <Button outline gradientDuoTone="purpleToPink">
          <HiOutlineMenu className="h-6 w-6" />
        </Button>
      )}
    >
      <Dropdown.Item icon={HiOutlineTrendingUp} className={style.menuItem}>
        Usage
      </Dropdown.Item>
      <Dropdown.Item icon={HiCurrencyDollar} className={style.menuItem}>
        My Plan
      </Dropdown.Item>
      <Dropdown.Item
        icon={HiLogout}
        className={style.menuItem}
        onClick={() => signout()}
      >
        Log Out
      </Dropdown.Item>
    </Dropdown>
  );
};
