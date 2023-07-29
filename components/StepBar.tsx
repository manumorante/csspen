import { useEffect, useRef } from "react"

export default function StepBar({
  step,
  isDone,
  isActive,
  isTodo,
  whenDone,
}: {
  step: number
  isDone: boolean
  isActive: boolean
  isTodo: boolean
  whenDone: () => void
}) {
  const stepRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<number>(0)

  useEffect(() => {
    const setProgress = (value: number) => {
      if (stepRef.current) stepRef.current.style.width = value + "%"
    }

    let time = 0
    const anima = () => {
      setProgress(++time)

      if (time >= 100) {
        whenDone()
      } else {
        frameRef.current = requestAnimationFrame(anima)
      }
    }

    setProgress(isDone ? 100 : 0)

    // Start progress
    if (isActive) frameRef.current = requestAnimationFrame(anima)

    return () => cancelAnimationFrame(frameRef.current)
  }, [isTodo, isActive, isDone, whenDone])

  return (
    <div className="grow bg-white/30" title={`Step ${step + 1}`}>
      <div ref={stepRef} className="h-0.5 bg-white"></div>
    </div>
  )
}
