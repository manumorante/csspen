import React, { useState, useEffect, useReducer } from 'react'
import usePens1 from '../js/usePens1'
import usePens from '../hooks/usePens'
import useHash from '../js/useHash'
import {reducer, initialState} from '../js/reducer'
import createPen from '../js/createPen'
import Tag from './Tag'
import Code from './Code'
import PenList from './PenList'

export default function Pen () {
  const {loadingPens, pens1} = usePens1()
  const [pens] = usePens()
  const hash = useHash()
  const [pen, setPen] = useState(false)
  const [state, dispatch] = useReducer(reducer, initialState)
  const [showPenList, setShowPenList] = useState()

  useEffect(() => {
    if(!loadingPens && pens1 && hash){
      const newPen = createPen(hash, pens1)

      if(!newPen) {
        console.log('useEffect [loadingPens, pens1, id] - Pen not found')
        return false
      }

      setPen(newPen)

      dispatch({type: 'SET_TOTAL_STEPS', totalSteps: newPen.steps.length})
      dispatch({type: 'SET_STEP_INFO', stepInfo: newPen.steps[0].info})
      dispatch({type: 'SET_CODE', rawCode: newPen.steps[0].code})
      dispatch({type: 'PLAY'})
    }
  }, [loadingPens, pens1, hash])

  // When step changes
  useEffect(() => {
    if(!pen) return false

    dispatch({type: 'SET_STEP_INFO', stepInfo: pen.steps[state.step].info})
    dispatch({type: 'SET_CODE', rawCode: pen.steps[state.step].code})

    // Close pen list menu when pen is selected
    setShowPenList('')
  }, [state.step, pen])

  // Play
  useEffect(() => {
    if(state.autoplay) {
      const timeout = setTimeout(() => {
        if (state.step >= state.totalSteps - 1) {
          dispatch({type: 'STOP'})
        } else {
          dispatch({type: 'NEXT_STEP'})
        }
      }, 1000)

      return () => clearTimeout(timeout)
    }
  }, [state.autoplay, state])

  // Functions to check is can move to next or previous step
  const notNext = () => state.autoplay || state.step + 1 >= state.totalSteps
  const notPrev = () => state.autoplay || state.step <= 0

  const handlePlayStop = () => {
    state.autoplay ?
      dispatch({type: 'STOP'}) :
      dispatch({type: 'PLAY'})
  }

  if(loadingPens || !pen) {
    return <div className='Spinner' />
  }

  return (
    <div className={`App ${showPenList}`}>
      <div className='PenList'>
        <button className='Button PenList__close' onClick={() => { setShowPenList('') }}>Close</button>

        <PenList pens={pens} />
      </div>

      <div className='Editor' style={{background: pen.bg}}>
        <div className='Editor__code'>
          <div className='Editor__step-info'>{state.stepInfo}</div>

          <div className='Code'>
            <Code parsedCode={state.parsedCode} />

            <Tag html={`<style type="text/css">${state.rawCode}</style>`} />
          </div>

          <div className='Buttons Editor__buttons'>
            <button className='Button' onClick={handlePlayStop}>{state.autoplay ? 'Stop' : 'Play'}</button>
            <button className='Button' disabled={true}>{`${state.step}/${state.totalSteps - 1}`}</button>
            <button className='Button' onClick={() => { dispatch({type: 'PREV_STEP'}) }} disabled={notPrev()}>{'<'}</button>
            <button className='Button' onClick={() => { dispatch({type: 'NEXT_STEP'}) }} disabled={notNext()}>{'>'}</button>
            <button className='Button button--more' onClick={() => { dispatch({type: 'STOP'}); setShowPenList('show-pen-list') }}>More!</button>
          </div>
        </div>

        <Tag html={pen.html} className='Editor__html' />
      </div>
    </div>
  )
}
