import { API_URL } from './settings'

const parsePens = apiResponse => {
  const { list = [] } = apiResponse

  const pens = list.map(pen => {
    const { id, name, description, html, steps } = pen
    return { id, name, description, html, steps }
  })

  return pens
}

export default function getPens () {
  return fetch(API_URL)
  .then(res => res.json())
  .then(parsePens)
}
