import React from 'react'
import { getPens, getUserByCookie } from 'database'
import { BoltIcon } from '@heroicons/react/20/solid'
import Layout from '@/admin/Layout'

export default function Admin({ user, pens }) {
  return (
    <Layout user={user} pens={pens}>
      <div className='w-full h-full flex items-center justify-center'>
        <BoltIcon className='w-20 h-20' />
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  const user = await getUserByCookie(req)
  if (!user) return { props: {}, redirect: { destination: '/login', permanent: false } }

  const pens = await getPens()

  return { props: { user, pens } }
}
