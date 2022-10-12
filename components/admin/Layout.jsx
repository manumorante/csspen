import Image from 'next/future/image'
import { Bars3Icon, CodeBracketIcon, ExclamationTriangleIcon, PlusIcon, TrashIcon } from '@heroicons/react/20/solid'
import Button from '@/Button'
import Panel from './Panel'
import { Header, HeaderArea } from './Header'
import PenNav from './PenNav'
import PenForm from './PenForm'

export default function Layout({ children, user, pens, pen, createPen, updatePen, deletePen }) {
  return (
    <div className='AdminLayout w-full h-full pt-10 bg-gray-800 text-gray-300'>
      <Header>
        <HeaderArea>
          <Panel id='pennav' activate={<Button icon={<Bars3Icon />} />}>
            <PenNav pens={pens} />
          </Panel>

          {pen && (
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
          )}

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

          {pen && (
            <Panel id='deletepen' activate={<Button icon={<TrashIcon />} label='Delete' />}>
              <div className='h-full p-6 bg-red-900 text-center'>
                <ExclamationTriangleIcon className='w-10 h-10 inline' />
                <div className='py-6 font-medium text-lg'>
                  Deleting <span className='font-extrabold'>{pen.name}</span>. Are you sure?
                </div>
                <Button icon={<TrashIcon />} label='Delete' onClick={() => deletePen({ penID: pen.id })} />
              </div>
            </Panel>
          )}
        </HeaderArea>

        <HeaderArea>
          <Panel
            id='user'
            activate={
              <div className='Avatar cursor-pointer rounded-full w-10 h-10 flex items-center justify-center bg-black/20'>
                <Image src={user.avatar_url} width={40} height={40} alt='Avatar' />
              </div>
            }>
            <div className='p-8 text-lg'>
              <Image className='mb-4' src={user.avatar_url} width={100} height={100} alt='Avatar' />
              <div className='font-bold'>{user.full_name}</div>
              <div className=''>{user.email}</div>
            </div>
          </Panel>
        </HeaderArea>
      </Header>
      {children}
    </div>
  )
}
