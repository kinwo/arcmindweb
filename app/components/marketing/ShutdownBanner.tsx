import Link from 'next/link'

export const ShutdownBanner = () => {
  return (
    <div
      id='sticky-banner'
      tabIndex={-1}
      className='top-0 left-0 w-[100%] z-50 flex justify-center px-4 py-4 bg-gradient-to-r from-red-600 via-red-500 to-orange-400 shadow-lg rounded-b-lg border-b-1 border-red-700 animate-fade-in'
    >
      <div className='flex items-center max-w-2xl w-full'>
        <p className='flex items-center w-full text-base md:text-lg font-medium text-white text-center'>
          <span className='w-full'>
            <span className='block text-lg md:text-xl font-bold mb-1'>A message from our founders</span>
            <span className='block'>
              Arcmind AI will be shutting down on <span className='font-bold text-xl italic'>31st August 2025</span>.
            </span>
            <span className='block mt-2'>We are deeply grateful for your support and trust over the years.</span>
            <span className='block'>Thank you for being part of our journey.</span>
            <span className='block mt-3 text-center'>
              <Link href='/shutdown-letter' className='text-white underline font-semibold hover:text-gray-100'>
                Read the full letter from our founders
              </Link>
            </span>
          </span>
        </p>
      </div>
    </div>
  )
}
