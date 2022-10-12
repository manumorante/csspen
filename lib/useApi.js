import { useEffect, useReducer, useCallback } from 'react'
import { getPens, dbUpdateStep, dbCreateStep, dbDeleteStep, dbCreatePen, dbUpdatePen, dbDeletePen } from 'database'
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
  const updateStep = async ({ penID, num, css, info }) => {
    accApp({ type: 'WORKING', working: 'Saving step' })

    let error = await dbUpdateStep({ penID, num, css, info })
    if (error) return dispatchError('Error saving step')

    reload()
  }

  // CREATE STEP
  const createStep = async ({ penID, num, css, info }) => {
    accApp({ type: 'WORKING', working: 'Creating new step' })

    let options = { penID, num, css, info }
    let error = await dbCreateStep(options)
    if (error) return dispatchError('Error creating new step')

    reload()
  }

  // DELETE STEP
  const deleteStep = async ({ penID, num }) => {
    accApp({ type: 'WORKING', working: 'Deleting step' })

    let error = await dbDeleteStep({ penID, num })
    if (error) return dispatchError('Error deleting step')

    reload()
  }

  // CREATE PEN
  const createPen = async (data) => {
    accApp({ type: 'WORKING', working: 'Creating new pen' })

    let error = await dbCreatePen(data)
    if (error) return dispatchError('Error creating new pen')

    reload()
  }

  // UPDATE PEN
  const updatePen = async (data) => {
    accApp({ type: 'WORKING', working: 'Saving pen' })

    let error = await dbUpdatePen(data)
    if (error) return dispatchError('Error saving pen')

    reload()
  }

  // DELETE PEN
  const deletePen = async ({ penID }) => {
    accApp({ type: 'WORKING', working: 'Deleting pen' })

    let error = await dbDeletePen({ penID })
    if (error) return dispatchError('Error deleting pen')

    window.location.href = '/admin'
    return error
  }

  return { state, accApp, updateStep, createStep, deleteStep, createPen, updatePen, deletePen }
}
