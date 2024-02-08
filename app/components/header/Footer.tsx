import React from 'react'

import style from './Footer.module.css'
import { PoweredByICSquare } from '../icons'
import Link from 'next/link'

export const Footer = () => {
  return (
    <section className={style.footerContainer}>
      <div className={style.footer}></div>
      <div className='flex flex-row w-full pb-4 space-x-4 justify-center'>
        <div>© 2024 ArcMind</div>
        <Link href='/terms'>Terms</Link>
        <Link href='/privacy'>Privacy</Link>
        <Link href='/support'>Support</Link>
      </div>

      <Link href='https://internetcomputer.org' target='_blank' className='absolute right-2 bottom-2'>
        <PoweredByICSquare className='w-[68px]' />
      </Link>
    </section>
  )
}
