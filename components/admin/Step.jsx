import React, { useState, useCallback, useReducer } from 'react'
import { stepReducer } from 'lib/stepReducer'
import cx from 'classnames'
import StepEditor from '@/admin/StepEditor'
import Button from '@/Button'
import { BoltIcon } from '@heroicons/react/20/solid'

export default function Step({ penID, num, html, css, info, bg, onUpdateStep }) {
  const initialState = { html, css, info }
  const [state, dispatch] = useReducer(stepReducer, initialState)

  const onCssChange = useCallback(
    (value, _viewUpdate) => {
      if (value !== state.css) {
        dispatch({ type: 'SET_CSS', css: value })
      }
    },
    [state.css]
  )

  const onInfoChange = useCallback(
    (el, _viewUpdate) => {
      const newInfo = el.target.value
      if (newInfo !== state.info) {
        dispatch({ type: 'SET_INFO', info: newInfo })
      }
    },
    [state.info]
  )

  const handleSave = () => {
    onUpdateStep({ penID, num, css: state.css, info: state.info })
  }

  return (
    <div className='Step snap-center grow sm:grow-0'>
      <div className={cx('w-screen sm:w-96')}>
        <Button label='Save' icon={<BoltIcon />} onClick={handleSave} />

        <div className='h-20 flex w-full'>
          <div className='flex items-center p-3 text-white/50 font-medium text-xl bg-black/30'>{num}</div>
          <textarea onInput={onInfoChange} className='p-3 bg-black/20 w-full' value={state.info} />
        </div>

        <StepEditor num={num} html={state.html} css={state.css} bg={bg} onChange={onCssChange} />
      </div>
    </div>
  )
}
