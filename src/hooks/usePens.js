import {useContext, useEffect, useState} from 'react'
import getPens from '../services/getPens'
import pensContext from '../context/PensContext'

export function usePens () {
  const [loading, setLoading] = useState(false)
  const {pens, setPens} = useContext(pensContext)

  useEffect(function () {
    setLoading(true)
    getPens()
      .then(pens => {
        setPens(pens)
        setLoading(false)
      })
  }, [setPens])

  return { loading, pens }
}
