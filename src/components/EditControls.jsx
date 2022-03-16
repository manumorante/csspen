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
    <div className='EditControls rounded-2xl m-6 shadow-lg shadow-neutral-800 flex'>
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
    </div>
  )
}
