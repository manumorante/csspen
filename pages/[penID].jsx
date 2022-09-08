import React, { useReducer } from 'react'
import { getPaths, getPens } from 'database'
import { reducer, initialState } from 'lib/reducer'
import { useAutoplay } from 'lib/useAutoplay'
import { ChevronDoubleUpIcon, ChevronUpIcon, XIcon } from '@heroicons/react/solid'
import cx from 'classnames'
import PenHead from 'components/PenHead'
import PenList from 'components/PenList'
import Button from 'components/Button'
import Code from 'components/Code'
import When from 'components/When'

export default function PenIndex(props) {
  const { pens, penID } = props
  const [state, dispatch] = useReducer(reducer, initialState({ pens, penID }))
  useAutoplay(state, dispatch)

  const handleCardClick = (id) => dispatch({ type: 'SET_PEN', id })
  const handlePrevStep = () => dispatch({ type: 'PREV_STEP' })
  const handleNextStep = () => dispatch({ type: 'NEXT_STEP' })
  const handleCodeFull = () => dispatch({ type: 'FULL_CODE' })
  const handleCodeMid = () => dispatch({ type: 'MID_CODE' })
  const handleCodeHide = () => dispatch({ type: 'HIDE_CODE' })

  return (
    <>
      <PenHead id={state.pen.id} name={state.pen.name} bgcolor={state.pen.colors.c3} />

      {/*
        PenView
      */}
      <div
        className={cx('PenView fixed z-0 right-0 left-0', 'transition-[top_bottom] duration-500 ease-in-out', {
          'top-0 bottom-0': state.codeFull,
          'top-0 bottom-1/2': state.codeMid,
          'top-card bottom-0': state.codeHide,
        })}>
        <div className='absolute z-10 top-16 left-0 w-5/12 bottom-16' onClick={handlePrevStep}></div>
        <div className='absolute z-10 top-16 right-0 w-5/12 bottom-16' onClick={handleNextStep}></div>
        <div
          className='absolute inset-0 m-auto w-pen h-pen grid place-items-center transition-all-children'
          dangerouslySetInnerHTML={{ __html: state.pen.html }}
        />
        <style type='text/css' dangerouslySetInnerHTML={{ __html: state.currentCSS }}></style>
      </div>

      {/*
        PenList
      */}
      <div
        className={cx('PenListWrap', 'relative z-10', 'transition-transform duration-500 ease-in-out', {
          '-translate-y-full': !state.codeHide,
        })}>
        <PenList pens={state.pens} active={state.pen.id} handleCardClick={handleCardClick} />
      </div>

      {/*
        StepInfo
      */}
      <div
        className={cx('StepInfo fixed z-20 left-10 right-10 transition-all duration-500 ease-in-out', {
          'top-48 text-2xl': state.codeHide,
          'top-10 text-xl': !state.codeHide,
        })}
        style={{ color: state.pen.colors.c2 }}>
        <div className='font-semibold'>{state.pen.name}</div>
        <div className='font-extralight'>{state.currentInfo}</div>
      </div>

      {/*
        PenCode
      */}
      <div
        className={cx(
          'PenCode fixed w-full bottom-0 z-10 bg-black/40',
          'transition-[height] duration-500 ease-in-out',
          {
            'h-0': state.codeHide,
            'h-1/2': state.codeMid,
            'h-full pt-32 backdrop-blur-sm': state.codeFull,
          }
        )}>
        {/*
          PenCode buttons
        */}
        <div
          className={cx('absolute z-10 left-3 right-3', {
            'top-3': state.codeFull,
            'bottom-full mb-3': !state.codeFull,
          })}>
          <div className='flex justify-between'>
            <When is={state.codeHide}>
              <Button onClick={handleCodeMid}>
                <ChevronUpIcon className='w-6 h-6' />
                <span>Ver código CSS</span>
              </Button>
            </When>

            <When is={state.codeMid}>
              <Button onClick={handleCodeFull}>
                <ChevronDoubleUpIcon className='w-6 h-6' />
                <span>Ampliar código</span>
              </Button>

              <Button onClick={handleCodeHide}>
                <XIcon className='w-6 h-6' />
                <span>Cerrar</span>
              </Button>
            </When>

            <When is={state.codeFull}>
              <span></span>
              <Button onClick={handleCodeHide}>
                <XIcon className='w-6 h-6' />
              </Button>
            </When>
          </div>
        </div>

        <div className='CodeContainer w-full h-full overflow-y-auto'>
          <Code css={state.currentCSS} />
        </div>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const paths = await getPaths()
  return { paths: paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const pens = await getPens()
  return { props: { pens, penID: params.penID } }
}
