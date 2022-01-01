import { useEffect, useState } from 'react'
import getPens from '../services/getPens'

export function usePens (activePen) {
  const [loadingPens, setLoadingPens] = useState(false)
  const [pens, setPens] = useState([])

  useEffect(function () {
    setLoadingPens(true)
    getPens()
      .then(pens => {
        setPens(pens)
        setLoadingPens(false)
      })
  }, [])

  return { loadingPens, pens }
}
