import { useState, useCallback } from 'react'
import Image from 'next/future/image'
import {
  Bars3Icon,
  CodeBracketIcon,
  ExclamationTriangleIcon,
  HomeIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/20/solid'
import Button from '@/Button'
import { Menu, MenuItems, MenuBg, MenuContent } from './Menu'
import Error from './Error'
import Workikng from './Working'
import Panel from './Panel'
import PenNav from './PenNav'
import PenForm from './PenForm'

export default function Layout({ children, user, pens, pen, createPen, updatePen, deletePen, working, error }) {
  const [panelActive, setPanelActive] = useState()

  const activePanel = useCallback((id) => {
    setPanelActive(id)
  }, [])

  const closePanel = useCallback(() => {
    setPanelActive()
  }, [])

  const isPanelActive = useCallback(
    (id) => {
      return panelActive === id
    },
    [panelActive]
  )

  return (
    <div className='AdminLayout w-full h-full text-gray-300'>
      <Menu>
        <MenuItems>
          <Button onClick={() => activePanel('PEN_NAV')} icon={<Bars3Icon />} />
          {pen && <Button onClick={() => activePanel('UPDATE_PEN')} icon={<CodeBracketIcon />} />}
          {pen && <Button onClick={() => activePanel('DELETE_PEN')} icon={<TrashIcon />} />}
        </MenuItems>

        <MenuItems>
          <Button href='/admin' icon={<HomeIcon />} />
          <Button onClick={() => activePanel('NEW_PEN')} icon={<PlusIcon />} />

          <div
            onClick={() => activePanel('USER_INFO')}
            className='Avatar cursor-pointer rounded-full w-10 h-10 flex items-center justify-center bg-black/20'>
            <Image src={user.avatar_url} width={40} height={40} alt='Avatar' />
          </div>
        </MenuItems>

        <MenuBg />

        <MenuContent>
          <Panel isActive={isPanelActive('PEN_NAV')} close={closePanel}>
            <PenNav pens={pens} activeID={pen?.id} />
          </Panel>

          <Panel isActive={isPanelActive('UPDATE_PEN')} close={closePanel}>
            <div className='p-6'>
              <h3 className='font-medium text-xl mb-3'>Update Pen</h3>
              {pen && (
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
              )}
            </div>
          </Panel>

          <Panel isActive={isPanelActive('DELETE_PEN')} close={closePanel}>
            <div className='h-full p-6 bg-red-900 text-center'>
              <ExclamationTriangleIcon className='w-10 h-10 inline' />
              <div className='py-6 font-medium text-lg'>
                Deleting <span className='font-extrabold'>{pen?.name}</span>. Are you sure?
              </div>
              <Button icon={<TrashIcon />} label='Delete' onClick={() => deletePen({ penID: pen?.id })} />
            </div>
          </Panel>

          <Panel isActive={isPanelActive('NEW_PEN')} close={closePanel}>
            <div className='p-6'>
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

          <Panel isActive={isPanelActive('USER_INFO')} close={closePanel}>
            <div className='p-6 text-lg'>
              <Image className='mb-4' src={user.avatar_url} width={100} height={100} alt='Avatar' />
              <div className='font-bold'>{user.full_name}</div>
              <div className=''>{user.email}</div>
            </div>
          </Panel>
        </MenuContent>
      </Menu>
      {children}

      <Workikng working={working} />
      <Error error={error} />
    </div>
  )
}
