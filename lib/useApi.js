import { useReducer } from 'react'
import { updateStep } from 'database'
import { reducer, initialState } from 'lib/adminReducer'

export default function useApi({ pens, pen }) {
  const [state, dispatch] = useReducer(reducer, initialState({ pens, pen }))

  const onUpdateStep = async ({ penID, num, css, info }) => {
    dispatch({ type: 'WORKING', working: 'Saving step' })

    let error = await updateStep({ penID, num, css, info })
    if (error) {
      dispatch({ type: 'ERROR', error: 'Algo ha ido mal :(' })
      return
    }

    dispatch({ type: 'DONE' })
  }

  return { state, dispatch, onUpdateStep }
}
