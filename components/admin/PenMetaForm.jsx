import { useState } from 'react'
import { BoltIcon } from '@heroicons/react/20/solid'
import Button from '@/Button'

export default function PenMetaForm({ id: _id, name: _name, info: _info, html: _html, onSave }) {
  const [id, setId] = useState(_id)
  const [name, setName] = useState(_name)
  const [info, setInfo] = useState(_info)
  const [html, setHtml] = useState(_html)

  const handleCreate = () => {
    if (!id || !name || !info) return
    onSave({ id, name, info })
  }

  return (
    <div className='p-8'>
      <h3 className='font-medium text-xl mb-3'>Update Pen info</h3>
      <div className='flex flex-col items-end gap-3 '>
        <input
          id='id'
          type='text'
          placeholder='id'
          className='input w-full'
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <input
          id='name'
          type='text'
          placeholder='name'
          className='input w-full'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          id='info'
          type='text'
          placeholder='info'
          className='input w-full'
          value={info}
          onChange={(e) => setInfo(e.target.value)}
        />
        <textarea
          id='html'
          rows={4}
          placeholder='html'
          className='input w-full'
          value={html}
          onChange={(e) => setHtml(e.target.value)}
        />
        <Button icon={<BoltIcon />} label='Create' onClick={handleCreate} />
      </div>
    </div>
  )
}
