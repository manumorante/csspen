import { getUserByCookie } from 'database'
import useApi from 'lib/useApi'
import Layout from '@/admin/Layout'
import Step from '@/admin/Step'
import Error from '@/admin/Error'
import Workikng from '@/admin/Working'
import { PlusCircleIcon } from '@heroicons/react/20/solid'

export default function PenIndex({ user, penID }) {
  const { state, onUpdateStep, onCreateStep, onDeleteStep, onCreatePen, onDeletePen } = useApi({ penID })

  if (state.loading) return null

  return (
    <Layout user={user} pens={state.pens} pen={state.pen} onCreatePen={onCreatePen} onDeletePen={onDeletePen}>
      <Workikng working={state.working} />
      <Error error={state.error} />

      <div className='Steps z-10 relative flex w-full snap-x gap-4 overflow-x-auto'>
        <div
          className='Step w-screen sm:w-40 my-6 shrink-0 snap-center ml-[25%] rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer flex items-center justify-center transition-colors duration-300 ease-in-out'
          onClick={() => onCreateStep({ penID: state.pen.id, num: state.steps.length + 1, css: '', info: '' })}>
          <PlusCircleIcon className='h-12 w-12 text-white/50' />
        </div>

        {state.steps.map((step) => {
          return (
            <Step
              key={step.num}
              penID={state.pen.id}
              num={step.num}
              html={state.pen.html}
              css={step.css}
              info={step.info}
              bg={state.pen.colors.c3}
              total={state.steps.length}
              onUpdateStep={onUpdateStep}
              onCreateStep={onCreateStep}
              onDeleteStep={onDeleteStep}
            />
          )
        })}

        <div
          className='Step w-screen sm:w-40 my-6 shrink-0 snap-center mr-[25%] rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer flex items-center justify-center transition-colors duration-300 ease-in-out'
          onClick={() => onCreateStep({ penID: state.pen.id, num: state.steps.length + 1, css: '', info: '' })}>
          <PlusCircleIcon className='h-12 w-12 text-white/50' />
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  const user = await getUserByCookie(params.req)
  if (!user) return { props: {}, redirect: { destination: '/login', permanent: false } }
  return { props: { user, penID: params.penID } }
}
