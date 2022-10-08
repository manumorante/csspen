import { useEffect, useReducer, useCallback } from 'react'
import { getPens, updateStep, createStep, deleteStep, createPen, deletePen } from 'database'
import { adminReducer } from 'lib/adminReducer'

export default function useApi({ penID } = { penID: 'heart' }) {
  const [state, accApp] = useReducer(adminReducer, { penID, loading: true })

  const dispatchError = (error) => {
    accApp({ type: 'ERROR', error })
    return false
  }

  // RELOAD
  // Load pens from database
  const reload = useCallback(() => {
    accApp({ type: 'WORKING', working: 'Loading' })
    getPens().then((pens) => {
      accApp({ type: 'INIT', pens })
    })
  }, [])

  useEffect(() => {
    reload()
  }, [reload])

  // UPDATE STEP
  const onUpdateStep = async ({ penID, num, css, info }) => {
    accApp({ type: 'WORKING', working: 'Saving step' })

    let error = await updateStep({ penID, num, css, info })
    if (error) return dispatchError('Error saving step')

    reload()
  }

  // CREATE STEP
  const onCreateStep = async ({ penID, num, css, info }) => {
    accApp({ type: 'WORKING', working: 'Creating new step' })

    let options = { penID, num, css, info }
    let error = await createStep(options)
    if (error) return dispatchError('Error creating new step')

    reload()
  }

  // DELETE STEP
  const onDeleteStep = async ({ penID, num }) => {
    accApp({ type: 'WORKING', working: 'Deleting step' })

    let error = await deleteStep({ penID, num })
    if (error) return dispatchError('Error deleting step')

    reload()
  }

  // CREATE PEN
  const onCreatePen = async ({ id, name, info }) => {
    accApp({ type: 'WORKING', working: 'Creating new pen' })

    let error = await createPen({ id, name, info })
    if (error) return dispatchError('Error creating new pen')

    reload()
  }

  // DELETE PEN
  const onDeletePen = async ({ penID }) => {
    accApp({ type: 'WORKING', working: 'Deleting pen' })

    let error = await deletePen({ penID })
    if (error) return dispatchError('Error deleting pen')

    window.location.href = '/admin'
    return error
  }

  return { state, accApp, onUpdateStep, onCreateStep, onDeleteStep, onCreatePen, onDeletePen }
}
