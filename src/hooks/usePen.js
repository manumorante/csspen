import { useEffect, useState } from 'react'
import getPens from '../services/getPens'

export function usePen (paramId) {
  const id = paramId
  const [loadingPen, setLoadingPen] = useState(true)
  const [pen, setPen] = useState([])

  useEffect(() => {
    setLoadingPen(true)
    getPens()
      .then(pens => {
        const goPen = pens.find(item => item.id === id)
        setPen(goPen)
        setLoadingPen(false)
      })
  }, [id])

  return { loadingPen, pen }
}
