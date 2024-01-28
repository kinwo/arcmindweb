// NFID
const NFID_APPLICATION_NAME = 'ArcMindAi'
const NFID_APPLICATION_LOGO_URL = 'https%3A%2F%2Farcmindai.app%2Flogo.png'
const NFID_ORIGIN = process.env.NEXT_PUBLIC_NFID_ORIGIN

const NFID_AUTH_PATH =
  '/authenticate/?applicationName=' +
  NFID_APPLICATION_NAME +
  '&applicationLogo=' +
  NFID_APPLICATION_LOGO_URL +
  '#authorize'

export const NFID_AUTH_PROVIDER_URL = NFID_ORIGIN + NFID_AUTH_PATH
