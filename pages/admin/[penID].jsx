import React, { useState } from 'react'
import { addStep, deleteStep, getPens, getUserByCookie } from 'database'
import { PlusCircleIcon, TrashIcon, ArrowUturnLeftIcon } from '@heroicons/react/20/solid'
import Layout from '../../components/admin/Layout'
import Button from '@/Button'
import StepEditor from '@/admin/StepEditor'
import Step from '@/admin/Step'

export default function PenIndex({ pen, user }) {
  const [steps, setSteps] = useState(pen.steps)
  const [creatingStep, setCreatingStep] = useState(false)

  const addNewStep = () => {
    const css = steps[steps.length - 1].css
    const newStep = { num: steps.length + 1, info: 'New step ...', css: css, new: true }

    setSteps([...steps, newStep])
    setCreatingStep(true)
  }

  const cancelNewStep = (step) => {
    const newSteps = steps.filter((item, index) => index !== step)

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

  // Guardar fila en base de datos
  const saveNewStep = async ({ step, info, css }) => {
    const options = { penID: pen.id, step, info, css }
    const data = await addStep(options)

    if (data) {
      console.log('Step saved')
    }
    return data
  }

  return (
    <Layout user={user}>
      <div className='Steps flex snap-x snap-mandatory overflow-y-auto'>
        {steps.map((step, i) => (
          <Step key={i} i={i} penID={pen.id} total={steps.length} html={pen.html} css={step.css} bg={pen.colors.c3} />
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
