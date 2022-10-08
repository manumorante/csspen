import React from 'react'
import { getUserByCookie } from 'database'
import { BoltIcon } from '@heroicons/react/20/solid'
import Layout from '@/admin/Layout'
import useApi from 'lib/useApi'

export default function Admin({ user }) {
  const { state, onCreatePen, onDeletePen } = useApi()

  if (state.loading) return null

  return (
    <Layout user={user} pens={state.pens} pen={state.pen} onCreatePen={onCreatePen} onDeletePen={onDeletePen}>
      <div className='w-full h-full flex items-center justify-center'>
        <BoltIcon className='w-20 h-20' />
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  const user = await getUserByCookie(req)
  if (!user) return { props: {}, redirect: { destination: '/login', permanent: false } }

  return { props: { user } }
}
