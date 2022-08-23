import React from 'react'
import { useMediaQuery } from '../lib/useMediaQuery'
import PenMobile from '../components/PenMobile'
import PenDesktop from '../components/PenDesktop'

export default function Index() {
  const isDesktop = useMediaQuery(768)

  return <>{isDesktop ? <PenDesktop /> : <PenMobile />}</>
}
