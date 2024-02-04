import React, { useState, useEffect } from 'react'
import { Button } from '../library/Button'
import { Alert, Card } from 'flowbite-react'
import { CheckCircle } from '../icons'
import { useInternetIdentity } from '../auth/InternetIdentity'
import { createFBFuncURL } from '@/app/url'
import { useNavigate } from 'react-router-dom'
import { queryUserController } from '@/app/client/user'
import { queryNumAvailableController } from '@/app/client/canister'
import { CenterSpinner } from '../Spinner'
import { log } from '@/app/util/log'

type PricingCardProps = {
  title: string
  price: number
}

const WaitListCard = () => {
  return (
    <section className='text-center pb-6'>
      <Alert color='info'>
        <span className='font-semibold text-[16px]'>All available ArcMind AI instances have been subscribed</span>
        <div>Please join our waitlist below. We will notify you once new ArcMind AI instances are avaialble.</div>
      </Alert>

      <iframe
        src='https://docs.google.com/forms/d/e/1FAIpQLSf8wjv-Gp0DzIw2C8J32dyE_nBt_LHO6GrGsQR8bS7al31G3g/viewform?embedded=true'
        width='640'
        height='821'
      >
        Loading…
      </iframe>
    </section>
  )
}

const PricingCard = ({ title, price }: PricingCardProps) => {
  const { identity, isAuthenticated, authenticate } = useInternetIdentity()
  const [isLoading, setLoading] = useState(false)
  const [showWaitListForm, setShowWaitListForm] = useState(false)

  const ownerPrincipalId = identity?.getPrincipal().toString() ?? ''
  const [controllerId, setControllerId] = useState<string | null>(null)
  const hasExistingPlan = isAuthenticated && controllerId !== null

  const ProductLookupKey = process.env.NEXT_PUBLIC_STRIPE_STARTER_LOOKUP_KEY ?? ''
  const checkoutSessionURL = createFBFuncURL('/stripecreatecheckoutsession')

  const navigate = useNavigate()

  useEffect(() => {
    const query = async () => {
      if (isAuthenticated && identity) {
        const result = await queryUserController(identity)
        setControllerId(result)
      }
    }

    query()
  }, [identity, isAuthenticated])

  const handleChoosePlan = async () => {
    try {
      setLoading(true)

      const numAvailableControllers = await queryNumAvailableController()

      if (numAvailableControllers === 0) {
        log.info('No available controllers')
        setShowWaitListForm(true)
      } else {
        await authenticate()
      }
    } catch (error) {
      log.error('Error in handleChoosePlan', error as Error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {showWaitListForm && <WaitListCard />}
      {!showWaitListForm && (
        <Card className='max-w-sm'>
          <form action={checkoutSessionURL} method='POST'>
            <h5 className='mb-4 text-xl font-medium text-gray-500 dark:text-gray-400'>{title}</h5>
            <div className='flex items-baseline text-gray-900 dark:text-white'>
              <span className='text-3xl font-semibold'>$</span>
              <span className='text-5xl font-extrabold tracking-tight'>{price}</span>
              <span className='ml-1 text-xl font-normal text-gray-500 dark:text-gray-400'>/month</span>
            </div>
            <ul className='my-7 space-y-5'>
              <li className='flex space-x-3'>
                <CheckCircle />
                <span className='text-base font-normal leading-tight text-gray-500 dark:text-gray-400'>
                  500 chain of thoughts
                </span>
              </li>
              <li className='flex space-x-3'>
                <CheckCircle />
                <span className='text-base font-normal leading-tight text-gray-500 dark:text-gray-400'>
                  Early access of new features
                </span>
              </li>
            </ul>
            <div className='flex flex-col'>
              {!isAuthenticated && <Button onClick={() => handleChoosePlan()}>Choose Plan</Button>}
              {isLoading && <CenterSpinner />}

              {hasExistingPlan && (
                <>
                  <h2 className='text-center py-3'>You have an existing plan</h2>
                  <Button onClick={() => navigate(`/ai/${controllerId}`)}>Open My ArcMind AI</Button>
                </>
              )}

              {isAuthenticated && !hasExistingPlan && (
                <>
                  <Button id='checkout-button' type='submit'>
                    Checkout Now
                  </Button>

                  <input type='hidden' name='lookupKey' value={ProductLookupKey} />
                  <input type='hidden' name='ownerPrincipalId' value={ownerPrincipalId} />
                </>
              )}
            </div>
          </form>
        </Card>
      )}
    </>
  )
}

export const ProductDisplay = () => {
  return (
    <section>
      <PricingCard title='Starter' price={5} />
    </section>
  )
}
