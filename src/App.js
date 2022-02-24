import React, { useState, useEffect } from 'react'
import parseCSS from './js/parseCSS'
import usePens from './js/usePens'
import useHash from './js/useHash'
import createPen from './js/createPen'
import PenCard from './components/PenCard'
import Tag from './components/Tag'
import Code from './components/Code'

export default function App () {
  const {loadingPens, pens} = usePens()
  const hash = useHash()
  const [pen, setPen] = useState(false)
  const [step, setStep] = useState(0)
  const [totalSteps, setTotalSteps] = useState(0)
  const [stepInfo, setStepInfo] = useState()
  const [rawCode, setRawCode] = useState()
  const [parsedCode, setParsedCode] = useState()
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
      setStep(0)
      setTotalSteps(newPen.steps.length)
      setStepInfo(newPen.steps[0].info)
      setRawCode(newPen.steps[0].code)
      setParsedCode(parseCSS(newPen.steps[0].code))
      setAutoplay(true)
    }
  }, [loadingPens, pens, hash])

  // When step changes
  useEffect(() => {
    if(!pen) return false

    const newStep = pen.steps[step]
    if(!newStep) return

    // Step info
    const newInfo = newStep.info || `Step ${step + 1}`
    setStepInfo(newInfo)

    // Raw code
    setRawCode(newStep.code)

    // Parsed Code
    setParsedCode(parseCSS(newStep.code))

    // Close pen list menu when pen is selected
    setShowPenList('')
  }, [step, pen])

  // Play
  useEffect(() => {
    if(autoplay) {
      const timeout = setTimeout(() => {
        if (step >= pen.steps.length - 1) {
          setAutoplay(false)
        } else {
          setStep(step => step + 1)
        }
      }, 1000)

      return () => clearTimeout(timeout)
    }
  }, [autoplay, step, pen.steps])

  function handlePlayStop() {
    const newAutoplay = !autoplay
    setAutoplay(newAutoplay)
  }

  // Functions to check is can move to next or previous step
  const notNext = () => step + 1 >= totalSteps
  const notPrev = () => step <= 0

  function handleNext() {
    if (notNext()) return

    setAutoplay(false)
    setStep(step => step + 1)
  }

  function handlePrev() {
    if (notPrev()) return

    setAutoplay(false)
    setStep(step => step - 1)
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
          <div className='Editor__step-info'>{stepInfo}</div>

          <div className='Code'>
            <Code parsedCode={parsedCode} handleUpdateRawCode={setRawCode} />

            <Tag html={`<style type="text/css">${rawCode}</style>`} />
          </div>

          <div className='Buttons Editor__buttons'>
            <button className='Button' onClick={handlePlayStop}>{autoplay ? 'Stop' : 'Play'}</button>
            <button className='Button' disabled={true}>{`${step + 1}/${totalSteps}`}</button>
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
