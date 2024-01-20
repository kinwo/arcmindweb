'use client';

import { useState, useEffect } from 'react';

import Head from 'next/head';

import style from './SignUpScreen.module.css';

import { ProductDisplay } from '../components/signup/ProductDisplay';
import { SuccessDisplay } from '../components/signup/SuccessDisplay';
import { Message } from '../components/Message';

type UISkeletonProps = {
  children: React.ReactNode;
};

const UISkeleton = ({ children }: UISkeletonProps) => {
  return (
    <section className={style.signupContainer}>
      <Head>
        <title>Sign Up - ArcMindAI</title>
      </Head>
      <h1 className="text-2xl text-slate-600 font-semibold">Sign Up</h1>
      {children}
    </section>
  );
};

export const SignUpScreen = () => {
  let [message, setMessage] = useState('');
  let [success, setSuccess] = useState(false);
  let [sessionId, setSessionId] = useState('');

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get('success')) {
      setSuccess(true);
      setSessionId(query.get('session_id') as string);
    }

    if (query.get('canceled')) {
      setSuccess(false);
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, [sessionId]);

  let content: JSX.Element = <></>;

  if (!success && message === '') {
    content = <ProductDisplay />;
  } else if (success && sessionId !== '') {
    content = <SuccessDisplay sessionId={sessionId} />;
  } else {
    content = <Message message={message} />;
  }

  return <UISkeleton>{content}</UISkeleton>;
};
