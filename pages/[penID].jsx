import React from 'react'
import { useApiContext } from '../context/ApiContext'
import { useMediaQuery } from '../lib/useMediaQuery'
import Mobile from '../components/Mobile'
import Desktop from '../components/Desktop'
import PenHead from '../components/pen/PenHead'

export default function Index() {
  const isDesktop = useMediaQuery(768)
  const { state } = useApiContext()

  return (
    <>
      {state.loaded && <PenHead pen={state.pen} />}
      {isDesktop ? <Desktop /> : <Mobile />}
    </>
  )
}
