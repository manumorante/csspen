import React, { useState, useEffect } from 'react'
import { getPens, getUserByCookie } from 'database'
import { useRouter } from 'next/router'
import Layout from '@/admin/Layout'
import Step from '@/admin/Step'

export default function PenIndex({ user }) {
  const router = useRouter()
  const { penID } = router.query

  const [pen, setPen] = useState()
  const [pens, setPens] = useState([])
  const [steps, setSteps] = useState([])
  const [isWritingNewStep, setIsWritingNewStep] = useState(false)

  useEffect(() => {
    const fetchPens = async () => {
      const fetchPens = await getPens()
      const currentPen = fetchPens.find((p) => p.id === penID)
      setPens(fetchPens)
      setPen(currentPen)
      setSteps(currentPen.steps)
    }

    fetchPens()
  }, [penID])

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

  if (!pen) return null

  const appProps = {
    onNewPrev,
    onNewNext,
    isWritingNewStep,
    setIsWritingNewStep,
  }

  const penProps = {
    id: pen.id,
    total: steps.length,
    html: pen.html,
    bg: pen.colors.c3,
  }

  return (
    <Layout user={user} pens={pens} pen={pen}>
      <div className='Steps flex snap-x snap-mandatory overflow-y-auto'>
        {steps.map((step, index) => {
          const stepProps = {
            index: index,
            info: step.info,
            css: step.css,
            isNew: step.isNew,
          }

          return <Step key={index} app={appProps} pen={penProps} step={stepProps} />
        })}
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  const user = await getUserByCookie(params.req)
  if (!user) return { props: {}, redirect: { destination: '/login', permanent: false } }
  return { props: { user } }
}
