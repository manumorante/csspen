import cx from 'classnames'
import Button from '@/Button'
import { HomeIcon, CodeBracketIcon, ArrowSmallRightIcon } from '@heroicons/react/20/solid'

function Item({ href, icon, label, info, isActive }) {
  return (
    <a
      href={href}
      className={cx('PenNavItem', 'px-6 py-4 border-b border-white/10', 'flex items-center gap-2', {
        'hover:bg-black/20': !isActive,
        'bg-black/50': isActive,
      })}>
      {icon && icon}
      <span className='text-lg'>{label}</span>
      <span className='text-base text-gray-500'>{info}</span>
    </a>
  )
}

export default function PenNav({ pens, activeID }) {
  return (
    <nav className='flex flex-col'>
      <Item href='/admin' icon={<HomeIcon className='w-6 h-6' />} label='Home' />
      {pens.map((pen) => {
        return (
          <Item
            key={pen.id}
            href={'/admin/' + pen.id}
            icon={<ArrowSmallRightIcon className='w-6 h-6' />}
            label={pen.name}
            info={pen.info}
            isActive={pen.id === activeID}
          />
        )
      })}
    </nav>
  )
}
