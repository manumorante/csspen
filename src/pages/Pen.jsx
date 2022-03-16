import React, { useEffect, useReducer } from 'react'
import { useParams } from 'react-router-dom'
import { GetPenByIDUseCase } from '../js/GetPenByIDUseCase'
import { reducer } from '../js/reducer'
import { layout } from '../styles.js'
import Styles from '../components/Styles'
import Html from '../components/Html'
import Code from '../components/Code'
import PenList from '../components/PenList'
import PlayControls from '../components/PlayControls'
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

  return (
    <div className={`Pen ${layout.pen} ${pen.menu}`}>
      <PenList active={slug} />

      <div className={`Editor ${layout.editor} bg-neutral-900`}>
        <PlayControls pen={pen} dispatch={dispatch} />
        <StepInfo pen={pen} dispatch={dispatch} />
        <Code pen={pen} dispatch={dispatch} />
      </div>

      <div className={`Stage ${layout.stage}`}>
        <Html pen={pen} />
        <Progress pen={pen} />
      </div>

      <Styles pen={pen} />
    </div>
  )
}
