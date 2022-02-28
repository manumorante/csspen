import React, { useState, useEffect, useReducer } from 'react'
import {getPen} from '../js/getPen'
import useHash from '../js/useHash'
import {reducer} from '../js/reducer'
import Tag from './Tag'
import Code from './Code'
import PenList from './PenList'

const initialState = {
  loading: false,
  loaded: false,
  autoplay: false,
  step: -1
}

export default function Pen () {
  const hash = useHash()
  const [state, dispatch] = useReducer(reducer, initialState)
  const [showPenList, setShowPenList] = useState()

  // Fetch Pen from DB and dispatch reducer to set state
  useEffect(() => {
    if(hash === state.slug || state.loading) return false

    getPen(hash).then(pen => {
      if(!pen) console.error(`Error: getPen response hash(${hash}) pen(${pen})`)

      dispatch({type: 'SET_PEN', pen: pen})
    })

  }, [hash, state.loading, state.slug])

  // Dispatch update state when Step change
  useEffect(() => {
    if(state.step < 0) return false

    dispatch({type: 'UPDATE_STEP'})

    // Close PenListwhen step change
    setShowPenList('')
  }, [state.step])

  // Play
  useEffect(() => {
    if(state.autoplay) {
      const timeout = setTimeout(() => {
        if (state.step >= state.totalSteps - 1) dispatch({type: 'STOP'})
        else dispatch({type: 'NEXT_STEP'})
      }, 1000)

      return () => clearTimeout(timeout)
    }
  }, [state.autoplay, state])

  // Functions to check is can move to next or previous step
  const notNext = () => state.autoplay || state.step + 1 >= state.totalSteps
  const notPrev = () => state.autoplay || state.step <= 0

  const handlePlayStop = () => {
    state.autoplay ? dispatch({type: 'STOP'}) : dispatch({type: 'PLAY'})
  }

  // Show spinner loading
  if(state.loading) { return <div className='Spinner' /> }

  return (
    <div className={`App ${showPenList}`}>
      <div className='PenList'>
        <button className='Button PenList__close' onClick={() => { setShowPenList('') }}>Close</button>

        <PenList active={hash} />
      </div>

      <div className='Editor' style={{background: state.bg}}>
        <div className='Editor__code'>
          <div className='Editor__step-info'>{state.stepInfo}</div>

          <div className='Code'>
            <Code parsedCode={state.parsedCode} />

            <Tag html={`<style type="text/css">${state.rawCode}</style>`} />
          </div>

          <div className='Buttons Editor__buttons'>
            <button className='Button' onClick={handlePlayStop}>{state.autoplay ? 'Stop' : 'Play'}</button>
            <button className='Button' disabled={true}>{`${state.step + 1}/${state.totalSteps}`}</button>
            <button className='Button' onClick={() => { dispatch({type: 'PREV_STEP'}) }} disabled={notPrev()}>{'<'}</button>
            <button className='Button' onClick={() => { dispatch({type: 'NEXT_STEP'}) }} disabled={notNext()}>{'>'}</button>
            <button className='Button button--more' onClick={() => { dispatch({type: 'STOP'}); setShowPenList('show-pen-list') }}>More!</button>
          </div>
        </div>

        <Tag html={state.html} className='Editor__html' />
      </div>
    </div>
  )
}
