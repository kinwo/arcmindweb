import React from 'react'
import { Button as FRButton, Spinner } from 'flowbite-react'
import { useControllerId } from './useControllerId'
import { useInternetIdentity } from '../auth/InternetIdentity'
import { Button } from '../library/Button'
import { useNavigate } from 'react-router-dom'

type SuccessDisplayProps = {
  sessionId: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const SuccessDisplay = (props: SuccessDisplayProps) => {
  const { identity } = useInternetIdentity()
  const { controllerId } = useControllerId(identity)
  const navigate = useNavigate()

  const hasProvisioned = controllerId !== null

  return (
    <section className='flex flex-col'>
      <div className='pb-[16px]'>
        <div className=''>
          <h3 className='font-semibold'>Subscription to ArcMind AI Starter plan is successful!</h3>
        </div>
      </div>

      {!hasProvisioned && (
        <>
          <FRButton color='gray'>
            <Spinner color='purple' aria-label='Provisioning' size='xl' />
            <span className='pl-3 text-[16px]'>Provisioning your ArcMind AI instance...</span>
          </FRButton>
          <div className='text-center p-2'>This process will take about 2 mins</div>
        </>
      )}

      {hasProvisioned && (
        <>
          <span className='text-[16px] text-center'>Your ArcMind AI is ready!</span>
          <Button onClick={() => navigate(`/ai/${controllerId}`)}>Open ArcMind AI</Button>
        </>
      )}
    </section>
  )
}
