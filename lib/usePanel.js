import { useEffect, useState, useCallback } from 'react'
import cx from 'classnames'
import { XMarkIcon } from '@heroicons/react/20/solid'
import Button from '@/Button'

export function Panel({ children, id, opened, activate }) {
  const [isOpen, setIsOpen] = useState(id === opened)

  const toggle = useCallback(() => setIsOpen(!isOpen), [isOpen])
  const close = useCallback(() => setIsOpen(false), [])

  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.key === 'Escape') close()
    }

    document.addEventListener('keydown', handleKeydown)
    return () => document.removeEventListener('keydown', handleKeydown)
  }, [close])

  return (
    <>
      <div onClick={toggle}>{activate}</div>
      <aside
        id={id}
        className={cx(
          'Panel',
          'absolute w-96 h-screen top-full left-0',
          'bg-gray-200 dark:bg-gray-900',
          'transition-transform duration-300 ease-in-out',
          {
            '-translate-x-full z-40': !isOpen,
            'z-50': isOpen,
          }
        )}>
        <>
          <Button icon={<XMarkIcon />} onClick={toggle} className='absolute top-3 right-3' />
          {children}
        </>
      </aside>
    </>
  )
}

export function usePanel() {
  const setOpenPanel = useCallback((id) => {
    console.log('setOpenPanel', id)
  }, [])

  return { setOpenPanel }
}
