import { isArray } from 'lodash'
import { SearchResult, ThoughtContentProps } from './screen/types'

export enum ChatRole {
  system = 'System',
  user = 'User',
  arcmind = 'ArcMind',
}

export type ChatMessage = {
  id: string
  createdAt?: Date
  content: string | Record<string, unknown>
  role: ChatRole
}

export type NewChatMessage = Omit<ChatMessage, 'id'> & {
  id?: ChatMessage['id']
}

export const isSearchResult = (obj: any): obj is SearchResult[] => {
  return isArray(obj) && 'link' in obj[0]
}

export const isThoughtContentProps = (obj: any): obj is ThoughtContentProps => {
  return obj != null && obj !== undefined && typeof obj !== 'string' && 'thought' in obj
}

export const isString = (obj: any): obj is string => {
  return typeof obj === 'string'
}
