'use client'

import React from 'react'
import { Outlet } from 'react-router-dom'

import './PageSkeleton.css'

import { Header } from '../components/header/Header'

export const PageSkeleton = () => {
  return (
    <div className='main'>
      <Header />
      <Outlet />
    </div>
  )
}
