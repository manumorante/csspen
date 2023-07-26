import React, { useReducer } from 'react'
import { getPens } from 'database'
import { reducer, initialState } from 'lib/reducer'
import cx from 'clsx'
import {
  MagnifyingGlassPlusIcon,
  CodeBracketIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/20/solid'
import Headers from '@/components/Headers'
import { Button } from '@/components/ds'
import { Progress, PenInfo, Pens, Code, Info, StepNav, Html, Style } from '@/components/ui'

export default function PenIndex({ pens, penID }) {
  const [state, dispatch] = useReducer(reducer, initialState({ pens, penID }))
  const hide = state.codeView === 0
  const mid = state.codeView === 1
  const full = state.codeView === 2

  return (
    <>
      <Headers penID={state.pen.id} penName={state.pen.name} bgcolor={state.pen.bgcolor} />

      <div
        className={cx(
          'Pen',
          'w-full h-full md:w-[600px]',
          'md:py-6',
          'md:rounded-lg',
          'md:shadow-xl',
          'overflow-hidden',
          'flex flex-col justify-between',
          'child:transition-all child:duration-500 child:ease-in-out child:overflow-hidden child:relative'
        )}>
        <div
          className={cx('Header bg-gradient-to-b from-black/20', {
            'h-24': hide,
            'h-0': !hide,
          })}>
          <Progress
            total={state.pen.steps.length}
            active={state.step}
            whenStepDone={() => dispatch({ type: 'NEXT_STEP' })}
          />
          <PenInfo
            name={state.pen.name}
            info={state.pen.info}
            textcolor={state.pen.textcolor}
            bgcolor={state.pen.bgcolor}
          />
        </div>

        <div className={cx('View', { grow: !full, 'h-0': full })}>
          <Info textcolor={state.pen.textcolor} hide={hide}>
            <div className='font-extralight'>{state.currentInfo}</div>
          </Info>

          <StepNav
            onClick={() => dispatch({ type: 'PREV_STEP' })}
            className={cx('left-0', {
              'opacity-0': state.firstStep,
            })}>
            <ChevronLeftIcon className={cx('w-16 h-16 text-white/60 mr-24 opacity-0 animate-appear')} />
          </StepNav>

          <StepNav
            onClick={() => dispatch({ type: 'NEXT_STEP' })}
            className={cx('right-0', {
              'opacity-0': state.lastStep,
            })}>
            <ChevronRightIcon className={cx('w-16 h-16 text-white/60 ml-24 opacity-0 animate-appear')} />
          </StepNav>

          <Html html={state.pen.html} />
          <Style css={state.currentCSS} />

          <Button
            icon={<CodeBracketIcon />}
            onClick={() => dispatch({ type: 'MID_CODE' })}
            className={cx('absolute right-3 bottom-3', {
              hidden: !hide,
            })}
          />

          <Button
            icon={<MagnifyingGlassPlusIcon />}
            onClick={() => dispatch({ type: 'FULL_CODE' })}
            className={cx('absolute right-3 bottom-3', {
              hidden: hide,
            })}
          />
        </div>

        <div
          className={cx('Code bg-black/40', {
            'h-0': hide,
            'h-1/2': mid,
            'h-full': full,
          })}>
          <Code css={state.currentCSS} />
          <Button
            icon={<XMarkIcon />}
            onClick={() => dispatch({ type: full ? 'MID_CODE' : 'HIDE_CODE' })}
            className={cx('absolute top-3 right-3')}
          />
        </div>

        <div className={cx('Nav', { 'h-0': !hide, 'h-24': hide })}>
          <Pens
            pens={state.pens}
            active={state.pen.id}
            activeBgcolor={state.pen.bgcolor}
            callback={(id) => dispatch({ type: 'SET_PEN', id })}
          />
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps({ params }) {
  const pens = await getPens()
  return { props: { pens, penID: params.penID } }
}
