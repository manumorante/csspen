import React, { useState, useEffect, useReducer } from 'react'
import useHash from '../js/useHash'
import { supabase } from '../js/supabase'
import { GetPenByIDUseCase } from '../js/GetPenByIDUseCase'
import { reducer } from '../js/reducer'
import Styles from './Styles'
import Html from './Html'
import Code from './Code'
import PenList from './PenList'
import PlayControls from './PlayControls'
import EditControls from './EditControls'
import Progress from './Progress'
import StepInfo from './StepInfo'
import Auth from './Auth'
import Account from './Account'

// Pen object: initial state
const initialState = {
  loading: false,
  loaded: false,
  autoplay: false,
  step: -1,
}

export default function Pen() {
  const [session, setSession] = useState(null)
  const hash = useHash()
  const [pen, dispatch] = useReducer(reducer, initialState)
  const [editorSize, setEditorSize] = useState('340px')

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [session])

  useEffect(() => {
    // Don't fetch if hash is equal to current pen or if loading
    if (hash === pen.id || pen.loading) return false

    dispatch({ type: 'LOADING' })

    // Fetch Pen and dispatch reducer to set pen
    const GetPenByID = new GetPenByIDUseCase()
    GetPenByID.execute({ penID: hash }).then((response) => {
      if (!response) {
        console.error(`Pen not found hash(${hash}). Response:`, response)
        return false
      }

      dispatch({ type: 'HIDE_MENU' })
      dispatch({ type: 'SET_PEN', pen: response, email: session?.user?.email })
    })
  }, [hash, pen, session])

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

        <PenList active={hash} />
        {!session ? (
          <Auth />
        ) : (
          <Account key={session.user.id} session={session} />
        )}
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
