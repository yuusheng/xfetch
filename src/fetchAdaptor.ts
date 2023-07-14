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

function fetchFactory(method: 'get' | 'post' | 'put' | 'delete') {
  return function (url: string, config: Exclude<RequestInit, 'method'> = {}) {
    return fetchAdapter(url, {
      ...config,
      method: method.toUpperCase(),
    })
  }
}

export const get = fetchFactory('get')
export const post = fetchFactory('post')
export const put = fetchFactory('put')
export const del = fetchFactory('delete')

export const xFetch = fetchAdapter
