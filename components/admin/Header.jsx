/* eslint-disable @next/next/no-html-link-for-pages */
import React from 'react'
import cx from 'classnames'
import { Bars3Icon, ExclamationTriangleIcon, PlusIcon, TrashIcon } from '@heroicons/react/20/solid'
import PenNav from './PenNav'
import Button from '@/Button'
import NewPenForm from '@/admin/NewPenForm'
import { Panel } from 'lib/usePanel'

export default function Header({ user, pens, pen, onCreatePen, onDeletePen }) {
  if (!pens || !pen) return null

  return (
    <div
      className={cx(
        'Header',
        'w-full h-10 fixed top-0 z-50',
        'bg-gray-900 ',
        'border-b border-white dark:border-white/10'
      )}>
      <div className='h-10 flex justify-between items-start'>
        <div className='Left h-full flex gap-3 items-center'>
          <Panel id='pennav' activate={<Button icon={<Bars3Icon />} label={pen ? pen.name : 'Pens'} />}>
            <PenNav pens={pens} />
          </Panel>

          <Panel id='newpen' activate={<Button icon={<PlusIcon />} label='New' />}>
            <NewPenForm onCreatePen={onCreatePen} />
          </Panel>

          <Panel id='deletepen' activate={<Button icon={<TrashIcon />} label='Delete' />}>
            <div className='h-full p-6 bg-red-900 text-center'>
              <ExclamationTriangleIcon className='w-10 h-10 inline' />
              <div className='py-6 font-medium text-lg'>
                Deleting <span className='font-extrabold'>{pen.name}</span>. Are you sure?
              </div>
              <Button icon={<TrashIcon />} label='Delete' onClick={() => onDeletePen({ penID: pen.id })} />
            </div>
          </Panel>
        </div>

        <div className='Right h-full flex gap-3 items-center'>
          <div className='flex items-center gap-3'>
            <Panel
              id='user'
              activate={
                <div className='Avatar cursor-pointer rounded-full w-10 h-10 flex items-center justify-center bg-black/20'>
                  M
                </div>
              }>
              User info
            </Panel>
          </div>
        </div>
      </div>
    </div>
  )
}
