import React from "react"
import cx from "clsx"

const Html = React.memo(({ html }: { html: string }) => {
  const mainCx = cx(
    "Html",
    "isolate",
    "absolute inset-0 m-auto",
    "w-pen h-pen",
    "grid place-items-center",
    "transition-all"
  )

  return <div className={mainCx} dangerouslySetInnerHTML={{ __html: html }} />
})

export default Html
