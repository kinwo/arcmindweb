import React, { useEffect, useState } from 'react'

import { createFBFuncURL } from '@/app/url'
import { useInternetIdentity } from '../auth/InternetIdentity'
import { Button } from '../library/Button'
import { queryStripeCustomer } from '@/app/client/user'
import { log } from '@/app/util/log'
import { CenterSpinner } from '../Spinner'

export const ManageSubscription = () => {
  const { identity, isAuthenticated } = useInternetIdentity()
  const [isLoading, setLoading] = useState(false)
  const [customer, setCustomer] = useState<string | null>(null)

  const createPortalURL = createFBFuncURL('/stripecreateportalsession')

  useEffect(() => {
    if (isAuthenticated && identity) {
      const loadCustomer = async () => {
        try {
          setLoading(true)
          const stripeCustomer = await queryStripeCustomer(identity)
          setCustomer(stripeCustomer)
        } catch (error) {
          log.error('Error in loadCustomer', error as Error)
        } finally {
          setLoading(false)
        }
      }

      loadCustomer()
    }
  }, [identity, isAuthenticated])

  return (
    <section className='flex flex-col gap-6'>
      {isLoading && <CenterSpinner />}

      {!isLoading && customer && (
        <form action={createPortalURL} method='POST' className='mx-auto'>
          <input type='hidden' id='customerId' name='customerId' value={customer} />
          <Button id='portal-button' type='submit'>
            Manage your subscription
          </Button>
        </form>
      )}

      {!isLoading && !customer && (
        <p className='text-center'>You don&apos;t have a subscription yet. Please subscribe to use the ArcMind AI.</p>
      )}
    </section>
  )
}
