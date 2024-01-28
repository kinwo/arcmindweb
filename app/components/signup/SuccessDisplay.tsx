import { createFBFuncURL } from '@/app/url'
import React from 'react'
import { Button } from '../library/Button'

type SuccessDisplayProps = {
  sessionId: string
}

export const SuccessDisplay = ({ sessionId }: SuccessDisplayProps) => {
  const createPortalURL = createFBFuncURL('/stripecreateportalsession')

  return (
    <section>
      <div className='pb-[16px]'>
        <div className=''>
          <h3 className='font-semibold'>Subscription to ArcMind AI Starter plan successful!</h3>
        </div>
      </div>

      <form action={createPortalURL} method='POST' className='mx-auto'>
        <input type='hidden' id='sessionId' name='sessionId' value={sessionId} />
        <Button id='portal-button' type='submit'>
          Manage your billing information
        </Button>
      </form>
    </section>
  )
}
