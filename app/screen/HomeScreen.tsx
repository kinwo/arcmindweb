'use client'

import React from 'react'

import Head from 'next/head'

import style from './HomeScreen.module.css'

import { useNavigate } from 'react-router-dom'
import { Button } from 'flowbite-react'
import { AuthButton } from '../components/auth/AuthButton'

export const HomeScreen = () => {
  const navigate = useNavigate()

  return (
    <section className={style.signinContainer}>
      <Head>
        <title>Home - ArcMindAI</title>
      </Head>

      <section>
        <h2 className='text-3xl font-semibold text-slate-600 pb-[30px] text-center'>Supercharge your AI workforce</h2>
        <h2 className='text-xl text-slate-600 pb-[30px] text-center'>with Goal-directed Autonomous Companion</h2>
        <h2 className='text-xl text-slate-600 pb-[30px] text-center'>Long Term Memory Vector DB</h2>
        <h2 className='text-xl text-slate-600 pb-[30px] text-center'>
          Increased LLM faithfulness with Chain of Thoughts
        </h2>
      </section>

      <Button gradientDuoTone='purpleToPink' className='text-xl w-[200px]' onClick={() => navigate('/signup')}>
        Sign Up
      </Button>

      <AuthButton />
    </section>
  )
}
