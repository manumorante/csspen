import React, { useEffect, useState } from 'react'
import { getLastStep } from '../js/getLastStep'

export default function PenCard({ pen, isActive = false }) {
  const [code, setCode] = useState('')

  useEffect(() => {
    getLastStep(pen.id).then((step) => {
      if (!step || step.length === 0) {
        console.error(`Error: PenList() getLastStep() step:`, step)
        return false
      }

      setCode(encodeURIComponent(step.code))
    })
  }, [pen.id])

  const stageCSS = `
  html,
  body {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
  }

  body {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  body > div {
    zoom: ${pen.zoom - 0.4};
  }`

  return (
    <a
      href={`#${pen.id}`}
      className={`PenCard ${isActive ? 'active' : ''}`}
      style={{ backgroundColor: pen.bg }}>

      {code && (
        <div className='PenCard__cover'>
          <iframe
            title={`${pen.name} - Pen Cover`}
            src={`data:text/html;charset=utf-8,${
              pen.html
            }<style type="text/css">${stageCSS + code}</style>`}></iframe>
        </div>
      )}

      <div className='PenCard__name'>{pen.name}</div>
      <div className='PenCard__info'>{pen.info}</div>
    </a>
  )
}
