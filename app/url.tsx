const FBBaseDomain = process.env.NEXT_PUBLIC_FB_FUNC_BASE_DOMAIN ?? ''

export const createFBFuncURL = (prefix: string) => {
  const url = `https://${prefix}-${FBBaseDomain}`
  return url
}
