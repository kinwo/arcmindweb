import { customAlphabet } from 'nanoid/non-secure'

// 7-character random string
export const randomId = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 7)
