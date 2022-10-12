/* eslint-disable @next/next/no-html-link-for-pages */
import React from 'react'
import { Bars3Icon, CodeBracketIcon, ExclamationTriangleIcon, PlusIcon, TrashIcon } from '@heroicons/react/20/solid'
import PenNav from './PenNav'
import Button from '@/Button'
import Panel from '@/admin/Panel'
import PenForm from './PenForm'

export default function Header({ pens, pen, createPen, updatePen, deletePen }) {
  if (!pens || !pen) return null

  return (
    <div className='Header w-full h-10 fixed top-0 z-50 bg-gray-900'>
      <div className='h-10 flex justify-between items-start'>
        <div className='Left h-full flex gap-3 items-center'>
          <Panel id='pennav' activate={<Button icon={<Bars3Icon />} />}>
            <PenNav pens={pens} />
          </Panel>

          <Panel id='updatepen' activate={<Button icon={<CodeBracketIcon />} label={pen.name} />}>
            <div className='p-8'>
              <h3 className='font-medium text-xl mb-3'>Update Pen</h3>
              <PenForm
                defaults={{
                  id: pen.id,
                  name: pen.name,
                  info: pen.info,
                  html: pen.html,
                  brandcolor: pen.brandcolor,
                  textcolor: pen.textcolor,
                  bgcolor: pen.bgcolor,
                }}
                onSubmit={updatePen}
              />
            </div>
          </Panel>

          <Panel id='newpen' activate={<Button icon={<PlusIcon />} label='New' />}>
            <div className='p-8'>
              <h3 className='font-medium text-xl mb-3'>New Pen</h3>
              <PenForm
                defaults={{
                  html: '<div class="ID"></div>',
                  brandcolor: 'OrangeRed',
                  textcolor: 'PeachPuff',
                  bgcolor: 'Orange',
                }}
                onSubmit={createPen}
              />
            </div>
          </Panel>

          <Panel id='deletepen' activate={<Button icon={<TrashIcon />} label='Delete' />}>
            <div className='h-full p-6 bg-red-900 text-center'>
              <ExclamationTriangleIcon className='w-10 h-10 inline' />
              <div className='py-6 font-medium text-lg'>
                Deleting <span className='font-extrabold'>{pen.name}</span>. Are you sure?
              </div>
              <Button icon={<TrashIcon />} label='Delete' onClick={() => deletePen({ penID: pen.id })} />
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
