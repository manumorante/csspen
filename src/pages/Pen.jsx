import React, { useState, useEffect, useReducer } from 'react'
import { useParams } from 'react-router-dom'
import { GetPenByIDUseCase } from '../js/GetPenByIDUseCase'
import { reducer } from '../js/reducer'
import Styles from '../components/Styles'
import Html from '../components/Html'
import Code from '../components/Code'
import PenList from '../components/PenList'
import PlayControls from '../components/PlayControls'
import EditControls from '../components/EditControls'
import Progress from '../components/Progress'
import StepInfo from '../components/StepInfo'

// Pen object: initial state
const initialState = {
  loading: false,
  loaded: false,
  autoplay: false,
  step: -1,
}

export default function Pen() {
  const { slug = 'heart' } = useParams()
  const [pen, dispatch] = useReducer(reducer, initialState)
  const [editorSize, setEditorSize] = useState('340px')

  useEffect(() => {
    // Don't fetch if slug is equal to current pen or if loading
    if (slug === pen.id || pen.loading) return false

    dispatch({ type: 'LOADING' })

    // Fetch Pen and dispatch reducer to set pen
    const GetPenByID = new GetPenByIDUseCase()
    GetPenByID.execute({ penID: slug }).then((response) => {
      if (!response) {
        console.error(`Pen not found slug(${slug}). Response:`, response)
        return false
      }

      dispatch({ type: 'HIDE_MENU' })
      dispatch({ type: 'SET_PEN', pen: response })
    })
  }, [slug, pen])

  // Play
  useEffect(() => {
    if (pen.autoplay) {
      const timeout = setTimeout(() => {
        if (pen.step >= pen.totalSteps - 1) dispatch({ type: 'STOP' })
        else dispatch({ type: 'NEXT' })
      }, 1000)

      return () => clearTimeout(timeout)
    }
  }, [pen.autoplay, pen])

  // Rewind
  useEffect(() => {
    if (pen.rewind) {
      const timeout = setTimeout(() => {
        if (pen.step <= 0) dispatch({ type: 'PLAY' })
        else dispatch({ type: 'PREV' })
      }, 1000)

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

        <PenList active={slug} />
      </div>

      <div
        className='Editor'
        style={{ background: pen.bg, '--editor-width': editorSize }}>
        <div className='Editor__code'>
          <StepInfo pen={pen} dispatch={dispatch} />
          <Code pen={pen} dispatch={dispatch} />
          <div>
            <PlayControls pen={pen} dispatch={dispatch} />
            <EditControls pen={pen} dispatch={dispatch} />
          </div>
        </div>

        <div className='Stage relative grid auto transition-all'>
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
