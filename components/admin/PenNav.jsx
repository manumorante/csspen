import cx from 'classnames'

function Item({ href, icon, label, info, isActive }) {
  return (
    <a
      href={href}
      className={cx('PenNavItem', 'px-8 py-4 border-b border-white/10', 'flex items-center gap-2', {
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
    <nav className='h-full flex flex-col overflow-y-auto'>
      {pens.map((pen) => {
        return (
          <Item
            key={pen.id}
            href={'/admin/' + pen.id}
            label={pen.name}
            info={pen.info}
            isActive={pen.id === activeID}
          />
        )
      })}
    </nav>
  )
}
