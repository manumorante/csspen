import Link from 'next/link'
import { Card, Typography, Space } from '@supabase/ui'
import { supabase } from 'database/supabase'
import Image from 'next/image'

export default function Profile({ user }) {
  console.log(user.email)
  return (
    <div style={{ maxWidth: '420px', margin: '96px auto' }}>
      <Card>
        <Space direction='vertical' size={6}>
          <Typography.Text>You are signed in</Typography.Text>
          <Typography.Text strong>Email: {user.email}</Typography.Text>
          <Typography.Text type='success'>
            User data retrieved server-side (from Cookie in getServerSideProps):
          </Typography.Text>

          <div>
            <Image
              src={user.identities[0].identity_data.avatar_url}
              alt={user.user_metadata.name}
              width={100}
              height={100}
            />
          </div>

          <Typography.Text>
            <Link href='/'>
              <a>Static example with useSWR</a>
            </Link>
          </Typography.Text>
        </Space>
      </Card>
    </div>
  )
}

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req)

  if (!user) {
    // If no user, redirect to index.
    return { props: {}, redirect: { destination: '/login', permanent: false } }
  }

  // If there is a user, return it.
  return { props: { user } }
}
