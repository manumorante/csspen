import React, { useState } from 'react'
import { addStep, deleteStep, getPens, getUserByCookie } from 'database'
import { PlusCircleIcon, TrashIcon, XMarkIcon } from '@heroicons/react/20/solid'
import Layout from '../../components/admin/Layout'
import Button from '@/Button'
import Step from '@/admin/Step'

export default function PenIndex({ pen, user }) {
  const [steps, setSteps] = useState(pen.steps)
  const [creatingStep, setCreatingStep] = useState(false)

  const onNew = () => {
    const lastStepCss = steps[steps.length - 1].css
    const newStep = { num: steps.length + 1, info: 'New step ...', css: lastStepCss, isNew: true }
    setSteps([...steps, newStep])
    setCreatingStep(true)
  }

  const cancelLastNewStep = () => {
    const newSteps = steps.filter((_i, index) => index !== steps.length - 1)

    setSteps(newSteps)
    setCreatingStep(false)
  }

  const handleDeleteStep = async ({ num }) => {
    const options = { penID: pen.id, num }
    const data = await deleteStep(options)

    if (data) {
      console.log(`Step ${num} of ${pen.id} deleted`)
    }
    return data
  }

 

  return (
    <Layout user={user}>
      <div className='Buttons flex gap-1 p-2'>
        {!creatingStep && <Button label='New step' icon={<PlusCircleIcon />} onClick={onNew} />}
        {creatingStep && <Button label='Cancel' icon={<XMarkIcon />} onClick={cancelLastNewStep} />}
      </div>
      
      <div className='Steps flex snap-x snap-mandatory overflow-y-auto'>
        {steps.map((step, i) => (
          <Step
            key={i}
            i={i}
            penID={pen.id}
            total={steps.length}
            html={pen.html}
            css={step.css}
            bg={pen.colors.c3}
            isNew={step.isNew}
          />
        ))}
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
