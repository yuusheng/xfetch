import type { Methods } from './types'

function fetchAdapter(url: string, config: RequestInit) {
  const headers = { 'Content-Type': 'application/json' }
  const customConfig = {
    ...config,
    headers: {
      ...headers,
      ...config.headers,
    },
  }
  return fetch(url, customConfig)
    .then(async (res) => {
      if (res.ok)
        return res.json()

      const errMessage = await res.text()
      return Promise.reject(new Error(errMessage))
    })
}

function fetchFactory(method: Methods) {
  return (url: string, config: Exclude<RequestInit, 'method'> = {}) => {
    return fetchAdapter(url, {
      ...config,
      method: method.toUpperCase(),
    })
  }
}

const methods = ['get', 'post', 'put', 'delete'] as const
export const [get, post, put, del] = methods.map(fetchFactory)

export const xfetch = fetchAdapter
