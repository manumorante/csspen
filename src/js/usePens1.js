import { useEffect, useState } from 'react'
import getPens from './getPens'

export default function usePens1 () {
  const [loadingPens, setLoadingPens] = useState(true)
  const [pens1, setPens1] = useState(false)

  useEffect(() => {
    getPens()
      .then(pens1 => {
        setPens1(pens1)
        setLoadingPens(false)
      })
  }, [])

  return { loadingPens, pens1 }
}
