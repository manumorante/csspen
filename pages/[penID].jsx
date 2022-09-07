import React from 'react'
import cx from 'classnames'
import { useApiContext } from '../context/ApiContext'
import { useAutoplay } from 'lib/useAutoplay'
import PenHead from '@/PenHead'
import StepInfo from '@/StepInfo'
import PenList from '@/PenList'
import Style from '@/Style'
import PenCode from '@/PenCode'

export default function PenIndex() {
  const { state, dispatch } = useApiContext()
  useAutoplay(state, dispatch)

  return (
    <>
      <PenHead id={state.id} name={state.name} bgcolor={state.color3} />

      <div
        className={cx('PenView fixed z-0 right-0 left-0', 'transition-all duration-500 ease-in-out', {
          'top-card bottom-0': state.showCode !== 1,
          'top-0 bottom-1/2': state.showCode === 1,
        })}>
        <div className='absolute z-10 top-16 left-0 w-5/12 bottom-16' onClick={() => dispatch({ type: 'PREV' })}></div>
        <div className='absolute z-10 top-16 right-0 w-5/12 bottom-16' onClick={() => dispatch({ type: 'NEXT' })}></div>
        <div
          className='absolute inset-0 m-auto w-pen h-pen grid place-items-center transition-all-children'
          dangerouslySetInnerHTML={{ __html: state.html }}
        />
        <Style css={state.css} />
      </div>
      <PenList />
      <StepInfo state={state} />
      <PenCode state={state} dispatch={dispatch} />
    </>
  )
}
