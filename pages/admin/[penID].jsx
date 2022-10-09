import { getUserByCookie } from 'database'
import useApi from 'lib/useApi'
import Layout from '@/admin/Layout'
import Step from '@/admin/Step'
import Error from '@/admin/Error'
import Workikng from '@/admin/Working'

export default function PenIndex({ user, penID }) {
  const { state, onUpdateStep, onCreateStep, onDeleteStep, onCreatePen, onDeletePen } = useApi({ penID })

  if (state.loading) return null

  return (
    <Layout user={user} pens={state.pens} pen={state.pen} onCreatePen={onCreatePen} onDeletePen={onDeletePen}>
      <Workikng working={state.working} />
      <Error error={state.error} />

      <div className='Steps flex snap-x snap-mandatory overflow-y-auto'>
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
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  const user = await getUserByCookie(params.req)
  if (!user) return { props: {}, redirect: { destination: '/login', permanent: false } }
  return { props: { user, penID: params.penID } }
}
