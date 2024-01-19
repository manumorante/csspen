/**
 * Esta, la "Pen Page" carga en modo server los pens.
 * Luego se los pasa al "Pen Component" y trabaja con useApi() en modo client. *
 * Nota: no tengo nada claro esto de hacer dos tipos de cargas, y menos siendo el admin.
 */

import Error from "@/components/Error"
import AdminPen from "@/components/admin/AdminPen"
import { getPensAndPen } from "@/utils/pens"

import cx from "clsx"

async function AdminPenPage({ params }: Props) {
  const { penID } = params
  const { pens, pen } = await getPensAndPen({ penID })
  if (!pens)
    return <Error msg="Pens is empty" log={["pens", pens, "pen", pen]} />
  if (!pen)
    return <Error msg="Pen not found" log={["pens", pens, "pen", pen]} />

  const mainCx = cx(
    "PenPage",
    "w-full h-full",
    "flex justify-center items-center"
  )
  const mainStyle = { backgroundColor: pen.bgcolor }

  return (
    <div className={mainCx} style={mainStyle}>
      <AdminPen penID={penID} />
    </div>
  )
}

export default AdminPenPage

interface Props {
  params: { penID: string }
}
