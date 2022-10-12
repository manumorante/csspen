import Header from '@/admin/Header'
import cx from 'classnames'
export default function Layout({ children, user, pens, pen, createPen, updatePen, deletePen }) {
  return (
    <div className={cx('AdminLayout', 'w-full h-full pt-10', ' bg-gray-800 text-gray-300')}>
      <Header user={user} pens={pens} pen={pen} createPen={createPen} updatePen={updatePen} deletePen={deletePen} />
      {children}
    </div>
  )
}
