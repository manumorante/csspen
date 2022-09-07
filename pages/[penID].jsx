import React from 'react'
import cx from 'classnames'
import { useApiContext } from '../context/ApiContext'
import PenHead from '@/PenHead'
import StepInfo from '@/StepInfo'
import PenList from '@/PenList'
import Style from '@/Style'
import PenCode from '@/PenCode'

export default function PenIndex() {
  const { state, dispatch } = useApiContext()

  return (
    <>
      <PenHead id={state.id} name={state.name} bgcolor={state.color3} />

      <div className='Pen w-full h-full overflow-hidden'>
        <div
          className={cx('PenView fixed z-0 w-full transition-[height] duration-500 ease-in-out', {
            'h-full': state.showCode !== 1,
            'h-[50vh]': state.showCode === 1,
          })}>
          <div
            className='absolute z-10 top-20 left-0 w-1/3 bottom-20 bg-white/20'
            onClick={() => dispatch({ type: 'PREV' })}></div>
          <div
            className='absolute z-10 top-20 right-0 w-1/3 bottom-20 bg-white/20'
            onClick={() => dispatch({ type: 'NEXT' })}></div>
          <div
            className='PenView absolute inset-0 m-auto w-pen h-pen grid place-items-center transition-all-children'
            dangerouslySetInnerHTML={{ __html: state.html }}
          />
          <Style css={state.css} />
        </div>
        <PenList />
        <StepInfo state={state} />
        <PenCode state={state} dispatch={dispatch} />
      </div>
    </>
  )
}
