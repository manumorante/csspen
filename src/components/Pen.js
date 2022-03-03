import React, { useEffect, useReducer } from 'react'
import { getPen } from '../js/getPen'
import useHash from '../js/useHash'
import { reducer } from '../js/reducer'
import Styles from './Styles'
import Html from './Html'
import Code from './Code'
import PenList from './PenList'
import Controls from './Controls'
import Progress from './Progress'

// Pen object: initial state
const initialState = {
  loading: false,
  loaded: false,
  autoplay: false,
  step: -1,
}

export default function Pen() {
  const hash = useHash()
  const [pen, dispatch] = useReducer(reducer, initialState)

  // Fetch Pen from DB and dispatch reducer to set pen
  useEffect(() => {
    if (hash === pen.slug || pen.loading) return false

    dispatch({ type: 'LOADING' })
    getPen(hash).then((pen) => {
      if (!pen)
        console.error(`Error: getPen response hash(${hash}) pen(${pen})`)

      dispatch({ type: 'HIDE_MENU' })
      dispatch({ type: 'SET_PEN', pen: pen })
    })
  }, [hash, pen.loading, pen.slug])

  // Dispatch update pen when Step change
  useEffect(() => {
    if (pen.step < 0) return false

    dispatch({ type: 'UPDATE_STEP' })
  }, [pen.step])

  // Play
  useEffect(() => {
    if (pen.autoplay) {
      // Wait for more time at first (last) step (to see the complete paint)
      const speed = pen.step === 0 ? 2000 : 1000

      const timeout = setTimeout(() => {
        if (pen.step >= pen.totalSteps - 1) dispatch({ type: 'STOP' })
        else dispatch({ type: 'NEXT_STEP' })
      }, speed)

      return () => clearTimeout(timeout)
    }
  }, [pen.autoplay, pen])

  // Rewind
  useEffect(() => {
    if (pen.rewind) {
      // Wait for more time at first (last) step (to see the complete paint)
      const speed = pen.step === pen.totalSteps - 1 ? 2000 : 200

      const timeout = setTimeout(() => {
        if (pen.step <= 0) dispatch({ type: 'PLAY' })
        else dispatch({ type: 'PREV_STEP' })
      }, speed)

      return () => clearTimeout(timeout)
    }
  }, [pen.rewind, pen])

  return (
    <div className={`Pen ${pen.menu}`}>
      <div className='PenList'>
        <button
          className='Button PenList__close'
          onClick={() => {
            dispatch({ type: 'HIDE_MENU' })
          }}
        >
          Close
        </button>

        <PenList active={hash} />
      </div>

      <div className='Editor' style={{ background: pen.bg }}>
        <div className='Editor__code'>
          <div className='Editor__step-info'>{pen.stepInfo}</div>

          <Code pen={pen} />
          <Controls pen={pen} dispatch={dispatch} />
        </div>

        <div className='Stage'>
          <Html pen={pen} />
          <div className='Stage__progress'>
            <Progress pen={pen} />
          </div>
        </div>

        <Styles pen={pen} />
      </div>
    </div>
  )
}
