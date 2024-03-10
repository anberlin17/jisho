import { IDictEntryResponse, INovel } from '@/types'
import httpClient from './http-client'

export async function fetchLexemes(slug: string, options: RequestInit = {}) {
  if (!slug) {
    return []
  }

  const data = await httpClient.fetch<IDictEntryResponse>(`lexeme/search/${slug}`, options)
  return data
}

export async function fetchNovel(slug: string) {
  if (!slug) {
    return
  }

  const data = await httpClient.fetch<INovel>(`novels/${slug}`)
  return data[0]
}

export async function fetchNovelsList() {
  const data = await httpClient.fetch<INovel>('novels')
  return data
}

export async function saveNovel(data: INovel) {
  const response = await httpClient.fetch<INovel>('novel', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return response
}
