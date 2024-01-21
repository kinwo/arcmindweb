import React, { useContext } from 'react';

import { Button, Dropdown } from 'flowbite-react';
import {
  HiCurrencyDollar,
  HiLogin,
  HiLogout,
  HiOutlineChat,
  HiOutlineMenu,
  HiOutlineTrendingUp,
} from 'react-icons/hi';

import style from './Menu.module.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

type UserMenuProps = {
  signout: () => void;
};

export const UserMenu = ({ signout }: UserMenuProps) => {
  const navigate = useNavigate();
  const { controllerId } = useContext(AuthContext);

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
      <Dropdown.Item
        icon={HiOutlineChat}
        className={style.menuItem}
        onClick={() => navigate(`/ai/${controllerId}`)}
      >
        ArcMind
      </Dropdown.Item>
      <Dropdown.Item
        icon={HiOutlineTrendingUp}
        className={style.menuItem}
        onClick={() => navigate('/usage')}
      >
        Usage
      </Dropdown.Item>
      <Dropdown.Item
        icon={HiCurrencyDollar}
        className={style.menuItem}
        onClick={() => navigate('/myplan')}
      >
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
