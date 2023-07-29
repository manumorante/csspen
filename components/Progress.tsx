import StepBar from "@/components/StepBar"

export default function Progress({
  total,
  start,
  callback,
}: {
  total: number
  start: number
  callback: () => void
}) {
  const mainCx = "Progress flex gap-1 xs:px-4 xs:pt-4"

  return (
    <div className={mainCx}>
      {Array.from({ length: total }, (_, i) => (
        <StepBar
          key={i}
          step={i}
          isDone={i < start}
          isActive={i === start}
          isTodo={i > start}
          whenDone={callback}
        />
      ))}
    </div>
  )
}
