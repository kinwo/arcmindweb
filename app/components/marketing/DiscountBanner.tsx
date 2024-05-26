import React from 'react'

export const DiscountBanner = () => {
  return (
    <div id='sticky-banner' tabIndex={-1} className='relative top-0 start-0 flex justify-between py-4 mr-[60px]'>
      <div className='flex items-center mx-auto'>
        <p className='flex items-center text-sm font-normal text-gray-500 '>
          <span className='inline-flex p-1 me-3 bg-gray-200 rounded-full w-6 h-6 items-center justify-center flex-shrink-0'>
            <svg
              className='w-3 h-3 text-pink-400'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              viewBox='0 0 18 19'
            >
              <path d='M15 1.943v12.114a1 1 0 0 1-1.581.814L8 11V5l5.419-3.871A1 1 0 0 1 15 1.943ZM7 4H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2v5a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V4ZM4 17v-5h1v5H4ZM16 5.183v5.634a2.984 2.984 0 0 0 0-5.634Z' />
            </svg>
            <span className='sr-only'>Light bulb</span>
          </span>
          <span className='text-center'>
            Enjoy early adopters 1st month 50% discount on starter plan. Use code{' '}
            <code className='text-md font-semibold text-pink-400 '>COFAI50</code>
          </span>
        </p>
      </div>
    </div>
  )
}
