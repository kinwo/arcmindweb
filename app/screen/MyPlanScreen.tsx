import React from 'react'
import { ManageSubscription } from '../components/subscription/ManageSubscription'

import style from './MyPlanScreen.module.css'

export const MyPlanScreen = () => {
  return (
    <main className={style.myPlanContainer}>
      <ManageSubscription />
    </main>
  )
}
