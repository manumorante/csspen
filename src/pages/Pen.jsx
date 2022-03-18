import React, { useState, useEffect, useReducer } from 'react'
import DocumentMeta from 'react-document-meta'
import { useParams } from 'react-router-dom'
import { GetPenByIDUseCase } from '../js/GetPenByIDUseCase'
import { reducer } from '../js/reducer'
import { KeyStyle as S, layout as L } from '../js/Styles.js'
import Styles from '../components/Styles'
import Html from '../components/Html'
import Code from '../components/Code'
import List from '../components/List'
import Controls from '../components/Controls'
import Progress from '../components/Progress'
import StepInfo from '../components/StepInfo'

// Pen object: initial state
const initialState = {
  loading: false,
  loaded: false,
  autoplay: false,
  step: -1,
}

export default function Pen() {
  const { slug = 'heart' } = useParams()
  const [pen, dispatch] = useReducer(reducer, initialState)
  const [meta, setMeta] = useState({})

  useEffect(() => {
    // Don't fetch if slug is equal to current pen or if loading
    if (slug === pen.id || pen.loading) return false

    dispatch({ type: 'LOADING' })

    // Fetch Pen and dispatch reducer to set pen
    const GetPenByID = new GetPenByIDUseCase()
    GetPenByID.execute({ penID: slug }).then((penObtained) => {
      if (!penObtained) {
        console.error(`Pen not found slug(${slug}). penObtained:`, penObtained)
        return false
      }

      setMeta({
        title: `Dibuja un '${penObtained.name}' en solo ${penObtained.totalSteps} pasos`,
        description: `${penObtained.info}`,
        canonical: `http://csspen.es/pen/${penObtained.id}`,
        meta: {
          charset: 'utf-8',
          name: {
            keywords: 'css,html,code,art,animation',
          },
        },
      })

      dispatch({ type: 'CLOSE_MENU' })
      dispatch({ type: 'SET_PEN', pen: penObtained })
    })
  }, [slug, pen])

  // Play
  useEffect(() => {
    if (pen.autoplay) {
      const timeout = setTimeout(() => {
        if (pen.step >= pen.totalSteps - 1) dispatch({ type: 'STOP' })
        else dispatch({ type: 'NEXT' })
      }, 1000)

      return () => clearTimeout(timeout)
    }
  }, [pen.autoplay, pen])

  // Rewind
  useEffect(() => {
    if (pen.rewind) {
      const timeout = setTimeout(() => {
        if (pen.step <= 0) dispatch({ type: 'PLAY' })
        else dispatch({ type: 'PREV' })
      }, 1000)

      return () => clearTimeout(timeout)
    }
  }, [pen.rewind, pen])

  return (
    <DocumentMeta {...meta}>
      <div {...S(['pen'])}>
        <div
          {...S(
            ['list', 'base'],
            pen.menuIsOpen ? L.list.open : L.list.closed
          )}>
          <div
            className={`Button absolute z-30 top-6 right-6 sm:hidden ${
              !pen.menuIsOpen && 'hidden'
            }`}
            onClick={() => {
              dispatch({ type: 'CLOSE_MENU' })
            }}>
            {/* TODO import this svg */}
            <svg
              className='h-8 w-8 text-white'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'>
              <line x1='15' y1='9' x2='9' y2='15' />
              <line x1='9' y1='9' x2='15' y2='15' />
            </svg>
          </div>
          <List active={slug} />
        </div>

        <div {...S(['editor'], 'bg-neutral-900')}>
          <Controls pen={pen} dispatch={dispatch} />
          <StepInfo pen={pen} dispatch={dispatch} />
          <Code pen={pen} dispatch={dispatch} />
        </div>

        <div {...S(['stage', 'base'])} style={{ background: pen.bg }}>
          <Html pen={pen} />
          <Progress pen={pen} />
        </div>

        <Styles pen={pen} />
      </div>
    </DocumentMeta>
  )
}
