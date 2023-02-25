import { useEffect } from 'react'
import cx from 'clsx'
import { XMarkIcon } from '@heroicons/react/20/solid'
import Button from '@/ds/Button'

export default function Panel({ children, isActive, close }) {
  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.key === 'Escape') close()
    }

    document.addEventListener('keydown', handleKeydown)
    return () => document.removeEventListener('keydown', handleKeydown)
  }, [close])

  return (
    <>
      <aside
        className={cx(
          'Panel',
          'absolute w-96 h-screen top-0 left-0',
          'bg-gray-900',
          'transition-transform duration-300 ease-in-out',
          {
            '-translate-x-full z-20': !isActive,
            'z-40': isActive,
          }
        )}>
        <>
          <Button icon={<XMarkIcon />} onClick={close} className='absolute top-3 right-3' />
          {isActive && children}
        </>
      </aside>
    </>
  )
}
