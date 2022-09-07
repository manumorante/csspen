import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import cx from 'classnames'
import { useApiContext } from '../context/ApiContext'
import PenHead from '../components/PenHead'
import ScreenControls from '../components/ScreenControls'
import StepInfo from '../components/StepInfo'
import ShowCodeButtons from '../components/ShowCodeButtons'
import PenList from '../components/PenList'
import Style from '../components/Style'

const PenCode = dynamic(() => import('../components/PenCode'), { suspense: true })

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
            className='PenView absolute inset-0 m-auto w-pen h-pen grid place-items-center transition-all-children'
            dangerouslySetInnerHTML={{ __html: state.html }}
          />
          <Style css={state.css} />
        </div>

        <PenList />

        <ScreenControls onClickPrev={() => dispatch({ type: 'PREV' })} onClickNext={() => dispatch({ type: 'NEXT' })} />

        <StepInfo state={state} />

        <ShowCodeButtons dispatch={dispatch} showCode={state.showCode} />

        <Suspense fallback={`Loading...`}>
          {state.showCode > 0 && <PenCode state={state} dispatch={dispatch} />}
        </Suspense>
      </div>
    </>
  )
}
