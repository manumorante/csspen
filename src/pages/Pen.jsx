import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useApiContext } from '../context/ApiContext'
import classNames from 'classnames'
import { XIcon } from '@heroicons/react/solid'
import Btn from '../components/Btn'
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

    dispatch({ type: 'SET_PEN', id: slug })

    if (state.isMobile) dispatch({ type: 'CLOSE_MENU' })
  }, [slug, state.loaded])

  // Autoplay
  useEffect(() => {
    if (!state.loaded) return

    if (state.playing) {
      const timeout = setTimeout(() => {
        if (state.step >= state.pen.steps.length - 1) {
          dispatch({ type: 'STOP' })
        } else {
          dispatch({ type: 'NEXT' })
        }
      }, 1000)

      return () => clearTimeout(timeout)
    }
  }, [state.loaded, state.playing, state.step])

  const menuClass = classNames('[Menu] bg-neutral-900 md:block md:relative', {
    hidden: state.menuClosed,
  })

  const pageClass = classNames(
    'h-full grid sm:grid-rows-1 overflow-y-auto transition-all',
    {
      'grid-rows-[auto_300px]': state.writing,
      'grid-rows-[160px_auto]': !state.writing,
      'sm:grid-cols-[200px_400px_auto]': !state.menuClosed,
      'sm:grid-cols-[0px_600px_auto]': state.menuClosed,
    }
  )

  if (!state.loaded) return null

  return (
    <div className={pageClass}>
      <div className={menuClass}>
        <Btn
          acc={() => dispatch({ type: 'CLOSE_MENU' })}
          className='absolute z-30 top-6 right-6 sm:hidden'>
          <XIcon />
        </Btn>
        <List active={state.pen.id} />
      </div>

      <div className='p-6 sm:h-full overflow-y-auto bg-neutral-900'>
        <Controls state={state} dispatch={dispatch} />
        <StepInfo pen={state.pen} step={state.step} dispatch={dispatch} />
        <Code css={state.pen.steps[state.step].css} dispatch={dispatch} />
      </div>

      <div
        className='overflow-hidden sm:h-full relative'
        style={{ background: state.pen.colors.c3 }}>
        {/* <div className='[guide] absolute z-20 inset-0 m-auto w-pen h-pen border border-dashed rounded-sm border-red-400/50'></div> */}
        <Html
          html={state.pen.html}
          classes='absolute inset-0 m-auto w-pen h-pen grid place-items-center transition-all-children'
        />
        <Progress pen={state.pen} step={state.step} />
        <Style css={state.pen.steps[state.step].css} />
      </div>
    </div>
  )
}
