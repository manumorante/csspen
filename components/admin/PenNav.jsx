export default function PenNav({ pens }) {
  return (
    <nav className='absolute w-full sm:w-auto top-full flex flex-col bg-gray-200 dark:bg-gray-800'>
      {pens.map((pen) => (
        <a
          href={`/admin/${pen.id}`}
          className='flex gap-2 px-8 py-4 border-b border-white/10 hover:bg-gray-500/20'
          key={pen.id}>
          <span>{pen.name}</span>
          <span className='text-gray-500'>{pen.info}</span>
        </a>
      ))}
    </nav>
  )
}
