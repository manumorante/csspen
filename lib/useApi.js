import { useEffect, useReducer, useCallback } from 'react'
import { getPens, updateStep, createStep, deleteStep } from 'database'
import { adminReducer } from 'lib/adminReducer'

export default function useApi({ penID }) {
  const [state, dispatch] = useReducer(adminReducer, { penID, loading: true })

  const dispatchError = (error) => {
    dispatch({ type: 'ERROR', error })
    return false
  }

  const reload = useCallback(() => {
    dispatch({ type: 'WORKING', working: 'Loading' })
    getPens().then((pens) => {
      dispatch({ type: 'INIT', pens })
    })
  }, [])

  useEffect(() => {
    reload()
  }, [reload])

  const onUpdateStep = async ({ penID, num, css, info }) => {
    dispatch({ type: 'WORKING', working: 'Saving step' })

    let error = await updateStep({ penID, num, css, info })
    if (error) return dispatchError('Error saving step')

    dispatch({ type: 'DONE' })
  }

  const onCreateStep = async ({ penID, num, css, info }) => {
    dispatch({ type: 'WORKING', working: 'Creating new step' })

    let options = { penID, num, css, info }
    let error = await createStep(options)
    if (error) return dispatchError('Error creating new step')

    reload()
  }

  const onDeleteStep = async ({ penID, num }) => {
    dispatch({ type: 'WORKING', working: 'Deleting step' })

    let error = await deleteStep({ penID, num })
    if (error) return dispatchError('Error deleting step')

    reload()
  }

  return { state, dispatch, onUpdateStep, onCreateStep, onDeleteStep }
}
