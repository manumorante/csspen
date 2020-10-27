import { useEffect, useState } from 'react'
import getPens from '../services/getPens'

export function usePen (paramId) {
  const id = paramId
  const [loading, setLoading] = useState(true)
  const [pen, setPen] = useState([])
  const [totalSteps, setTotalSteps] = useState(0)

  // find pen
  function findPen (pens) {
    const pen = pens.find(item => item.id == id)
    setTotalSteps(pen.steps.length)
    return pen
  }

  useEffect(() => {
    setLoading(true)
    getPens()
      .then(pens => {
        setPen(findPen(pens))
        setLoading(false)
      })
  }, [setPen])

  return { loading, pen, totalSteps }
}
