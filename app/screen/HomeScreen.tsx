'use client';

import Head from 'next/head';

import style from './HomeScreen.module.css';

import { SignIn } from '../components/auth/SignIn';
import { useNavigate } from 'react-router-dom';
import { Identity } from '@dfinity/agent';
import { log } from '../util/log';
import { queryUserController } from '../client/user';
import { Button } from 'flowbite-react';
import { useContext } from 'react';
import { AuthContext } from '../components/context/AuthContext';

export const HomeScreen = () => {
  const navigate = useNavigate();
  const { setControllerId } = useContext(AuthContext);

  const triggerAuth = async (identity: Identity) => {
    const controllerId = await queryUserController(identity);

    if (controllerId === null) {
      log.warn('No controller found');
      return;
    }

    setControllerId(controllerId);
    navigate(`/ai/${controllerId}`);
  };

  const navigateToSignUp = () => {
    navigate('/signup');
  };

  return (
    <section className={style.signinContainer}>
      <Head>
        <title>Home - ArcMindAI</title>
      </Head>

      <section>
        <h2 className="text-xl font-semibold text-slate-600">
          Supercharge your AI workforce
        </h2>
      </section>

      <Button
        gradientDuoTone="purpleToPink"
        className="text-xl w-[200px]"
        onClick={() => navigateToSignUp()}
      >
        Sign Up
      </Button>

      <SignIn triggerAuth={triggerAuth} />
    </section>
  );
};
