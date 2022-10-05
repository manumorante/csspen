import React, { useState } from 'react'
import { addStep, deleteStep, getPens, getUserByCookie } from 'database'
import { PlusCircleIcon, TrashIcon, XMarkIcon } from '@heroicons/react/20/solid'
import Layout from '../../components/admin/Layout'
import Button from '@/Button'
import Step from '@/admin/Step'

export default function PenIndex({ pen, user }) {
  const [steps, setSteps] = useState(pen.steps)
  const [isWritingNewStep, setIsWritingNewStep] = useState(false)

  const onNewPrev = (index) => {
    const prevIndex = index - 0.5
    newStep({ from: index, to: prevIndex })
  }

  const onNewNext = (index) => {
    const nextIndex = index + 0.5
    newStep({ from: index, to: nextIndex })
  }

  const newStep = ({ from, to }) => {
    setIsWritingNewStep(true)
    const newStep = { num: to + 1, info: 'Info', css: steps[from].css, isNew: true }
    const newSteps = [...steps, newStep].sort((a, b) => a.num - b.num)
    newSteps.forEach((step, i) => (step.num = i + 1))

    setSteps(newSteps)
  }

  // const handleDeleteStep = async ({ num }) => {
  //   const options = { penID: pen.id, num }
  //   const data = await deleteStep(options)

  //   if (data) {
  //     console.log(`Step ${num} of ${pen.id} deleted`)
  //   }
  //   return data
  // }

  return (
    <Layout user={user}>
      <div className='Steps flex snap-x snap-mandatory overflow-y-auto'>
        {steps.map((step, i) => {
          return (
            <Step
              key={i}
              i={i}
              penID={pen.id}
              total={steps.length}
              html={pen.html}
              info={step.info}
              css={step.css}
              bg={pen.colors.c3}
              isNew={step.isNew}
              onNewPrev={onNewPrev}
              onNewNext={onNewNext}
              isWritingNewStep={isWritingNewStep}
            />
          )
        })}
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  const user = await getUserByCookie(params.req)

  if (!user) {
    return { props: {}, redirect: { destination: '/login', permanent: false } }
  }

  const pens = await getPens()
  const pen = pens.find((p) => p.id === params.penID)

  return { props: { user, pen } }
}
