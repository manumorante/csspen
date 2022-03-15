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
    <div className={`Pen h-full flex flex-col sm:flex-row ${pen.menu}`}>
      <div className='PenList hidden sm:flex sm:w-48 h-full flex-col gap-4 overflow-scroll'>
        <button
          className='Button sm:hidden PenList__close'
          onClick={() => {
            dispatch({ type: 'HIDE_MENU' })
          }}>
          Close
        </button>

        <PenList active={slug} />
      </div>

      <div className='Editor flex flex-col h-1/2 sm:w-96 sm:h-full sm:flex sm:flex-col'>
        <PlayControls pen={pen} dispatch={dispatch} />
        <StepInfo pen={pen} dispatch={dispatch} />
        <Code pen={pen} dispatch={dispatch} />
      </div>

      <div className='Stage w-full h-full flex flex-col flex-grow '>
        <Html pen={pen} />
        <Progress pen={pen} />
      </div>

      <Styles pen={pen} />
    </div>
  )
}
