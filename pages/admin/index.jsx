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
            <a className='flex gap-2 px-8 py-4 border-b border-white/10 hover:bg-black/50'>
              <span>{pen.name}</span>
              <span className='text-gray-500'>{pen.info}</span>
            </a>
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
