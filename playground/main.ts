import { get } from '../src'

const root = document.querySelector('#root')!

export interface GetResponse {
  userId: number
  id: number
  title: string
  completed: boolean
}

function getData() {
  return get('https://jsonplaceholder.typicode.com/todos/1')
}

async function main() {
  const data = await getData()

  const h2 = document.createElement('h2')
  h2.innerText = 'Get Data'
  root.appendChild(h2)
  const ul = document.createElement('ul')
  const li = document.createElement('li')
  li.setAttribute('id', data.id)
  li.innerText = data.title
  ul.appendChild(li)
  root.appendChild(ul)
}

main()
