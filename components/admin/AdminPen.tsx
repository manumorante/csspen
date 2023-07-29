"use client"

import Loading from "@/components/Loading"
import Error from "@/components/admin/Error"
import Working from "@/components/admin/Working"
import useApi from "@/utils/useApi"
import CodeStepList from "@/components/admin/CodeStepList"
import { Pen } from "@/types"

import cx from "clsx"

function AdminPen({ penID }: { penID: string }) {
  const {
    state,
    // createPen,
    // updatePen,
    // deletePen,
    updateStep,
    createStep,
    deleteStep,
  } = useApi({ penID })

  const mainCx = cx(
    "PenPage",
    "w-full h-full",
    "flex justify-center items-center"
  )

  if (state.error) return <Error />
  if (state.loading || !state.pen) return <Loading />

  return (
    <>
      <div className={mainCx}>
        <CodeStepList
          pen={state.pen}
          updateStep={updateStep}
          createStep={createStep}
          deleteStep={deleteStep}
        />
      </div>
      <Working working={state.working} />
      <Error error={state.error} />
    </>
  )
}

export default AdminPen

interface Props {
  pens: Pen[]
  pen: Pen
}
