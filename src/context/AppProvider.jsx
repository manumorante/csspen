import React, { useState, useEffect, createContext, useContext } from 'react'
import { GetPensUseCase } from '../js/GetPensUseCase'

const pensContext = createContext()
const setCurrentPenContext = createContext()

export function usePens() {
  return useContext(pensContext)
}

export function useSetCurrentPen() {
  return useContext(setCurrentPenContext)
}

const DEFAULT_PEN = 'heart'

export default function AppProvider({ children }) {
  const [pens, setPens] = useState({ pens: [], cpen: {}, step: 0 })

  // Select the pen by id from pens context
  const selectPen = (pens, id) => {
    const pen = pens.find((p) => p.id === id)
    if (!pen || pen.length <= 0) return false
    return pen
  }

  // Get all pens and their steps from database
  // and set de current pen
  useEffect(() => {
    const GetPens = new GetPensUseCase()
    GetPens.execute().then((pens) => {
      setPens({
        cpen: selectPen(pens, DEFAULT_PEN),
        pens: pens,
        step: 0,
      })
    })
  }, [])

  // 
  function setCurrentPen(penID) {
    const pen = selectPen(pens.pens, penID)
    if (!pen) return

    setPens((prevData) => {
      return {
        pens: prevData.pens,
        cpen: pen,
        step: 0,
      }
    })
  }

  if (!pens) return null

  return (
    <pensContext.Provider value={pens}>
      <setCurrentPenContext.Provider value={setCurrentPen}>
        {children}
      </setCurrentPenContext.Provider>
    </pensContext.Provider>
  )
}
