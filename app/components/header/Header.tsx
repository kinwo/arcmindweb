import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import style from './Header.module.css';

import { GuestMenu } from './GuestMenu';
import { UserMenu } from './UserMenu';
import { AuthContext } from '../context/AuthContext';

export const Header = ({}) => {
  const { isAuthenticated, signout } = useContext(AuthContext);

  return (
    <section>
      <div className={style.header}>
        <div className={style.title}>
          <Link to="/">ArcMind AI</Link>
        </div>
        <div className={style.menu}>
          {isAuthenticated ? <UserMenu signout={signout} /> : <GuestMenu />}
        </div>
      </div>
      <h1 className={style.subtitle}>alpha v0.2</h1>
    </section>
  );
};
