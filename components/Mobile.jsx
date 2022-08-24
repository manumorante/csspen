import React, { useEffect, useRef } from 'react'
import { useApiContext } from '../context/ApiContext'
import Code from './pen/control/Code'
import Controls from './pen/control/Controls'
import StepInfo from './pen/control/StepInfo'

import Style from './pen/view/Style'
import PenView from './pen/view/PenView'

export default function PenMobile() {
  const { state, dispatch } = useApiContext()
  const codeRef = useRef()

  const getHTML = (state) => (state.loaded ? state.pen.html : '')
  const getCSS = (state) => (state.loaded ? state.pen.steps[state.step].css : '')

  useEffect(() => {
    const node = codeRef.current
    if (!node) return

    const handleCodeClick = () => {
      if (!state.showCode) {
        dispatch({ type: 'SHOW_CODE' })
        node.removeEventListener('click', handleCodeClick)
      }
    }

    if (state.showCode) {
      node.style.transform = `translateY(0px)`

      // Remove click listener
      node.removeEventListener('click', handleCodeClick)
    }

    if (!state.showCode) {
      node.style.transform = `translateY(${node.offsetHeight * 0.9}px)`

      // Add click listener
      node.addEventListener('click', handleCodeClick)
    }

    // Add transition classes only after the first render
    setTimeout(() => {
      node.classList.add('transition-transform', 'duration-500', 'ease-in-out')
    }, 0)

    return () => {
      node.removeEventListener('click', handleCodeClick)
    }
  }, [codeRef, state.showCode, dispatch])

  useEffect(() => {
    document.documentElement.style.backgroundColor = state?.pen?.colors?.c3
  }, [state?.pen?.colors?.c3])

  return (
    <div className='Pen w-screen h-screen overflow-hidden'>
      <div className='fixed w-full h-screen'>
        <PenView html={getHTML(state)} />
        <Style css={getCSS(state)} />
      </div>

      <div className='fixed z-20 w-full p-4'>
        <Controls state={state} dispatch={dispatch} />
        <StepInfo state={state} dispatch={dispatch} />
      </div>

      <div
        ref={codeRef}
        className='Code relative z-10 w-full h-screen overflow-y-auto py-11 px-6 bg-black/30 backdrop-blur-sm'>
        <Code state={state} dispatch={dispatch} />
      </div>
    </div>
  )
}
