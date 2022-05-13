import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useApiContext } from '../context/ApiContext'
import classNames from 'classnames'
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

    dispatch({ type: 'TOGGLE_MENU' })
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

  if (!state.pen || Object.keys(state.pen).length === 0) return null

  const menuClass = classNames({
    '[Menu] md:block md:relative bg-neutral-900': true,
    hidden: !state.menuIsOpen,
  })

  const pageClass = classNames(
    'h-full grid sm:grid-rows-1 overflow-y-auto transition-all',
    {
      'grid-rows-[auto_300px]': state.writing,
      'grid-rows-[160px_auto]': !state.writing,
      'sm:grid-cols-[200px_400px_auto]': !state.menuIsOpen,
      'sm:grid-cols-[0px_600px_auto]': state.menuIsOpen,
    }
  )

  return (
    <div className={pageClass}>
      <div className={menuClass}>
        <div
          className='Button absolute z-30 top-6 right-6 sm:hidden'
          onClick={() => dispatch({ type: 'TOGGLE_MENU' })}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </div>
        <List active={slug} />
      </div>

      <div className='p-6 sm:h-full overflow-y-auto bg-neutral-900'>
        <Controls state={state} dispatch={dispatch} />
        <StepInfo pen={state.pen} step={state.step} dispatch={dispatch} />
        <Code css={state.pen.steps[state.step].css} dispatch={dispatch} />
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
