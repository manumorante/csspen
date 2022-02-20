import { useEffect, useState } from 'react'
import getPens from './getPens'

export function usePens () {
  const [loadingPens, setLoadingPens] = useState(true)
  const [pens, setPens] = useState(false)

  useEffect(() => {
    getPens()
      .then(pens => {
        setPens(pens)
        setLoadingPens(false)
      })
  }, [])

  return { loadingPens, pens }
}
