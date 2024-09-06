import { revalidateTag } from 'next/cache'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

interface ApiOptions {
  cache?: boolean
  tag?: string
  headers?: Record<string, string>
}

class Api {
  private baseUrl: string

  constructor(baseUrl: string) {
    if (!baseUrl) {
      throw new Error(
        'BACKEND_BASE_URL is not defined in the environment variables'
      )
    }
    this.baseUrl = baseUrl
  }

  private async request<T>(
    method: HttpMethod,
    url: string,
    params: Record<string, string | number | boolean> = {},
    options: ApiOptions = {}
  ): Promise<T> {
    const { cache = false, tag, headers = {} } = options
    const queryString = new URLSearchParams(
      Object.entries(params).map(([key, value]) => [key, value.toString()])
    ).toString()
    const fullUrl = `${this.baseUrl}${url}${queryString ? `?${queryString}` : ''}`

    const requestOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      cache: cache ? 'force-cache' : 'no-store',
    }

    try {
      const response = await fetch(fullUrl, requestOptions)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      if (tag) {
        revalidateTag(tag)
      }

      return await response.json()
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  get<T>(
    url: string,
    params?: Record<string, string | number | boolean>,
    options?: ApiOptions
  ): Promise<T> {
    return this.request<T>('GET', url, params, options)
  }

  post<T>(
    url: string,
    params?: Record<string, string | number | boolean>,
    options?: ApiOptions
  ): Promise<T> {
    return this.request<T>('POST', url, params, options)
  }

  put<T>(
    url: string,
    params?: Record<string, string | number | boolean>,
    options?: ApiOptions
  ): Promise<T> {
    return this.request<T>('PUT', url, params, options)
  }

  delete<T>(
    url: string,
    params?: Record<string, string | number | boolean>,
    options?: ApiOptions
  ): Promise<T> {
    return this.request<T>('DELETE', url, params, options)
  }

  patch<T>(
    url: string,
    params?: Record<string, string | number | boolean>,
    options?: ApiOptions
  ): Promise<T> {
    return this.request<T>('PATCH', url, params, options)
  }
}

const api = new Api(process.env.BACKEND_BASE_URL as string)

export default api
