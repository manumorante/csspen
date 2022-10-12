import React from 'react'
import { devUser, getUserByCookie } from 'database'
import { BoltIcon } from '@heroicons/react/20/solid'
import Layout from '@/admin/Layout'
import useApi from 'lib/useApi'
import { isDev } from 'lib/isDev'

export default function Admin({ user }) {
  const { state, createPen } = useApi()

  if (state.loading) return null

  return (
    <Layout user={user} pens={state.pens} createPen={createPen}>
      <div className='w-full h-full flex items-center justify-center'>
        <BoltIcon className='w-20 h-20' />
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  if (isDev) return { props: { user: devUser } }

  const { user } = await getUserByCookie(req)
  if (!user) return { props: {}, redirect: { destination: '/login', permanent: false } }
  return { props: { user: user.user_metadata } }
}
