/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['pages', 'ui'],
  },
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/',
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/terms',
        destination: 'https://arcmindai.freshdesk.com/support/solutions/articles/51000387378-terms-of-use',
        permanent: true,
      },
      {
        source: '/privacy',
        destination: 'https://arcmindai.freshdesk.com/support/solutions/articles/51000387379-privacy-policy',
        permanent: true,
      },
      {
        source: '/support',
        destination: 'https://arcmindai.freshdesk.com/support/home',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
