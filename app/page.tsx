'use client';

import React, { createContext, useEffect, useState } from 'react';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { PageSkeleton } from './screen/PageSkeleton';
import { HomeScreen } from './screen/HomeScreen';
import { EmptyScreen } from './screen/EmptyScreen';
import ChatScreen from './screen/ChatScreen';
import { SignUpScreen } from './screen/SignUpScreen';
import { UsageScreen } from './screen/UsageScreen';
import { MyPlanScreen } from './screen/MyPlanScreen';

export default function Page() {
  const [render, setRender] = useState(false);
  useEffect(() => setRender(true), []);

  if (typeof window === 'undefined') return null;

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<PageSkeleton />}>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/index.html" element={<HomeScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
        <Route path="/signin" element={<HomeScreen />} />
        <Route path="/usage" element={<UsageScreen />} />
        <Route path="/myplan" element={<MyPlanScreen />} />
        <Route path="/ai/:controllerId" element={<ChatScreen />} />
        <Route path="*" element={<EmptyScreen />} />
      </Route>
    )
  );

  return render ? <RouterProvider router={router} /> : null;
}
