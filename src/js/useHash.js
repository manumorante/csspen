import { useEffect, useState } from 'react'
const DEFAULT_PEN_ID = 'heart'

export default function useHash () {
  const currentHash = () => window.location.hash.replace('#', '') || DEFAULT_PEN_ID
  const [hash, setHash] = useState(currentHash())

  useEffect(() => {
    const handlerHashChange = () => setHash(currentHash())
    window.addEventListener('hashchange', handlerHashChange)

    return () => window.removeEventListener('hashchange', handlerHashChange)
  }, [hash])

  return hash
}
