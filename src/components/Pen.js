import React, { useState, useEffect, useReducer } from 'react'
import useHash from '../js/useHash'
import { GetPenByIDUseCase } from '../js/GetPenByIDUseCase'
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
  const [editorSize, setEditorSize] = useState('340px')

  useEffect(() => {
    // Don't fetch if hash is equal to current pen or if loading
    if (hash === pen.id || pen.loading) return false

    dispatch({ type: 'LOADING' })

    // Fetch Pen and dispatch reducer to set pen
    const GetPenByID = new GetPenByIDUseCase()
    GetPenByID.execute({ penID: hash })
      .then((response) => {
        dispatch({ type: 'HIDE_MENU' })
        dispatch({ type: 'SET_PEN', pen: response })
      })

  }, [hash, pen.loading, pen.id])

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
        else dispatch({ type: 'NEXT' })
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
        else dispatch({ type: 'PREV' })
      }, speed)

      return () => clearTimeout(timeout)
    }
  }, [pen.rewind, pen])

  // Move to custom hook?
  function handleResizeEditor() {
    const sizes = ['0px', '340px', '640px']

    // Closed -> Medium
    if (editorSize === sizes[0]) {
      setEditorSize(sizes[1])

      // Medium -> Large
    } else if (editorSize === sizes[1]) {
      setEditorSize(sizes[2])

      // Large -> Closed
    } else if (editorSize === sizes[2]) {
      setEditorSize(sizes[0])
    }
  }

  return (
    <div className={`Pen ${pen.menu}`}>
      <div className='PenList'>
        <button
          className='Button PenList__close'
          onClick={() => {
            dispatch({ type: 'HIDE_MENU' })
          }}>
          Close
        </button>

        <PenList active={hash} />
      </div>

      <div
        className='Editor'
        style={{ background: pen.bg, '--editor-width': editorSize }}>
        <div className='Editor__code'>
          <div className='Editor__step-info'>{pen.stepInfo}</div>

          <Code pen={pen} dispatch={dispatch} />
          <Controls pen={pen} dispatch={dispatch} />
        </div>

        <div className='Stage'>
          <div className='Editor__resize' onClick={handleResizeEditor}></div>
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
