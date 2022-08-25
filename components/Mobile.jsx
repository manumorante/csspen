import React, { useEffect } from 'react'
import { useApiContext } from '../context/ApiContext'
import { useAutoplay } from '../lib/useAutoplay'
import { getPenVO } from '../lib/pen'
import cx from 'classnames'

import PenView from './pen/view/PenView'
import NextPenButton from './NextPen'
import ScreenControls from './ScreenControls'
import ShowCode from './ShowCode'
import PenCode from './mobile/PenCode'
import StepInfo from './mobile/StepInfo'

export default function PenMobile() {
  const { state, dispatch } = useApiContext()
  useAutoplay(state, dispatch)
  const penVO = getPenVO(state)

  useEffect(() => {
    document.documentElement.style.backgroundColor = state?.pen?.colors?.c3
  }, [state?.pen?.colors?.c3])

  return (
    <div className='Pen w-full h-full overflow-hidden'>
      <div
        className={cx('PenView fixed w-full transition-[height] duration-500 ease-in-out', {
          'h-full': state.showCode !== 1,
          'h-[50vh]': state.showCode === 1,
        })}>
        <PenView html={penVO.html} css={penVO.css} />
      </div>

      <NextPenButton visible={penVO.lastStep} onClick={() => dispatch({ type: 'NEXT_PEN' })} />
      <ScreenControls onClickPrev={() => dispatch({ type: 'PREV' })} onClickNext={() => dispatch({ type: 'NEXT' })} />
      <StepInfo state={state} />
      <ShowCode dispatch={dispatch} showCode={state.showCode} />
      <PenCode state={state} dispatch={dispatch} />
    </div>
  )
}
