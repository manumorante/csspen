import React, { useState } from 'react'
import { addStep, deleteStep, getPens, getUserByCookie } from 'database'
import { PlusCircleIcon, TrashIcon, ArrowUturnLeftIcon } from '@heroicons/react/20/solid'
import Layout from '../../components/admin/Layout'
import Step from '../../components/admin/Step'
import Button from '@/Button'

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
      <div className='Pen'>
        <div className='Steps flex sm:gap-4 sm:px-4 snap-x snap-mandatory overflow-y-auto pb-12'>
          {steps.map((step, i) => {
            const firstStep = i === 0
            const lastStep = i === steps.length - 1
            const isNew = step.new
            return (
              <div key={`${pen.id}-${i}`}>
                <div className='flex py-2 justify-between gap-2'>
                  <Button>{i + 1}</Button>

                  {lastStep && !firstStep && !isNew && (
                    <Button onClick={() => handleDeleteStep({ num: step.num })}>
                      <TrashIcon />
                    </Button>
                  )}

                  {isNew && (
                    <>
                      <Button onClick={() => cancelNewStep(i)}>
                        <ArrowUturnLeftIcon />
                      </Button>
                      <Button onClick={() => saveNewStep({ step: step.num, info: step.info, css: step.css })}>
                        Save
                      </Button>
                    </>
                  )}
                </div>

                <Step penID={pen.id} html={pen.html} bg={pen.colors.c3} step={i} info={step.info} css={step.css} />
              </div>
            )
          })}
          {!creatingStep && (
            <Button onClick={addNewStep}>
              <PlusCircleIcon />
            </Button>
          )}
        </div>
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
