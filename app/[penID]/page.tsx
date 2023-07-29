import { Metadata } from "next"
import PenComponent from "@/components/PenComponent"
import Error from "@/components/Error"
import Error404 from "@/components/Error404"
import { getPen, getPensAndPen } from "@/utils/pens"
import { HOST } from "@/utils/url"

import cx from "clsx"

type Props = {
  params: { penID: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { penID } = params
  const pen = await getPen({ penID })

  if (!pen) return {}

  return {
    title: pen.name,
    description: `${pen.name} y otros logos famosos animados paso a paso con CSS`,
    openGraph: {
      images: [
        {
          url: `${HOST}/og/${penID}.png`,
          width: 1200,
          height: 630,
        },
      ],
    },
  }
}

export default async function Page({ params }: Props) {
  const { penID } = params
  const { pens, pen } = await getPensAndPen({ penID })
  if (!pens) return <Error />
  if (!pen) return <Error404 />

  const mainCx = cx(
    "PenPage",
    "w-full h-full",
    "flex justify-center items-center"
  )
  const mainStyle = { backgroundColor: pen.bgcolor }

  return (
    <div className={mainCx} style={mainStyle}>
      <PenComponent pens={pens} pen={pen} />
    </div>
  )
}
