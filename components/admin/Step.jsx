import React, { useState, useEffect, useCallback, useReducer } from 'react'
import { stepReducer } from 'lib/stepReducer'
import cx from 'clsx'
import StepEditor from '@/components/admin/StepEditor'
import Button from '@/components/ds/Button'
import { BoltIcon, PlusIcon, TrashIcon, ViewColumnsIcon, XCircleIcon } from '@heroicons/react/24/outline'

export default function Step({ penID, num, html, css, info, bgcolor, total, updateStep, createStep, deleteStep }) {
  const initialState = { html, css, _css: css, info, _info: info, focus: false, edited: false }
  const [state, accStep] = useReducer(stepReducer, initialState)
  const [isVertical, setIsVertical] = useState(true)

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
    // Confirm prompt
    if (window.confirm(`Delete step ${num} from ${penID}?`)) {
      deleteStep({ penID, num })
    }
  }

  const handleReset = () => {
    accStep({ type: 'RESET' })
  }

  const handleNewNext = () => {
    createStep({ penID, num: total + 1, css: state.css, info: state.info })
  }

  return (
    <div
      className={cx(
        'Step',
        'h-screen',
        {
          'lg:w-step': isVertical,
          'lg:w-[calc(100vw-64px)]': !isVertical,
        },
        'shrink-0 snap-center snap-mandatory sm:snap-proximity',
        'xl:rounded-lg border-4',
        {
          'border-transparent': !state.focus && !state.edited,
          'border-white/10': state.focus && !state.edited,
          'border-yellow-600/50': state.edited && !state.focus,
          'border-yellow-400/50': state.edited && state.focus,
        }
      )}
      style={{ backgroundColor: bgcolor }}>
      <>
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
              <Button icon={<ViewColumnsIcon />} onClick={() => setIsVertical(!isVertical)} />
              <Button icon={<TrashIcon />} onClick={handleDelete} />
              <Button icon={<PlusIcon />} onClick={handleNewNext} />
            </>
          )}
        </div>

        <StepEditor
          num={num}
          html={state.html}
          css={state.css}
          bgcolor={bgcolor}
          isVertical={isVertical}
          onChange={onCss}
          onFocus={() => accStep({ type: 'FOCUS' })}
          onBlur={() => accStep({ type: 'BLUR' })}
        />
      </>
    </div>
  )
}
