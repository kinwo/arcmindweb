import { Identity } from '@dfinity/agent'
import axios from 'axios'

import { log } from '../util/log'

const API_KEY: string = process.env.NEXT_PUBLIC_API_KEY ?? ''
const QUERY_CONTROLLER_URL: string = process.env.NEXT_PUBLIC_QUERY_CONTROLLER_URL ?? ''
const QUERY_STRIPE_CUSTOMER_URL: string = process.env.NEXT_PUBLIC_QUERY_STRIPE_CUSTOMER_URL ?? ''
const IS_TESTING: boolean = process.env.NEXT_PUBLIC_IS_TESTING === 'true'

export const queryUserController = async (identity: Identity): Promise<string | null> => {
  // make HTTP request using axios to /queryController to get the controllerId
  try {
    const principalId = identity.getPrincipal().toString()
    const response = await axios.get(QUERY_CONTROLLER_URL, {
      params: {
        apiKey: API_KEY,
        owner: principalId,
        isTesting: IS_TESTING,
      },
    })

    const controllerId = response.data
    return controllerId
  } catch (error) {
    log.error('Error in /queryController', error)
    return null
  }
}

export const queryStripeCustomer = async (identity: Identity): Promise<string | null> => {
  // make HTTP request using axios to /queryStripeCustomer to get the Stripe Customer
  try {
    const principalId = identity.getPrincipal().toString()
    const response = await axios.get(QUERY_STRIPE_CUSTOMER_URL, {
      params: {
        apiKey: API_KEY,
        owner: principalId,
        isTesting: IS_TESTING,
      },
    })

    const controllerId = response.data
    return controllerId
  } catch (error) {
    log.error('Error in /queryStripeCustomer', error)
    return null
  }
}
