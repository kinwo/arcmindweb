import type { Config } from 'tailwindcss';

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
  plugins: [require('flowbite/plugin')],
};
export default config;
