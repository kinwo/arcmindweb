'use client'

import React, { useEffect, useState } from 'react'

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { PageSkeleton } from './screen/PageSkeleton'
import { HomeScreen } from './screen/HomeScreen'
import { EmptyScreen } from './screen/EmptyScreen'
import ChatScreen from './screen/ChatScreen'
import { SignUpScreen } from './screen/SignUpScreen'
import { UsageScreen } from './screen/UsageScreen'
import { MyPlanScreen } from './screen/MyPlanScreen'
import { InternetIdentityProvider } from './components/auth/InternetIdentity'
import { AuthConfig } from './config'
import { NFID_AUTH_PROVIDER_URL } from './auth/provider/nfid'
import { log } from './util/log'

export default function Page() {
  const [render, setRender] = useState(false)
  useEffect(() => setRender(true), [])

  if (typeof window === 'undefined') return null

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<PageSkeleton />}>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/index.html' element={<HomeScreen />} />
        <Route path='/signup' element={<SignUpScreen />} />
        <Route path='/signin' element={<HomeScreen />} />
        <Route path='/usage' element={<UsageScreen />} />
        <Route path='/myplan' element={<MyPlanScreen />} />
        <Route path='/ai/:controllerId' element={<ChatScreen />} />
        <Route path='*' element={<EmptyScreen />} />
      </Route>
    )
  )

  const NFID_OPENER_FEATURES =
    `left=${window.screen.width / 2 - 525 / 2}, ` +
    `top=${window.screen.height / 2 - 705 / 2},` +
    'toolbar=0,location=0,menubar=0,width=525,height=705'

  return render ? (
    <InternetIdentityProvider
      authClientOptions={{
        maxTimeToLive: AuthConfig.MaxSessionDurationNanoSecs,
        identityProvider: NFID_AUTH_PROVIDER_URL,
        windowOpenerFeatures: NFID_OPENER_FEATURES,
        onSuccess: principal => {
          log.info('>> initialize your actors with', { principal })
        },
        onError: async error => {
          log.error('Error caught in NFID.login', error)
        },
      }}
    >
      <RouterProvider router={router} />
    </InternetIdentityProvider>
  ) : null
}
