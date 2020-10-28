import { useEffect, useState } from 'react'
import getPens from '../services/getPens'

export function usePen (paramId) {
  const id = paramId
  const [loading, setLoading] = useState(true)
  const [pen, setPen] = useState([])
  const [totalSteps, setTotalSteps] = useState(0)

  useEffect(() => {
    setLoading(true)
    getPens()
      .then(pens => {
        const goPen = pens.find(item => item.id === id)
        setTotalSteps(goPen.steps.length)
        setPen(goPen)
        setLoading(false)
      })
  }, [setPen, id])

  return { loading, pen, totalSteps }
}
