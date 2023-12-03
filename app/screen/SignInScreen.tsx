'use client';

import Head from 'next/head';

import { Button } from 'flowbite-react';

import './SignInScreen.css';
import { SignIn } from '../components/auth/SignIn';

export const SignInScreen = () => {
  return (
    <section className="signin-container">
      <Head>
        <title>Sign In - ArcMindAi</title>
      </Head>
      <h1 className="text-xl">Sign In Screen</h1>

      <SignIn />
    </section>
  );
};
