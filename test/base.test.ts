import { describe, expect, it, vi } from 'vitest'
import { get } from '../src'

global.fetch = vi.fn()

function createFetchResponse(data) {
  return { json: () => new Promise(resolve => resolve(data)) }
}

describe('fetch adapter', () => {
  it('should get some data from server', async () => {
    const todoListResponse = [
      {
        title: 'Unit test',
        done: false,
      },
    ]

    fetch.mockReturnValue(createFetchResponse(todoListResponse))
    const data = await get('https://jsonplaceholder.typicode.com/todos/1')
    expect(data).toMatchInlineSnapshot()
  })
})
