import { useState } from 'react'
import { BoltIcon } from '@heroicons/react/20/solid'
import Button from '@/Button'

export default function NewPenForm({ onCreatePen }) {
  const [id, setId] = useState()
  const [name, setName] = useState()
  const [info, setInfo] = useState()

  const handleCreate = () => {
    if (!id || !name || !info) return
    onCreatePen({ id, name, info })
  }

  return (
    <div className='p-8'>
      <h3 className='font-medium text-xl mb-3'>Creating new pen</h3>
      <div className='flex flex-col items-end gap-3 '>
        <input id='id' type='text' placeholder='id' className='input w-full' onChange={(e) => setId(e.target.value)} />
        <input
          id='name'
          type='text'
          placeholder='name'
          className='input w-full'
          onChange={(e) => setName(e.target.value)}
        />
        <input
          id='info'
          type='text'
          placeholder='info'
          className='input w-full'
          onChange={(e) => setInfo(e.target.value)}
        />
        <Button icon={<BoltIcon />} label='Create' onClick={handleCreate} />
      </div>
    </div>
  )
}
