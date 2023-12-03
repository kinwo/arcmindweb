'use client';

import React, { useEffect, useState } from 'react';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { PageSkeleton } from './screen/PageSkeleton';
import { SignInScreen } from './screen/SignInScreen';
import { ChatScreen } from './screen/ChatScreen';
import { EmptyScreen } from './screen/EmptyScreen';

export const ArcMindApp = () => {
  const [render, setRender] = useState(false);
  useEffect(() => setRender(true), []);

  if (typeof window === 'undefined') return null;

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<PageSkeleton />}>
        <Route path="/" element={<SignInScreen />} />
        <Route path="/signin" element={<SignInScreen />} />
        <Route path="/index.html" element={<SignInScreen />} />
        <Route path="/ai" element={<ChatScreen />} />
        <Route path="*" element={<EmptyScreen />} />
      </Route>
    )
  );

  return render ? <RouterProvider router={router} /> : null;
};

export default ArcMindApp;
