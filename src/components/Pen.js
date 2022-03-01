import React, { useState, useEffect, useReducer } from 'react'
import {getPen} from '../js/getPen'
import useHash from '../js/useHash'
import {reducer} from '../js/reducer'
import Tag from './Tag'
import Code from './Code'
import PenList from './PenList'

// Pen object: initial state
const initialState = {
  loading: false,
  loaded: false,
  autoplay: false,
  step: -1
}

export default function Pen () {
  const hash = useHash()
  const [pen, dispatch] = useReducer(reducer, initialState)
  const [showPenList, setShowPenList] = useState()

  // Fetch Pen from DB and dispatch reducer to set pen
  useEffect(() => {
    if(hash === pen.slug || pen.loading) return false

    dispatch({type: 'LOADING'})
    getPen(hash).then(pen => {
      if(!pen) console.error(`Error: getPen response hash(${hash}) pen(${pen})`)

      dispatch({type: 'SET_PEN', pen: pen})
    })

  }, [hash, pen.loading, pen.slug])

  // Dispatch update pen when Step change
  useEffect(() => {
    if(pen.step < 0) return false

    dispatch({type: 'UPDATE_STEP'})

    // Close PenListwhen step change
    setShowPenList('')
  }, [pen.step])

  // Play
  useEffect(() => {
    if(pen.autoplay) {
      const timeout = setTimeout(() => {
        if (pen.step >= pen.totalSteps - 1) dispatch({type: 'STOP'})
        else dispatch({type: 'NEXT_STEP'})
      }, 1000)

      return () => clearTimeout(timeout)
    }
  }, [pen.autoplay, pen])

  // Functions to check is can move to next or previous step
  const notNext = () => pen.autoplay || pen.step + 1 >= pen.totalSteps
  const notPrev = () => pen.autoplay || pen.step <= 0

  const handlePlayStop = () => {
    pen.autoplay ? dispatch({type: 'STOP'}) : dispatch({type: 'PLAY'})
  }

  // Show spinner loading
  // if(pen.loading) { return <div className='Spinner' /> }

  return (
    <div className={`App ${showPenList}`}>
      <div className='PenList'>
        <button className='Button PenList__close' onClick={() => { setShowPenList('') }}>Close</button>

        <PenList active={hash} />
      </div>

      <div className='Editor' style={{background: pen.bg}}>
        <div className='Editor__code'>
          <div className='Editor__step-info'>{pen.stepInfo}</div>

          <div className='Code'>
            <Code pen={pen} />

            <Tag html={`<style type="text/css">${pen.rawCode}</style>`} />
          </div>

          <div className='Buttons Editor__buttons'>
            <button className='Button' onClick={handlePlayStop}>{pen.autoplay ? 'Stop' : 'Play'}</button>
            <button className='Button' disabled={true}>{`${pen.step + 1}/${pen.totalSteps}`}</button>
            <button className='Button' onClick={() => { dispatch({type: 'PREV_STEP'}) }} disabled={notPrev()}>{'<'}</button>
            <button className='Button' onClick={() => { dispatch({type: 'NEXT_STEP'}) }} disabled={notNext()}>{'>'}</button>
            <button className='Button button--more' onClick={() => { dispatch({type: 'STOP'}); setShowPenList('show-pen-list') }}>More!</button>
          </div>
        </div>

        <Tag html={pen.html} className={`Editor__html ${pen.loading ? 'loading' : ''}`} />
      </div>
    </div>
  )
}
