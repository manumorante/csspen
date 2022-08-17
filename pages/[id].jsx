import React from 'react'
import { useRouter } from 'next/router'
import { usePens } from '../lib/usePens'

import Pen from '../components/pen'
import Loading from '../components/ui/Loading'

export default function Index() {
  const router = useRouter()
  const { id } = router.query
  const { pens, isLoading, isError } = usePens()

  if (isLoading) return <Loading />
  if (isError) return <div>Error</div>

  return <Pen pens={pens} penID={id} />
}
