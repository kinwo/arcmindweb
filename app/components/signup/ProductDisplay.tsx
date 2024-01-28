import React, { useState, useEffect } from 'react'
import { Button } from '../library/Button'
import { Card } from 'flowbite-react'
import { CheckCircle } from '../icons'
import { useInternetIdentity } from '../auth/InternetIdentity'
import { createFBFuncURL } from '@/app/url'
import { useNavigate } from 'react-router-dom'
import { queryUserController } from '@/app/client/user'

type PricingCardProps = {
  title: string
  price: number
}

const PricingCard = ({ title, price }: PricingCardProps) => {
  const { identity, isAuthenticated, authenticate } = useInternetIdentity()

  const ownerPrincipalId = identity?.getPrincipal().toString() ?? ''
  const [controllerId, setControllerId] = useState<string | null>(null)
  const hasExistingPlan = isAuthenticated && controllerId !== null

  const ProductLookupKey = process.env.STRIPE_STARTER_LOOKUP_KEY ?? ''
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

  return (
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
          {!isAuthenticated && <Button onClick={authenticate}>Choose Plan</Button>}

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
  )
}

export const ProductDisplay = () => {
  return (
    <section>
      <PricingCard title='Starter' price={5} />
    </section>
  )
}
