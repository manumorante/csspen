import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useApiContext } from '../context/ApiContext'
import Style from '../components/Style'
import Html from '../components/Html'
import Code from '../components/Code'
import List from '../components/List'
import Controls from '../components/Controls'
import Progress from '../components/Progress'
import StepInfo from '../components/StepInfo'

export default function Pen() {
  const { slug } = useParams()
  const { state, dispatch } = useApiContext()

  // When url changed
  useEffect(() => {
    if (!state.loaded) return

    dispatch({ type: 'CLOSE_MENU' })
    dispatch({ type: 'SET_PEN', id: slug })
  }, [slug, state.loaded])

  // Play
  useEffect(() => {
    if (!state.loaded) return

    if (state.autoplay) {
      const timeout = setTimeout(() => {
        if (state.step >= state.pen.steps.length - 1) {
          dispatch({ type: 'STOP' })
        } else {
          dispatch({ type: 'NEXT' })
        }
      }, 1000)

      return () => clearTimeout(timeout)
    }
  }, [state.loaded, state.autoplay, state.step])

  // Rewind
  useEffect(() => {
    if (state.rewind) {
      const timeout = setTimeout(() => {
        if (state.step <= 0) dispatch({ type: 'PLAY' })
        else dispatch({ type: 'PREV' })
      }, 1000)

      return () => clearTimeout(timeout)
    }
  }, [state.rewind, state.step])

  if (!state.pen || Object.keys(state.pen).length === 0) return null

  return (
    <div className='h-full grid grid-rows-2 sm:grid-rows-1 sm:grid-cols-[200px_400px_auto] overflow-y-auto'>
      <div className='hidden md:block md:relative bg-neutral-900'>
        <div
          className={`Button absolute z-30 top-6 right-6 sm:hidden ${
            !state.menuIsOpen && 'hidden'
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
        <Controls state={state} dispatch={dispatch} />
        <StepInfo pen={state.pen} step={state.step} dispatch={dispatch} />
        <Code state={state} dispatch={dispatch} />
      </div>

      <div
        className='overflow-hidden sm:h-full relative'
        style={{ background: state.pen.colors.c3 }}>
        <Html
          html={state.pen.html}
          classes='grid place-items-center h-full transition-all-children'
        />
        <Progress pen={state.pen} step={state.step} />
        <Style css={state.pen.steps[state.step].css} />
      </div>
    </div>
  )
}
