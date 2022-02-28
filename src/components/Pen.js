import React, { useState, useEffect, useReducer } from 'react'
import {getPen} from '../js/getPen'
import usePens from '../hooks/usePens'
import useHash from '../js/useHash'
import {reducer} from '../js/reducer'
import Tag from './Tag'
import Code from './Code'
import PenList from './PenList'

export default function Pen () {
  const hash = useHash()
  const [pens] = usePens()
  const [state, dispatch] = useReducer(reducer, {loaded: false})
  const [showPenList, setShowPenList] = useState()

  // Fetch Pen from DB and dispatch reducer to set state
  useEffect(() => {
    if(hash !== state.slug || !state.loaded) {
      getPen(hash).then(pen => {
        dispatch({type: 'LOAD', pen: pen})
      })
    }

  }, [state.loaded, hash, state])

  // Dispatch update state when Step change
  useEffect(() => {
    if(!state.step || !state.loaded) return false

    dispatch({type: 'UPDATE_STEP', step: state.step})

    // Close PenListwhen step change
    setShowPenList('')
  }, [state.step, state.loaded])

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
  if(!state.loaded) { return <div className='Spinner' /> }

  return (
    <div className={`App ${showPenList}`}>
      <div className='PenList'>
        <button className='Button PenList__close' onClick={() => { setShowPenList('') }}>Close</button>

        <PenList pens={pens} active={hash} />
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
