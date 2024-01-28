import React from 'react'

type SuccessDisplayProps = {
  sessionId: string
}

export const SuccessDisplay = ({ sessionId }: SuccessDisplayProps) => {
  return (
    <section>
      <div className='product Box-root'>
        <div className='description Box-root'>
          <h3>Subscription to ArcMind AI Starter plan successful!</h3>
        </div>
      </div>
      <form action='/create-portal-session' method='POST'>
        <input type='hidden' id='sessionId' name='sessionId' value={sessionId} />
        <button id='checkout-and-portal-button' type='submit'>
          Manage your billing information
        </button>
      </form>
    </section>
  )
}
