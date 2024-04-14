'use client'

import React from 'react'

import { Alert } from 'flowbite-react'
import { HiInformationCircle } from 'react-icons/hi'

type Props = {
  message: string
}

export const AlertMessage = ({ message }: Props) => {
  return (
    <Alert color='failure' icon={HiInformationCircle} className='my-3'>
      <span>
        <p>{message}</p>
      </span>
    </Alert>
  )
}
