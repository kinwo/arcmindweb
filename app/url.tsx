const FBBaseDomain = process.env.NEXT_PUBLIC_FB_FUNC_BASE_DOMAIN ?? ''
const ISDev = process.env.NEXT_PUBLIC_IS_DEV === 'true'

export const createFBFuncURL = (prefix: string) => {
  const url = `https://${prefix}-${FBBaseDomain}?isDev=${ISDev}`
  return url
}
