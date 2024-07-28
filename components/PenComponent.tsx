"use client"

import { penReducer } from "@/reducers/pen"

import Btn from "@/components/Btn"
import Html from "@/components/Html"
import PenInfo from "@/components/PenInfo"
import Progress from "@/components/Progress"
import Style from "@/components/Style"
import Code from "@/components/Code"
import Thumb from "@/components/Thumb"
import {
  CodeBracketIcon,
  ChevronUpIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from "@heroicons/react/20/solid"
import Link from "next/link"

import cx from "clsx"
import { Pen } from "@/types"
import { useReducer } from "react"

export default function PenComponent({ pens, pen }: { pens: Pen[]; pen: Pen }) {
  const [state, acc] = useReducer(penReducer, {
    pens: pens,
    pen: pen,
    step: 0,
    currentCSS: pen?.steps[0]?.css,
    currentInfo: pen?.steps[0]?.info,
    isFirstStep: true,
    isLastStep: pen?.steps.length <= 1,
    isPlaying: true,
    codeFull: false,
    codeMid: false,
    codeHide: true,
  })

  const handleNextStep = () => {
    if (state.isLastStep) {
      acc({ type: "NEXT_PEN" })
      return
    }

    acc({ type: "NEXT_STEP" })
  }

  // Styles
  const mainCx = cx(
    "Pen w-full h-full md:w-[600px] md:h-[88%]",
    "md:rounded-xl",
    "md:shadow-2xl",
    "overflow-hidden",
    "flex flex-col justify-between",
    "transition-children"
  )
  const mainStyle = { backgroundColor: pen.bgcolor }

  // Header
  const headerCx = cx(
    "Header",
    "overflow-hidden relative",
    "bg-gradient-to-b from-black/20",
    {
      "h-24": state.codeHide,
      "h-0": !state.codeHide,
    }
  )

  // View
  const viewCx = cx("View relative overflow-hidden", {
    grow: !state.codeFull,
    "h-0": state.codeFull,
  })
  const infoCx = cx("Info absolute z-20 left-16 right-16 text-center", {
    "top-10 text-2xl": state.codeHide,
    "top-8 text-xl": !state.codeHide,
  })
  const infoStyle = { color: pen.textcolor }
  const infoTextCx = cx("InfoText font-extralight")
  const stepNavCx = cx(
    "StepNav absolute z-10 top-16",
    "flex items-center justify-center w-5/12 bottom-16",
    "active:bg-white/5"
  )
  const navLeftCx = cx(stepNavCx, "left-0")
  const navRightCx = cx(stepNavCx, "right-0")
  const navStepIconCx = cx(
    "NavStepIcon w-16 h-16 text-white/60 opacity-0 animate-appear"
  )
  const navIconLeftCx = cx(navStepIconCx, "mr-24")
  const navIconRightCx = cx(navStepIconCx, "ml-24")

  // Code
  const codeCx = cx("Code", "overflow-hidden relative", "bg-black/40", {
    "h-0": state.codeHide,
    "h-1/2": state.codeMid,
    "h-full": state.codeFull,
  })

  // Nav
  const navCx = cx("Nav", { "h-0": !state.codeHide, "h-24": state.codeHide })
  const navPensCx =
    "NavPens h-24 flex overflow-x-auto snap-mandatory snap-x select-none"

  // Buttons
  const btnCodeCx = cx("absolute right-3 bottom-3", {
    hidden: !state.codeHide,
  })
  const btnMagCx = cx("absolute right-3 bottom-3", {
    hidden: state.codeHide,
  })
  const btnCloseCx = cx("absolute top-3 right-3")

  return (
    <div className={mainCx} style={mainStyle}>
      {/* Header */}
      <div className={headerCx}>
        <Progress
          total={state.pen.steps.length}
          start={state.step}
          callback={() => acc({ type: "NEXT_STEP" })}
        />
        <PenInfo pen={pen} />
      </div>

      {/* View */}
      <div className={viewCx}>
        <div className={infoCx} style={infoStyle}>
          <div className={infoTextCx}>{state.currentInfo}</div>
        </div>

        <div className={navLeftCx} onClick={() => acc({ type: "PREV_STEP" })}>
          <ChevronLeftIcon className={navIconLeftCx} />
        </div>
        <div className={navRightCx} onClick={handleNextStep}>
          <ChevronRightIcon className={navIconRightCx} />
        </div>

        <Html html={pen.html} />
        <Style css={state.currentCSS} />

        <Btn onClick={() => acc({ type: "CODE_MID" })} className={btnCodeCx}>
          <CodeBracketIcon />
        </Btn>

        <Btn onClick={() => acc({ type: "CODE_FULL" })} className={btnMagCx}>
          <ChevronUpIcon />
        </Btn>
      </div>

      {/* Code */}
      <div className={codeCx}>
        <Code css={state.currentCSS} />

        {state.codeFull && (
          <Btn onClick={() => acc({ type: "CODE_MID" })} className={btnCloseCx}>
            <ChevronDownIcon />
          </Btn>
        )}

        {state.codeMid && (
          <Btn
            onClick={() => acc({ type: "CODE_HIDE" })}
            className={btnCloseCx}
          >
            <XMarkIcon />
          </Btn>
        )}
      </div>

      {/* Nav */}
      <div className={navCx}>
        <div className={navPensCx}>
          {pens.map(({ id, name, bgcolor, textcolor }) => (
            <Link key={id} href={`/${id}`}>
              <Thumb name={name} bgcolor={bgcolor} textcolor={textcolor} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
