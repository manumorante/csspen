import { useEffect, useState } from 'react'
import getPens from '../services/getPens'

export function usePen (paramId) {
  const id = paramId
  const [loading, setLoading] = useState(false)
  const [pen, setPen] = useState([])

  // find pen
  function findPen (pens) {
    const pen = pens.find(item => item.id == id)
    console.log('pen:', pen)
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

  return { loading, pen }
}
