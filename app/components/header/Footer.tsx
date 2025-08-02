import Link from 'next/link'
import { PoweredByICSquare } from '../icons'
import style from './Footer.module.css'

export const Footer = () => {
  return (
    <section className={style.footerContainer}>
      <div className={style.footer}></div>
      <div className='flex flex-row w-full pb-4 space-x-4 justify-center'>
        <div>© 2025 ArcMind AI</div>
        <Link href='https://github.com/arcmindai/arcmindai' target='_blank'>
          GitHub
        </Link>
        <Link href='/terms' target='_blank'>
          Terms
        </Link>
        <Link href='/privacy' target='_blank'>
          Privacy
        </Link>
        <Link href='/support' target='_blank'>
          Support
        </Link>
      </div>

      <Link href='https://internetcomputer.org' target='_blank' className='absolute right-2 bottom-2'>
        <PoweredByICSquare className='w-[68px]' />
      </Link>
    </section>
  )
}
