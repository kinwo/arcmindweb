'use client';

import Head from 'next/head';

import './SignInScreen.css';
import { SignIn } from '../components/auth/SignIn';
import { useNavigate } from 'react-router-dom';
import { Identity } from '@dfinity/agent';
import { UserControllerMap } from '../config';

export const SignInScreen = () => {
  const navigate = useNavigate();

  const triggerAuth = (identity: Identity) => {
    const principalId = identity.getPrincipal().toString();
    const controllerId = UserControllerMap[principalId];

    navigate(`/ai/${controllerId}`);
  };

  return (
    <section className="signin-container">
      <Head>
        <title>Sign In - ArcMindAi</title>
      </Head>
      <h1 className="text-xl">Sign In Screen</h1>

      <SignIn triggerAuth={triggerAuth} />
    </section>
  );
};
