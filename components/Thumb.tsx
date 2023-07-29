import cx from "clsx"

export default function Thumb({
  name,
  bgcolor,
  textcolor,
}: {
  name: string
  bgcolor: string
  textcolor: string
}) {
  const mainCx = cx(
    "Thumb h-full aspect-square",
    "snap-center shrink-0",
    "grid place-items-center text-center",
    "overflow-hidden",
    "md:cursor-pointer"
  )
  const mainStyle = { backgroundColor: bgcolor, color: textcolor }

  return (
    <div className={mainCx} style={mainStyle}>
      {name}
    </div>
  )
}
