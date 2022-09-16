import Image from 'next/future/image'
import cx from 'classnames'
import Link from 'next/link'
import React from 'react'

export default function Header({ user: param }) {
  const identity = param?.identities[0]?.identity_data || {}
  const user = { ...param, ...identity }

  return (
    <div className={cx('Header', 'w-full', 'bg-black/10 ', 'border-b border-white dark:border-white/10')}>
      <div className='flex justify-between items-center'>
        <div className='Title text-lg font-bold pl-8'>Admin</div>
        <div className='EmailAndAvatar flex items-center gap-3'>
          <div>{user.email}</div>
          <Link href='/profile'>
            <a>
              <Image src={user.avatar_url} alt={user.email} width={40} height={40} />
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}
