import React, { useCallback, useReducer } from 'react'
import { stepReducer } from 'lib/stepReducer'
import cx from 'classnames'
import StepEditor from '@/admin/StepEditor'
import Button from '@/Button'
import { BoltIcon, PlusIcon, TrashIcon } from '@heroicons/react/20/solid'

export default function Step({ penID, num, html, css, info, bg, onUpdateStep, onCreateStep, onDeleteStep }) {
  const initialState = { html, css, _css: css, info, _info: info, focus: false, edited: false }
  const [state, dispatch] = useReducer(stepReducer, initialState)

  const onCss = useCallback(
    (value, _) => {
      if (value !== state.initialCss) {
        dispatch({ type: 'SET_CSS', css: value })
      } else {
        dispatch({ type: 'NO_EDITED' })
      }
    },
    [state.initialCss]
  )

  const onInfo = useCallback(
    (el, _) => {
      if (el.target.value !== state.info) {
        dispatch({ type: 'SET_INFO', info: el.target.value })
      }
    },
    [state.info]
  )

  const handleSave = () => {
    onUpdateStep({ penID, num, css: state.css, info: state.info })
  }

  const handleDelete = () => {
    onDeleteStep({ penID, num })
  }

  const handleReset = () => {
    dispatch({ type: 'RESET_CSS' })
  }

  const handleNewNext = () => {
    onCreateStep({ penID, num: num + 1, css: state.css, info: state.info })
  }

  return (
    <div className='Step snap-center grow sm:grow-0'>
      <div
        className={cx('w-screen sm:w-96', {
          'bg-blue-500': state.focus && !state.edited,
          'bg-yellow-500/60': state.edited && !state.focus,
          'bg-yellow-500': state.edited && state.focus,
        })}>
        <div className='Buttons p-2 h-12'>
          {state.edited && (
            <div className='flex gap-2 justify-end items-center'>
              <Button label='Reset' onClick={handleReset} />
              <Button label='Save' icon={<BoltIcon />} onClick={handleSave} />
            </div>
          )}

          {!state.edited && (
            <div className='flex gap-2 justify-end items-center'>
              <Button icon={<TrashIcon />} onClick={handleDelete} />
              <Button icon={<PlusIcon />} onClick={handleNewNext} />
            </div>
          )}
        </div>

        <div className='h-20 flex w-full'>
          <div className='flex items-center p-3 text-white/50 font-medium text-xl bg-black/30'>{num}</div>
          <textarea
            onInput={onInfo}
            onFocus={() => dispatch({ type: 'FOCUS' })}
            onBlur={() => dispatch({ type: 'BLUR' })}
            className='p-3 bg-black/20 w-full outline-0'
            value={state.info}
          />
        </div>

        <StepEditor
          num={num}
          html={state.html}
          css={state.css}
          bg={bg}
          onChange={onCss}
          onFocus={() => dispatch({ type: 'FOCUS' })}
          onBlur={() => dispatch({ type: 'BLUR' })}
        />
      </div>
    </div>
  )
}
