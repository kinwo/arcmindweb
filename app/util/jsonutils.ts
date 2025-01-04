export const isJSON = (obj: unknown | null | undefined) => {
  if (obj === null || obj === undefined) {
    return false
  }
  return typeof obj === 'object' && obj.constructor === Object
}
