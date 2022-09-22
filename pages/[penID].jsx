import React, { useReducer } from 'react'
import { getPaths, getPens } from 'database'
import { reducer, initialState } from 'lib/reducer'
import cx from 'classnames'
import {
  MagnifyingGlassPlusIcon,
  MagnifyingGlassMinusIcon,
  CodeBracketIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/20/solid'
import Headers from '@/Headers'
import Header from '@/Header'
import Progress from '@/Progress'
import PenInfo from '@/PenInfo'
import Nav from '@/Nav'
import Pens from '@/Pens'
import Button from '@/Button'
import Code from '@/Code'
import CodeContainer from '@/CodeContainer'
import Info from '@/Info'
import StepNav from '@/StepNav'
import View from '@/View'
import Html from '@/Html'
import Style from '@/Style'

export default function PenIndex(props) {
  const { pens, penID } = props
  const [state, dispatch] = useReducer(reducer, initialState({ pens, penID }))
  const showStepsNav = state.codeView != 2 && !state.playing

  const handleCardClick = (id) => dispatch({ type: 'SET_PEN', id })
  const handlePrevStep = () => dispatch({ type: 'PREV_STEP' })
  const handleNextStep = () => dispatch({ type: 'NEXT_STEP' })
  const handleToggleFullCode = () => {
    if (state.codeView === 2) {
      dispatch({ type: 'MID_CODE' })
    } else {
      dispatch({ type: 'FULL_CODE' })
    }
  }
  const handleCodeMid = () => dispatch({ type: 'MID_CODE' })
  const handleCodeHide = () => dispatch({ type: 'HIDE_CODE' })

  return (
    <>
      <Headers penID={state.pen.id} penName={state.pen.name} color={state.pen.colors.c3} />

      <Header codeView={state.codeView}>
        <Progress total={state.pen.steps.length} active={state.step} whenStepDone={handleNextStep} />
        <PenInfo name={state.pen.name} info={state.pen.info} color={state.pen.colors.c3} bg={state.pen.colors.c1} />
      </Header>

      <View codeView={state.codeView}>
        <StepNav
          onClick={handlePrevStep}
          className={cx('left-0', {
            'opacity-0': state.firstStep || !showStepsNav,
          })}>
          <ChevronLeftIcon className={cx('w-16 h-16 text-white/60 mr-24')} />
        </StepNav>

        <StepNav
          onClick={handleNextStep}
          className={cx('right-0', {
            'opacity-0': state.lastStep || !showStepsNav,
          })}>
          <ChevronRightIcon className={cx('w-16 h-16 text-white/60 ml-24')} />
        </StepNav>

        <Html html={state.pen.html} />
        <Style css={state.currentCSS} />
      </View>

      <Nav codeView={state.codeView}>
        <Pens pens={state.pens} active={state.pen.id} callback={handleCardClick} />
      </Nav>

      <Info color={state.pen.colors.c2} codeView={state.codeView}>
        <div className='font-extralight'>{state.currentInfo}</div>
      </Info>

      <CodeContainer view={state.codeView}>
        <Button
          onClick={handleCodeMid}
          className={cx('absolute right-3', {
            '-top-32': state.codeView === 0,
            '-top-20 opacity-0 pointer-events-none': state.codeView != 0,
          })}>
          <CodeBracketIcon />
        </Button>

        <Button
          onClick={handleToggleFullCode}
          className={cx('absolute z-10 right-3', {
            'top-3 opacity-0 pointer-events-none': state.codeView === 0,
            'top-3': state.codeView === 1,
            'top-14': state.codeView === 2,
          })}>
          {state.codeView === 2 ? <MagnifyingGlassMinusIcon /> : <MagnifyingGlassPlusIcon />}
        </Button>

        <Button
          onClick={handleCodeHide}
          className={cx('absolute right-3', {
            '-top-20 opacity-0 pointer-events-none': state.codeView === 0,
            '-top-12': state.codeView === 1,
            'top-3': state.codeView === 2,
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
