'use client'

import React from 'react'
import { Outlet, useMatch } from 'react-router-dom'

import './PageSkeleton.css'

import { Header } from '../components/header/Header'
import { Footer } from '../components/header/Footer'

export const PageSkeleton = () => {
  const matchAIChat = useMatch('/ai/:controllerId')

  return (
    <div className='main'>
      <Header />
      <Outlet />

      {!matchAIChat && <Footer />}
    </div>
  )
}
