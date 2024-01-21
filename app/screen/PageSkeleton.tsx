'use client';

import React, { createContext } from 'react';
import { Outlet } from 'react-router-dom';

import './PageSkeleton.css';

import { Header } from '../components/header/Header';
import { useAuthClient } from '../components/auth/useAuthClient';
import { AuthContext } from '../components/context/AuthContext';

export const PageSkeleton = ({}) => {
  const auth = useAuthClient();

  return (
    <AuthContext.Provider value={auth}>
      <div className="main">
        <Header />
        <Outlet />
      </div>
    </AuthContext.Provider>
  );
};
