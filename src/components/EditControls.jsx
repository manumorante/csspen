import React from 'react'
import { Link } from 'react-router-dom'

export default function EditControls({ pen, dispatch }) {
  const handleNewStep = () => {
    dispatch({ type: 'NEW_STEP' })
  }

  const handleDeleteStep = () => {
    dispatch({ type: 'DELETE_STEP' })
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

      <button
        className='Button'
        onClick={handleDeleteStep}
        disabled={!pen.step}>
        {'x'}
      </button>

      <button className='Button' onClick={handleSave}>
        {'Save'}
      </button>

      <Link className='Button' to='/new'>
        New
      </Link>
    </div>
  )
}
