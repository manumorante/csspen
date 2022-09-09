import React, { useReducer } from 'react'
import { getPaths, getPens } from 'database'
import { reducer, initialState } from 'lib/reducer'
import {
  MagnifyingGlassPlusIcon,
  MagnifyingGlassMinusIcon,
  CodeBracketIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/20/solid'
import cx from 'classnames'
import Headers from 'components/Headers'
import Header from 'components/Header'
import Progress from 'components/Progress'
import Nav from 'components/Nav'
import Pens from 'components/Pens'
import Button from 'components/Button'
import Code from 'components/Code'
import When from 'components/When'
import CodeContainer from '@/CodeContainer'
import Info from 'components/Info'
import StepNav from '@/StepNav'

export default function PenIndex(props) {
  const { pens, penID } = props
  const [state, dispatch] = useReducer(reducer, initialState({ pens, penID }))

  const handleCardClick = (id) => dispatch({ type: 'SET_PEN', id })
  const handlePrevStep = () => dispatch({ type: 'PREV_STEP' })
  const handleNextStep = () => dispatch({ type: 'NEXT_STEP' })
  const handleToggleFullCode = () => {
    if (state.codeFull) {
      dispatch({ type: 'MID_CODE' })
    } else {
      dispatch({ type: 'FULL_CODE' })
    }
  }
  const handleCodeMid = () => dispatch({ type: 'MID_CODE' })
  const handleCodeHide = () => dispatch({ type: 'HIDE_CODE' })

  const initials = state.pen.name
    .split(' ')
    .map((n) => n[0])
    .join('')

  return (
    <>
      <Headers penID={state.pen.id} penName={state.pen.name} color={state.pen.colors.c3} />

      <Header state={state}>
        <Progress state={state} dispatch={dispatch} />
        <div className='flex gap-3 items-center mt-3'>
          <div
            className='Avatar w-8 h-8 xs:w-10 xs:h-10 leading-10 text-xl font-black text-center text-white rounded-full transition-colors duration-500 ease-in-out'
            style={{ backgroundColor: state.pen.colors.c1 }}>
            {initials}
          </div>
          <div className='text-sm xs:text-lg xs:leading-6'>
            <div className='text-white font-semibold'>{state.pen.name}</div>
            <div className='text-white/60'>{state.pen.info}</div>
          </div>
        </div>
      </Header>

      {/*
        PenView
      */}
      <div
        className={cx('PenView fixed z-0 right-0 left-0', 'transition-[top_bottom] duration-500 ease-in-out', {
          'top-0 bottom-0': state.codeFull,
          'top-0 bottom-1/3': state.codeMid,
          'top-20 bottom-20': state.codeHide,
        })}>
        {/*
          Next Prev Step
        */}
        <StepNav
          onClick={handlePrevStep}
          className={cx('left-0', {
            'opacity-0 pointer-events-none': state.firstStep || state.codeFull,
          })}>
          <ChevronLeftIcon className={cx('w-16 h-16 text-white/60 mr-24')} />
        </StepNav>

        <StepNav
          onClick={handleNextStep}
          className={cx('right-0', {
            'opacity-0 pointer-events-none': state.lastStep || state.codeFull,
          })}>
          <ChevronRightIcon className={cx('w-16 h-16 text-white/60 ml-24')} />
        </StepNav>

        <div
          className='absolute inset-0 m-auto w-pen h-pen grid place-items-center transition-all-children'
          dangerouslySetInnerHTML={{ __html: state.pen.html }}
        />
        <style type='text/css' dangerouslySetInnerHTML={{ __html: state.currentCSS }}></style>
      </div>

      <Nav state={state}>
        <Pens pens={state.pens} active={state.pen.id} callback={handleCardClick} />
      </Nav>

      <Info state={state}>
        <div className='font-extralight'>{state.currentInfo}</div>
      </Info>

      <CodeContainer state={state}>
        {/*
          PenCode buttons
        */}
        <Button
          onClick={handleCodeMid}
          className={cx('absolute right-3', {
            '-top-32': state.codeHide,
            '-top-20 opacity-0 pointer-events-none': !state.codeHide,
          })}>
          <CodeBracketIcon />
        </Button>

        <Button
          onClick={handleToggleFullCode}
          className={cx('absolute z-10 right-3', {
            'top-3 opacity-0 pointer-events-none': state.codeHide,
            'top-3': state.codeMid,
            'top-14': state.codeFull,
          })}>
          {state.codeFull ? <MagnifyingGlassMinusIcon /> : <MagnifyingGlassPlusIcon />}
        </Button>

        <Button
          onClick={handleCodeHide}
          className={cx('absolute right-3', {
            '-top-20 opacity-0 pointer-events-none': state.codeHide,
            '-top-12': state.codeMid,
            'top-3': state.codeFull,
          })}>
          <XMarkIcon />
        </Button>

        <Code css={state.currentCSS} />
      </CodeContainer>
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
