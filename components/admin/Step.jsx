import React, { useEffect, useCallback, useReducer } from 'react'
import { stepReducer } from 'lib/stepReducer'
import cx from 'classnames'
import StepEditor from '@/admin/StepEditor'
import Button from '@/Button'
import { BoltIcon, PlusIcon, TrashIcon, XCircleIcon } from '@heroicons/react/20/solid'

export default function Step({
  penID,
  num,
  html,
  css,
  info,
  brandcolor,
  textcolor,
  bgcolor,
  total,
  updateStep,
  createStep,
  deleteStep,
}) {
  const initialState = { html, css, _css: css, info, _info: info, focus: false, edited: false }
  const [state, accStep] = useReducer(stepReducer, initialState)

  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.key === 'Escape') handleReset()
    }
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [])

  const onCss = useCallback(
    (value, _) => {
      if (value !== state._css) {
        accStep({ type: 'SET_CSS', css: value })
      } else {
        accStep({ type: 'NO_EDITED' })
      }
    },
    [state._css]
  )

  const onInfo = useCallback(
    (el, _) => {
      if (el.target.value !== state.info) {
        accStep({ type: 'SET_INFO', info: el.target.value })
      }
    },
    [state.info]
  )

  const handleSave = () => {
    accStep({ type: 'SET_INITIAL', _css: state.css, _info: state.info })
    updateStep({ penID, num, css: state.css, info: state.info })
  }

  const handleDelete = () => {
    deleteStep({ penID, num })
  }

  const handleReset = () => {
    accStep({ type: 'RESET' })
  }

  const handleNewNext = () => {
    createStep({ penID, num: total + 1, css: state.css, info: state.info })
  }

  return (
    <div
      className={cx('Step group', 'shrink-0 snap-center snap-mandatory sm:snap-proximity', 'rounded-lg border-4', {
        'border-transparent': !state.focus && !state.edited,
        'border-white/10': state.focus && !state.edited,
        'border-yellow-600/50': state.edited && !state.focus,
        'border-yellow-400/50': state.edited && state.focus,
      })}
      style={{ backgroundColor: bgcolor }}>
      <div className='w-screen sm:w-[400px] lg:w-[500px]'>
        <div className='Buttons w-full h-12 p-2 flex gap-2 justify-between items-center rounded-t-xl bg-black/20'>
          <Button label={num} />
          <textarea
            rows='1'
            onInput={onInfo}
            onFocus={() => accStep({ type: 'FOCUS' })}
            onBlur={() => accStep({ type: 'BLUR' })}
            className='grow outline-0 bg-transparent resize-none'
            value={state.info}
          />
          {state.edited && (
            <>
              <Button icon={<XCircleIcon />} onClick={handleReset} />
              <Button label='Save' icon={<BoltIcon />} onClick={handleSave} />
            </>
          )}

          {!state.edited && (
            <>
              <Button
                icon={<TrashIcon />}
                onClick={handleDelete}
                className='sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 ease-in-out'
              />
              <Button
                icon={<PlusIcon />}
                onClick={handleNewNext}
                className='sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 ease-in-out'
              />
            </>
          )}
        </div>

        <StepEditor
          num={num}
          html={state.html}
          css={state.css}
          bgcolor={bgcolor}
          onChange={onCss}
          onFocus={() => accStep({ type: 'FOCUS' })}
          onBlur={() => accStep({ type: 'BLUR' })}
        />
      </div>
    </div>
  )
}
