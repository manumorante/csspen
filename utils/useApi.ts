import { useEffect, useReducer, useCallback } from "react"
import {
  getPens,
  dbUpdateStep,
  dbCreateStep,
  dbDeleteStep,
  dbCreatePen,
  dbUpdatePen,
  dbDeletePen,
} from "@/utils/pens"
import { adminReducer } from "@/reducers/admin"
import { Pen, Step } from "@/types"

function useApi({ penID } = { penID: "heart" }) {
  const [state, acc] = useReducer(adminReducer, { penID, loading: true })

  const accError = (msg: string) => {
    acc({ type: "ERROR", msg })
    return false
  }

  // RELOAD
  // Load pens from database
  const reload = useCallback(() => {
    acc({ type: "WORKING", msg: "Loading" })
    getPens().then((pens) => {
      acc({ type: "INIT", pens })
    })
  }, [])

  useEffect(() => {
    reload()
  }, [reload])

  // UPDATE STEP
  const updateStep = async ({
    penID,
    num,
    css,
    info,
  }: {
    penID: string
    num: number
    css: string
    info: string
  }) => {
    acc({ type: "WORKING", msg: "Saving step" })

    let error = await dbUpdateStep({ penID, num, css, info })
    if (error) return accError("Error saving step")

    reload()
  }

  // CREATE STEP
  const createStep = async ({ pen_id, num, css, info }: Step) => {
    acc({ type: "WORKING", msg: "Creating new step" })

    let error = await dbCreateStep({ pen_id, num, css, info })
    if (error) return accError("Error creating new step")

    reload()
  }

  // DELETE STEP
  const deleteStep = async ({ penID, num }: { penID: string; num: number }) => {
    acc({ type: "WORKING", msg: "Deleting step" })

    let error = await dbDeleteStep({ penID, num })
    if (error) return accError("Error deleting step")

    reload()
  }

  // CREATE PEN
  const createPen = async (pen: Pen) => {
    acc({ type: "WORKING", msg: "Creating new pen" })

    let error = await dbCreatePen(pen)
    if (error) return accError("Error creating new pen")

    reload()
  }

  // UPDATE PEN
  const updatePen = async (pen: Pen) => {
    acc({ type: "WORKING", msg: "Saving pen" })

    let error = await dbUpdatePen(pen)
    if (error) return accError("Error saving pen")

    reload()
  }

  // DELETE PEN
  const deletePen = async ({ penID }: { penID: string }) => {
    acc({ type: "WORKING", msg: "Deleting pen" })

    let error = await dbDeletePen({ penID })
    if (error) return accError("Error deleting pen")

    // TODO: cambiar. la redirección es una decision en la app
    window.location.href = "/admin"
    return error
  }

  return {
    state,
    acc,
    updateStep,
    createStep,
    deleteStep,
    createPen,
    updatePen,
    deletePen,
  }
}

export default useApi
