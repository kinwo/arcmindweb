'use client';

import { Spinner } from 'flowbite-react';

export const CenterSpinner = ({}) => {
  return (
    <div className="flex justify-center">
      <Spinner color="info" size="lg" />
    </div>
  );
};
