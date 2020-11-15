import { useEffect, useState } from 'react'
import getPens from '../services/getPens'

export function usePens () {
  const [loading, setLoading] = useState(false)
  const [pens, setPens] = useState([])

  useEffect(function () {
    setLoading(true)
    getPens()
      .then(pens => {
        setPens(pens)
        setLoading(false)
      })
  }, [])

  return { loading, pens }
}
