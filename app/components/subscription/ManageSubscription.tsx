import { createFBFuncURL } from '@/app/url'
import React from 'react'
import { useInternetIdentity } from '../auth/InternetIdentity'
import { Button } from '../library/Button'

export const ManageSubscription = () => {
  const { identity } = useInternetIdentity()
  const ownerPrincipalId = identity?.getPrincipal().toString() ?? ''

  const createPortalURL = createFBFuncURL('/stripecreateportalsession')

  return (
    <section className='flex flex-col gap-6'>
      <form action={createPortalURL} method='POST' className='mx-auto'>
        <input type='hidden' id='customerId' name='customerId' value={ownerPrincipalId} />
        <Button id='portal-button' type='submit'>
          Manage your subscription
        </Button>
      </form>
    </section>
  )
}
