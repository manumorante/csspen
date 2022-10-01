import React from 'react'
import { getPens, getUserByCookie } from 'database'
import Link from 'next/link'
import Layout from '@/admin/Layout'

export default function Admin({ user, pens }) {
  return (
    <Layout user={user}>
      <div className='Pens flex flex-col'>
        {pens.map((pen) => (
          <Link href={`/admin/${pen.id}`} key={pen.id}>
            <a>{pen.name}</a>
          </Link>
        ))}
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  const user = await getUserByCookie(req)

  if (!user) {
    return { props: {}, redirect: { destination: '/login', permanent: false } }
  }

  const pens = await getPens()

  return { props: { user, pens } }
}
