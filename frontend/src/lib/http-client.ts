import { clog } from './utils'

const API_URL = 'http://localhost:1337/api'

type OptionsType = Parameters<typeof fetch>[1]

class HttpClient {
  baseUrl: string
  defaultOpts: OptionsType

  constructor(baseUrl: string, defaultOpts: OptionsType = {}) {
    this.baseUrl = baseUrl.slice(-1) === '/' ? baseUrl.slice(0, -1) : baseUrl
    this.defaultOpts = defaultOpts
  }

  async fetch<T>(resource: string, options: OptionsType = {}): Promise<T[]> {
    if (resource.slice(0, 1) !== '/') {
      resource = `/${resource}`
    }

    const url = `${this.baseUrl}${resource}`

    clog.request(url.toString())

    try {
      const response = await fetch(url, { ...this.defaultOpts, ...options })
      const { data } = await response.json()

      clog.response(url.toString(), data)

      return data || []
    } catch (error: any) {
      clog.error(error.message, error)
      return []
    }
  }
}

export default new HttpClient(API_URL)
