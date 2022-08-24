import React from 'react'
import { useMediaQuery } from '../lib/useMediaQuery'
import Mobile from '../components/Mobile'
import Desktop from '../components/Desktop'

export default function Index() {
  const isDesktop = useMediaQuery(768)

  return <>{isDesktop ? <Desktop /> : <Mobile />}</>
}
