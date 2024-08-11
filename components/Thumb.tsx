import cx from "clsx"

export default function Thumb({
  id,
  name,
  bgcolor,
  textcolor,
}: {
  id: string
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
      <img
        src={`/og/${id}.png`}
        className="w-full h-full object-cover"
        alt={name}
        width={96}
        height={96}
      />
      {name}
    </div>
  )
}
