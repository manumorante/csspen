import { useEffect, useState } from 'react'
import getPens from '../services/getPens'

export function usePens () {
  const [loadingPens, setLoadingPens] = useState(true)
  const [pens, setPens] = useState(false)

  useEffect(() => {
    getPens()
      .then(pens => {
        setTimeout(() => {
          setPens(pens)
          setLoadingPens(false)
        }, 2000)
      })
  }, [])

  return { loadingPens, pens }
}
