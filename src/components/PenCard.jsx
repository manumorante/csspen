import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GetLastStepUseCase } from '../js/GetLastStepUseCase'
import PenCover from './PenCover'

export default function PenCard({ pen, isActive = false }) {
  const [code, setCode] = useState('')

  useEffect(() => {
    const GetLastStep = new GetLastStepUseCase()
    GetLastStep.execute({ penID: pen.id }).then((step) => {
      setCode(encodeURIComponent(step.code))
    })
  }, [pen.id])

  const classes = isActive ? 'active' : ''
  const styles = { backgroundColor: pen.bg }

  return (
    <Link to={`/pen/${pen.id}`} className={`PenCard ${classes}`} style={styles}>
      {code && (
        <div className='PenCard__cover'>
          <PenCover title={pen.name} html={pen.html} css={code} />
        </div>
      )}

      <div className='PenCard__name'>{pen.name}</div>
      <div className='PenCard__info'>{pen.info}</div>
    </Link>
  )
}
