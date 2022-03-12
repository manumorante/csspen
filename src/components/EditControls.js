import React from 'react'

export default function EditControls({ pen, dispatch }) {
  const handleNewStep = () => {
    dispatch({ type: 'NEW_STEP' })
  }

  const handleDeleteStep = () => {
    console.log('delete step')
  }

  const handleSave = () => {
    // dispatch({ type: 'UPDATE_STEP' })
    console.log('save')
  }

  return (
    <div className='Controls Buttons Editor__buttons'>
      <button className='Button' disabled={true}>
        Step: {pen.step + 1}/{pen.totalSteps}
      </button>
      <button className='Button' onClick={handleNewStep}>
        {'+'}
      </button>

      <button className='Button' onClick={handleDeleteStep}>
        {'x'}
      </button>

      <button className='Button' onClick={handleSave}>
        {'Save'}
      </button>
    </div>
  )
}
