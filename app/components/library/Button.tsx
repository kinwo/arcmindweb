import React from 'react'

import { Button as FBButton } from 'flowbite-react'

type ButtonProps = {
  children: React.ReactNode
  id?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  outline?: boolean
}

export const Button = ({ children, ...rest }: ButtonProps) => {
  return (
    <FBButton gradientDuoTone='purpleToPink' className='min-w-[200px]' {...rest}>
      {children}
    </FBButton>
  )
}
