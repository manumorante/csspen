import cx from "clsx"

export default function Thumb({ penID }: { penID: string }) {
  const mainCx = cx(
    "Card h-full aspect-square",
    "snap-center shrink-0",
    "overflow-hidden",
    "md:cursor-pointer"
  )
  const imgCx = cx("w-full h-full object-cover")

  return (
    <div className={mainCx}>
      <img
        className={imgCx}
        src={`/og/${penID}.png`}
        width={1200}
        height={630}
        alt={penID}
      />
    </div>
  )
}
