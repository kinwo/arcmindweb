import axios from 'axios'

import { log } from '../util/log'

const QUERY_NUM_AVAILBLE_CONTROLLER_URL: string = process.env.NEXT_PUBLIC_QUERY_NUM_AVAILBLE_CONTROLLER_URL ?? ''
const API_KEY: string = process.env.NEXT_PUBLIC_API_KEY ?? ''
const IS_TESTING: boolean = process.env.NEXT_PUBLIC_IS_TESTING === 'true'

export const queryNumAvailableController = async (): Promise<number> => {
  // make HTTP request using axios to /queryController to get the controllerId
  try {
    const response = await axios.get(QUERY_NUM_AVAILBLE_CONTROLLER_URL, {
      params: {
        apiKey: API_KEY,
        isTesting: IS_TESTING,
      },
    })

    const numAvailableControllers = response.data
    return numAvailableControllers
  } catch (error) {
    log.error('Error in /queryNumAvailableController', error)
    return 0
  }
}
