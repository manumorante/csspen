import Image from 'next/future/image'
import cx from 'classnames'
import Link from 'next/link'
import React from 'react'

export default function Header({ user }) {
  const email = user?.email
  const avatar_url = user?.avatar_url

  return (
    <div className={cx('Header', 'w-full', 'bg-black/10 ', 'border-b border-white dark:border-white/10')}>
      <div className='flex justify-between items-center'>
        <Link href='/admin'>
          <a className='Title text-lg font-bold pl-8'>Admin</a>
        </Link>

        <div className='EmailAndAvatar flex items-center gap-3'>
          <div>{email}</div>
          <Link href='/profile'>
            <a>
              {avatar_url ? (
                <Image src={avatar_url} alt={email} width={40} height={40} />
              ) : (
                <div className='Avatar w-10 h-10 bg-black/20' />
              )}
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}
