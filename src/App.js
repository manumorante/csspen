import React, { useState, useEffect, useReducer } from 'react'
import usePens from './js/usePens'
import useHash from './js/useHash'
import {reducer, initialState} from './js/reducer'
import createPen from './js/createPen'
import PenCard from './components/PenCard'
import Tag from './components/Tag'
import Code from './components/Code'

export default function App () {
  const {loadingPens, pens} = usePens()
  const hash = useHash()
  const [pen, setPen] = useState(false)
  const [state, dispatch] = useReducer(reducer, initialState)

  const [autoplay, setAutoplay] = useState()
  const [showPenList, setShowPenList] = useState()

  useEffect(() => {
    if(!loadingPens && pens && hash){
      const newPen = createPen(hash, pens)

      if(!newPen) {
        console.log('useEffect [loadingPens, pens, id] - Pen not found')
        return false
      }

      setPen(newPen)

      dispatch({type: 'SET_STEP', step: 0})
      dispatch({type: 'SET_TOTAL_STEPS', totalSteps: newPen.steps.length})
      dispatch({type: 'SET_STEP_INFO', stepInfo: newPen.steps[0].info})
      dispatch({type: 'SET_CODE', rawCode: newPen.steps[0].code})

      setAutoplay(true)
    }
  }, [loadingPens, pens, hash])

  // When step changes
  useEffect(() => {
    if(!pen) return false

    const newStep = pen.steps[state.step]
    if(!newStep) return

    // Step info
    const newInfo = newStep.info || `Step ${state.step + 1}`
    dispatch({type: 'SET_STEP_INFO', stepInfo: newInfo})
    dispatch({type: 'SET_CODE', rawCode: newStep.code})

    // Close pen list menu when pen is selected
    setShowPenList('')
  }, [state.step, pen])

  // Play
  useEffect(() => {
    if(autoplay) {
      const timeout = setTimeout(() => {
        if (state.step >= pen.steps.length - 1) {
          setAutoplay(false)
        } else {
          dispatch({type: 'SET_STEP', step: state.step + 1})
        }
      }, 1000)

      return () => clearTimeout(timeout)
    }
  }, [autoplay, state.step, pen.steps])

  function handlePlayStop() {
    const newAutoplay = !autoplay
    setAutoplay(newAutoplay)
  }

  // Functions to check is can move to next or previous step
  const notNext = () => state.step + 1 >= state.totalSteps
  const notPrev = () => state.step <= 0

  function handleNext() {
    if (notNext()) return

    setAutoplay(false)
    dispatch({type: 'SET_STEP', step: state.step + 1})
  }

  function handlePrev() {
    if (notPrev()) return

    setAutoplay(false)
    dispatch({type: 'SET_STEP', step: state.step - 1})
  }

  if(loadingPens || !pen) {
    return <div className='Spinner' />
  }

  return (
    <div className={`App ${showPenList}`}>
      <div className='PenList'>
        <button className='Button PenList__close' onClick={() => { setShowPenList('') }}>Close</button>

        {pens.map((item) => <PenCard key={item.id} pen={item} active={hash} />)}
      </div>

      <div className='Editor' style={{background: pen.bg}}>
        <div className='Editor__code'>
          <div className='Editor__step-info'>{state.stepInfo}</div>

          <div className='Code'>
            <Code parsedCode={state.parsedCode} />

            <Tag html={`<style type="text/css">${state.rawCode}</style>`} />
          </div>

          <div className='Buttons Editor__buttons'>
            <button className='Button' onClick={handlePlayStop}>{autoplay ? 'Stop' : 'Play'}</button>
            <button className='Button' disabled={true}>{`${state.step + 1}/${state.totalSteps}`}</button>
            <button className='Button' onClick={handlePrev} disabled={notPrev()}>{'<'}</button>
            <button className='Button' onClick={handleNext} disabled={notNext()}>{'>'}</button>
            <button className='Button button--more' onClick={() => { setAutoplay(false); setShowPenList('show-pen-list') }}>More!</button>
          </div>
        </div>

        <Tag html={pen.html} className='Editor__html' />
      </div>
    </div>
  )
}
