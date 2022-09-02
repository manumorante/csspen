import React from 'react'

import { useApiContext } from '../context/ApiContext'
import { useAutoplay } from '../lib/useAutoplay'
import { voPen } from '../lib/pen'
import cx from 'classnames'

import PenView from './pen/view/PenView'
import NextPenButton from './NextPen'
import PrevPenButton from './PrevPen'
import ScreenControls from './ScreenControls'
import ShowCode from './ShowCode'
import PenCode from './mobile/PenCode'
import StepInfo from './mobile/StepInfo'

export default function PenMobile() {
  const { state, dispatch } = useApiContext()
  useAutoplay(state, dispatch)
  const penVO = voPen(state)

  return (
    <div className='Pen w-full h-full overflow-hidden'>
      <div
        className={cx('PenView fixed w-full transition-[height] duration-500 ease-in-out', {
          'h-full': state.showCode !== 1,
          'h-[50vh]': state.showCode === 1,
        })}>
        <PenView html={penVO.html} css={penVO.css} />
      </div>

      <PrevPenButton visible={penVO.firstStep} onClick={() => dispatch({ type: 'PREV_PEN' })} />
      <NextPenButton visible={penVO.lastStep} onClick={() => dispatch({ type: 'NEXT_PEN' })} />
      <ScreenControls onClickPrev={() => dispatch({ type: 'PREV' })} onClickNext={() => dispatch({ type: 'NEXT' })} />
      <StepInfo state={state} />
      <ShowCode dispatch={dispatch} showCode={state.showCode} />
      <PenCode state={state} dispatch={dispatch} />
    </div>
  )
}
