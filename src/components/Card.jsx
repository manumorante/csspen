import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GetLastStepUseCase } from '../js/GetLastStepUseCase'
import Cover from './Cover'

export default function Card({ pen, isActive = false }) {
  const [code, setCode] = useState('')

  useEffect(() => {
    const GetLastStep = new GetLastStepUseCase()
    GetLastStep.execute({ penID: pen.id }).then((step) => {
      setCode(encodeURIComponent(step.code))
    })
  }, [pen.id])

  let cute = ['Card py-10 px-7 sm:border-r-4 sm:transition-opacity text-center']
  let simple = 'sm:border-neutral-600 sm:opacity-60 hover:opacity-100'
  let active = 'sm:opacity-100 sm:border-red-700'
  cute.push(isActive ? active : simple)
  const styles = { backgroundColor: pen.bg }

  return (
    code && (
      <Link className={cute.join(' ')} to={`/pen/${pen.id}`} style={styles}>
        {code && (
          <div className='w-full flex  justify-center pb-8'>
            <Cover title={pen.name} html={pen.html} css={code} />
          </div>
        )}

        <div className='PenCard__name text-xl text-neutral-100'>{pen.name}</div>
        <div className='PenCard__info text-md text-neutral-400'>{pen.info}</div>
      </Link>
    )
  )
}
