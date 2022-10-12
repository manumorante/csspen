import Button from '@/Button'
import { HomeIcon } from '@heroicons/react/20/solid'

export default function PenNav({ pens, className }) {
  return (
    <nav className={`flex flex-col ${className}`}>
      <div className='px-6 py-3'>
        <Button icon={<HomeIcon />} href='/admin' />
      </div>
      {pens.map((pen) => (
        <a
          href={`/admin/${pen.id}`}
          className='text-lg flex gap-2 px-8 py-4 border-b border-white/10 hover:bg-gray-500/20'
          key={pen.id}>
          <span>{pen.name}</span>
          <span className='text-gray-500'>{pen.info}</span>
        </a>
      ))}
    </nav>
  )
}
