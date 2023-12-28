'use client';

import Head from 'next/head';

import './SignInScreen.css';

import { SignIn } from '../components/auth/SignIn';
import { useNavigate } from 'react-router-dom';
import { Identity } from '@dfinity/agent';
import { log } from '../util/log';
import { queryUserController } from '../client/user';

export const SignInScreen = () => {
  const navigate = useNavigate();

  const triggerAuth = async (identity: Identity) => {
    const controllerId = await queryUserController(identity);

    if (controllerId === null) {
      log.warn('No controller found');
      return;
    }

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
