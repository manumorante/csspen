import React, { useEffect, useReducer } from 'react'
import { useParams } from 'react-router-dom'
import { GetPenByIDUseCase } from '../js/GetPenByIDUseCase'
import { reducer } from '../js/reducer'
import Styles from '../components/Styles'
import Html from '../components/Html'
import Code from '../components/Code'
import List from '../components/List'
import Controls from '../components/Controls'
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
    GetPenByID.execute({ penID: slug }).then((penObtained) => {
      if (!penObtained) {
        console.error(`Pen not found slug(${slug}). penObtained:`, penObtained)
        return false
      }

      dispatch({ type: 'CLOSE_MENU' })
      dispatch({ type: 'SET_PEN', pen: penObtained })
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
    <div className='overflow-y-auto grid grid-rows-2 sm:grid-rows-1 sm:grid-cols-[200px_400px_auto]'>
      <div className='hidden sm:block sm:relative bg-neutral-900'>
        <div
          className={`Button absolute z-30 top-6 right-6 sm:hidden ${
            !pen.menuIsOpen && 'hidden'
          }`}
          onClick={() => {
            dispatch({ type: 'CLOSE_MENU' })
          }}>
          {/* TODO import this svg */}
          <svg
            className='h-8 w-8 text-white'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'>
            <line x1='15' y1='9' x2='9' y2='15' />
            <line x1='9' y1='9' x2='15' y2='15' />
          </svg>
        </div>
        <List active={slug} />
      </div>

      <div className='p-6 sm:h-full overflow-y-auto bg-neutral-900'>
        <Controls pen={pen} dispatch={dispatch} />
        <StepInfo pen={pen} dispatch={dispatch} />
        <Code pen={pen} dispatch={dispatch} />
      </div>

      <div
        className='overflow-hidden sm:h-full relative'
        style={{ background: pen.bg }}>
        <Html pen={pen} />
        <Progress pen={pen} />
        <Styles pen={pen} />
      </div>
    </div>
  )
}
