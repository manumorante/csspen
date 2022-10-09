import { useCallback } from 'react'

export function usePanel() {
  const setOpenPanel = useCallback((id) => {
    console.log('setOpenPanel', id)
  }, [])

  return { setOpenPanel }
}
