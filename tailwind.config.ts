import type { Config } from 'tailwindcss'

/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */
const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        amorange: '#FFA565',
        amyellow: '#FFE874',
        amgreen: '#81FFA7',
        amblue: '#46ECFF',
        ampink: '#FF98FF',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
}

export default config
