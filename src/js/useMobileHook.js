import { useState, useEffect } from 'react'

const MOBILE_WIDTH = 768

export default function useMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_WIDTH)

  function handleWindowSizeChange() {
    setIsMobile(window.innerWidth < MOBILE_WIDTH)
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange)
    return () => window.removeEventListener('resize', handleWindowSizeChange)
  }, [])

  return { isMobile }
}
