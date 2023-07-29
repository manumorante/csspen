import { getPens } from "@/utils/pens"
import Link from "next/link"

export default async function Pens() {
  const pens = await getPens()
  if (!pens) return null

  return (
    <>
      {pens.map((pen) => (
        <Link href={pen.id} key={pen.id}>
          {pen.name}
        </Link>
      ))}
    </>
  )
}
