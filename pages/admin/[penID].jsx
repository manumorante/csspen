import { getPens, getUserByCookie } from 'database'
import useApi from 'lib/useApi'
import Layout from '@/admin/Layout'
import Step from '@/admin/Step'
import Error from '@/admin/Error'
import Workikng from '@/admin/Working'

export default function PenIndex({ user, pens, pen }) {
  const { state, onUpdateStep } = useApi({ pens, pen })

  return (
    <Layout user={user} pens={state.pens} pen={state.pen}>
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
              onUpdateStep={onUpdateStep}
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
  const pens = await getPens()
  const pen = pens.find((p) => p.id === params.penID)
  return { props: { user, pens, pen } }
}
