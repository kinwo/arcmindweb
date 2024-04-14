'use client'
import React from 'react'

import Head from 'next/head'
import { FiExternalLink } from 'react-icons/fi'

import style from './HomeScreen.module.css'

import { useNavigate } from 'react-router-dom'
import { Button } from 'flowbite-react'
import { AuthButton } from '../components/auth/AuthButton'
import Link from 'next/link'

const MainJumbotron = () => {
  const navigate = useNavigate()

  return (
    <section className='bg-white '>
      <div className='px-4 mx-auto max-w-screen-xl'>
        <div className='bg-gray-50  rounded-lg p-8 md:p-12 mb-8'>
          <h1 className='text-gray-900  text-3xl md:text-5xl font-extrabold mb-2'>
            Join the new era of Decentralized AI with privacy-first AI agent
          </h1>
          <p className='text-lg font-normal text-gray-500  mb-6'>
            Deploy your own AI agent running on decentralized compute network. No data is stored on public cloud. Your
            data is yours.
          </p>
          <div className='flex flex-col w-[200px] space-y-2'>
            <Button gradientDuoTone='purpleToPink' className='text-xl w-[200px]' onClick={() => navigate('/signup')}>
              Sign Up
            </Button>{' '}
            <div className='text-center'>or</div>
            <AuthButton />
          </div>
        </div>
        <div className='grid md:grid-cols-2 gap-8'>
          <div className='bg-gray-50 rounded-lg p-8 md:p-12'>
            <h2 className='text-gray-900  text-3xl font-extrabold mb-2'>Chain of Thoughts Engine</h2>
            <p className='text-lg font-normal text-gray-500 mb-4'>
              Process user&lsquo;s question in systematic way through inference workflow with Large Language Model
              (LLM). User&lsquo;s content is saved securely on{' '}
              <a
                className='underline decoration-ampink'
                href='https://internetcomputer.org/'
                target='_blank'
                rel='noreferrer'
              >
                Internet Computer
              </a>
              &lsquo;s blockchain through ArcMind Vector DB for future related question Retrieval Augumented Generation
              (RAG).
            </p>

            <Link
              href='https://youtu.be/FfK5ZXFrQ4Q?si=chXalP-a72KVCisQ'
              target='_blank'
              className='flex space-x-2 text-center pb-[20px]'
            >
              <h2 className='text-2xl underline decoration-ampink text-center'>Watch Demo</h2>
              <FiExternalLink className='top-[9px] relative' />
            </Link>
          </div>
          <div className='bg-gray-50 rounded-lg p-8 md:p-12'>
            <h2 className='text-gray-900  text-3xl font-extrabold mb-2'>Reduce AI hallucination</h2>
            <p className='text-lg font-normal text-gray-500  mb-4'>
              Unlock the power of LLM&lsquo;s logical reasoning and step-by-step thinking with ArcMind&lsquo;s realtime
              Google search and browse websites tools. Explore the knowledge graph and understand the context of the
              content with intitive UI. Reduce AI hullcination and increase the credibility of your result.
            </p>
            <Button gradientDuoTone='purpleToPink' className='text-xl w-[200px]' onClick={() => navigate('/signup')}>
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export const HomeScreen = () => {
  return (
    <section className={style.signinContainer}>
      <Head>
        <title>Home - ArcMindAI</title>
      </Head>

      <MainJumbotron />
    </section>
  )
}
