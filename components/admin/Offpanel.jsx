import Button from '@/Button'
import cx from 'classnames'
import { XMarkIcon } from '@heroicons/react/20/solid'

export default function Offpanel({ children, id, open, setOffpanelOpen }) {
  return (
    <aside
      className={cx(
        'absolute w-96 h-screen top-full left-0',
        'bg-gray-200 dark:bg-gray-900',
        'transition-transform duration-300 ease-in-out',
        {
          '-translate-x-full z-0': open !== id,
          'z-50': open === id,
        }
      )}>
      <>
        <Button icon={<XMarkIcon />} onClick={() => setOffpanelOpen(null)} className='absolute top-3 right-3' />
        {children}
      </>
    </aside>
  )
}
