import Link from 'next/link'

export const ShutdownLetter = () => {
  return (
    <div className='py-12 px-6 mx-auto max-w-3xl bg-white rounded-lg shadow-md'>
      <h1 className='text-2xl md:text-3xl font-bold text-gray-800 mb-6'>A Letter from Our Founders</h1>
      <p className='text-base md:text-lg text-gray-700 mb-4'>Dear Arcmind AI Community,</p>
      <p className='text-base md:text-lg text-gray-700 mb-4'>
        We regret to inform you that Arcmind AI will be{' '}
        <span className='font-semibold'>shutting down on 31st August 2025</span>. You will still be able to log in and
        use Arcmind AI until the end of your current subscription.
      </p>
      <p className='text-base md:text-lg text-gray-700 mb-4'>
        Please note that your subscription will not be renewed; this current period will be the final one. We are deeply
        grateful for your support, trust, and the opportunity to serve you over the years.
      </p>
      <p className='text-base md:text-lg text-gray-700 mb-4'>
        From all of us at Arcmind AI, thank you for being part of our journey. It has been an honor to have you with us.
      </p>
      <p className='text-base md:text-lg text-gray-700'>
        For any questions, please contact us at{' '}
        <a href='mailto:support@arcmindai.app' className='text-blue-600 underline'>
          support@arcmindai.app
        </a>
        .
      </p>
      <div className='mt-8 text-center'>
        <Link href='/' className='text-blue-600 underline hover:text-blue-800'>
          Return to Home
        </Link>
      </div>
    </div>
  )
}
