import React from 'react'
import { useApiContext } from '../../../context/ApiContext'

import Progress from './Progress'
import Style from './Style'
import Html from './PenView'
import CardPH from '../nav/CardPH'

export default function View() {
  const { state } = useApiContext()
  return (
    <div
      className='View overflow-hidden sm:h-full relative transition-colors'
      style={{ background: state?.pen?.colors?.c3 }}>
      <Progress state={state} />
      {state?.loaded ? (
        <>
          <Html
            html={state.pen.html}
            classes='absolute inset-0 m-auto w-pen h-pen grid place-items-center transition-all-children'
          />
          <Style css={state.pen.steps[state.step].css} />
        </>
      ) : (
        <div className='absolute inset-0 flex justify-center items-center'>
          <CardPH />
        </div>
      )}
    </div>
  )
}
