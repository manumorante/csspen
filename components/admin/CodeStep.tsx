"use client"

import { useEffect, useCallback, useReducer } from "react"
import { stepReducer } from "@/reducers/step"
import cx from "clsx"
import StepEditor from "@/components/admin/StepEditor"
import Btn from "@/components/Btn"
import {
  BoltIcon,
  PlusIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline"
import { Pen } from "@/types"

export default function CodeStep({
  penID,
  num,
  html,
  css,
  info,
  bgcolor,
  total,
  updateStep,
  createStep,
  deleteStep,
}: Props) {
  const [state, acc] = useReducer(stepReducer, {
    html,
    css,
    _css: css,
    info,
    _info: info,
    focus: false,
    edited: false,
  })

  useEffect(() => {
    const handleKeydown = (e: { key: string }) => {
      if (e.key === "Escape") handleReset()
    }
    window.addEventListener("keydown", handleKeydown)
    return () => window.removeEventListener("keydown", handleKeydown)
  }, [])

  const handleOnChangeCSS: any = useCallback(
    (value: any, _: any) => {
      if (value !== state._css) {
        acc({ type: "SET_CSS", css: value })
      } else {
        acc({ type: "NO_EDITED" })
      }
    },
    [state._css]
  )

  const onInfo: any = useCallback(
    (el: { target: { value: string } }, _: any) => {
      if (el.target.value !== state.info) {
        acc({ type: "SET_INFO", info: el.target.value })
      }
    },
    [state.info]
  )

  const handleSave = () => {
    acc({ type: "SET_INITIAL", css: state.css, info: state.info })
    updateStep({ penID, num, css: state.css, info: state.info })
  }

  const handleDelete = () => {
    // Confirm prompt
    if (window.confirm(`Delete step ${num} from ${penID}?`)) {
      deleteStep({ penID, num })
    }
  }

  const handleReset = () => {
    acc({ type: "RESET" })
  }

  const handleNewNext = () => {
    createStep({ penID, num: total + 1, css: state.css, info: state.info })
  }

  const mainCx = cx(
    "Step",
    "h-screen",
    {
      "lg:w-step": true,
    },
    "shrink-0 snap-center snap-mandatory sm:snap-proximity",
    "xl:rounded-lg border-4",
    {
      "border-transparent": !state.focus && !state.edited,
      "border-white/10": state.focus && !state.edited,
      "border-yellow-600/50": state.edited && !state.focus,
      "border-yellow-400/50": state.edited && state.focus,
    }
  )

  const mainStyle = { backgroundColor: bgcolor }

  return (
    <div className={mainCx} style={mainStyle}>
      <>
        <div className="Buttons w-full h-12 p-2 flex gap-2 justify-between items-center rounded-t-xl bg-black/20">
          <Btn>{num}</Btn>

          <textarea
            rows={1}
            onInput={onInfo}
            onFocus={() => acc({ type: "FOCUS" })}
            onBlur={() => acc({ type: "BLUR" })}
            className="grow outline-0 bg-transparent resize-none"
            value={state.info}
          />
          {state.edited && (
            <>
              <Btn onClick={handleReset}>
                <XCircleIcon />
              </Btn>
              <Btn onClick={handleSave}>
                <div className="flex gap-2 items-center">
                  <BoltIcon />
                  Save
                </div>
              </Btn>
            </>
          )}

          {!state.edited && (
            <>
              <Btn onClick={handleDelete}>
                <TrashIcon />
              </Btn>
              <Btn onClick={handleNewNext}>
                <PlusIcon />
              </Btn>
            </>
          )}
        </div>

        <StepEditor
          num={num}
          html={state.html}
          css={state.css}
          onChange={handleOnChangeCSS}
          onFocus={() => acc({ type: "FOCUS" })}
          onBlur={() => acc({ type: "BLUR" })}
        />
      </>
    </div>
  )
}

type Props = {
  pen: Pen
  //
  penID: string
  num: number
  html: string
  css: string
  info: string
  bgcolor: string
  brandcolor: string
  textcolor: string
  total: number
  updateStep: any
  createStep: any
  deleteStep: any
}
