import useSWR from 'swr'
import { fetcher } from './fetcher'
export function usePens() {
  const { data, error } = useSWR(`/api/pens`, fetcher)

  return {
    pens: data,
    isLoading: !error && !data,
    isError: error,
  }
}
