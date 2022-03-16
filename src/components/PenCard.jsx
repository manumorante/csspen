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

  let cute = ['PenCard py-10 px-7 border-l-8 transition-opacity']
  let simple = 'opacity-60  border-neutral-800 hover:opacity-100'
  let active = 'opacity-100 border-red-700'
  cute.push(isActive ? active : simple)
  const styles = { backgroundColor: pen.bg }

  return (
    code && (
      <Link className={cute.join(' ')} to={`/pen/${pen.id}`} style={styles}>
        {code && (
          <div className='w-full flex  justify-center pb-8'>
            <PenCover title={pen.name} html={pen.html} css={code} />
          </div>
        )}

        <div className='PenCard__name text-xl text-neutral-100'>{pen.name}</div>
        <div className='PenCard__info text-md text-neutral-400'>{pen.info}</div>
      </Link>
    )
  )
}
