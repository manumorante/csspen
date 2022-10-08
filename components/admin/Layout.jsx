import Header from '@/admin/Header'
import cx from 'classnames'
export default function Layout({ children, user, pens, pen, onCreatePen, onDeletePen }) {
  return (
    <div
      className={cx(
        'AdminLayout',
        'w-full h-full pt-10',
        'bg-gray-300 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
      )}>
      <Header pens={pens} user={user} pen={pen} onCreatePen={onCreatePen} onDeletePen={onDeletePen} />
      {children}
    </div>
  )
}
