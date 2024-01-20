import React from 'react';

import { Button as FBButton } from 'flowbite-react';

type ButtonProps = {
  children: React.ReactNode;
  id?: string;
  type?: 'button' | 'submit' | 'reset';
};

export const Button = ({ children, ...rest }: ButtonProps) => {
  return (
    <FBButton
      gradientDuoTone="purpleToPink"
      className="min-w-[200px] px-4"
      {...rest}
    >
      {children}
    </FBButton>
  );
};
