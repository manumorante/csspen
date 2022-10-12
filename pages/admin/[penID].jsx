import { devUser, getUserByCookie } from 'database'
import { isDev } from 'lib/isDev'
import useApi from 'lib/useApi'
import Layout from '@/admin/Layout'
import Steps from '@/admin/Steps'

export default function PenIndex({ user, penID }) {
  const { state, createPen, updatePen, deletePen, updateStep, createStep, deleteStep } = useApi({ penID })

  if (state.loading) return null

  return (
    <Layout
      user={user}
      pens={state.pens}
      pen={state.pen}
      {...createPen}
      {...updatePen}
      {...deletePen}
      working={state.working}
      error={state.error}>
      <Steps pen={state.pen} steps={state.steps} {...updateStep} {...createStep} {...deleteStep} />
    </Layout>
  )
}

export async function getServerSideProps({ req, params }) {
  if (isDev) return { props: { user: devUser, penID: params.penID } }

  const { user } = await getUserByCookie(req)
  if (!user) return { props: {}, redirect: { destination: '/login', permanent: false } }
  return { props: { user: user.user_metadata, penID: params.penID } }
}
