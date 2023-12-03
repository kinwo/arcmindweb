'use client';

import React from 'react';

import { Outlet } from 'react-router-dom';

import './PageSkeleton.css';

export const PageSkeleton = () => {
  return (
    <div className="main">
      <Outlet />
    </div>
  );
};
