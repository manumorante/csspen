import Header from '@/admin/Header'

export default function Layout({ children, user }) {
  return (
    <div className='AdminLayout bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'>
      <Header user={user} />
      {children}
    </div>
  )
}
