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
  const index = pens.findIndex((item) => item.id === pen.id)
  const nextPen =
    index !== -1 && index < pens.length - 1 ? pens[index + 1] : pens[0]
  const prevPen =
    index !== -1 && index > 0 ? pens[index - 1] : pens[pens.length - 1]

  const [state, dispatch] = useReducer(penReducer, {
    pens: pens,
    pen: pen,
    nextPen: nextPen,
    prevPen: prevPen,
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
    dispatch({ type: "NEXT_STEP" })
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
  const infoCx = cx(
    "Info absolute z-20 left-16 right-16 text-2xl text-center",
    "bottom-1/4",
    "transition-opacity duration-500",
    {
      "opacity-100": state.codeHide,
      "opacity-0": !state.codeHide,
    }
  )
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
  // const navCx = cx("Nav", { "h-0": !state.codeHide, "h-24": state.codeHide })
  // const navPensCx =
  //   "NavPens h-24 flex overflow-x-auto snap-mandatory snap-x select-none"

  const nextLinkCx = cx(
    "absolute",
    "z-20",
    "right-0",
    "bottom-[10%]",
    "translate-x-full",
    "animate-peek",
    "transition-opacity duration-500",
    {
      "opacity-100": state.codeHide,
      "opacity-0": !state.codeHide,
    }
  )
  const nextThumbCx = cx("w-20", "h-20", "mx-4")

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
          isPlaying={state.isPlaying}
          total={state.pen.steps.length}
          start={state.step}
          callback={() => dispatch({ type: "NEXT_STEP" })}
        />
        <PenInfo pen={pen} />
      </div>

      {/* View */}
      <div className={viewCx}>
        <div className={infoCx} style={infoStyle}>
          <div className={infoTextCx}>{state.currentInfo}</div>
        </div>

        {state.isFirstStep ? (
          <Link className={navLeftCx} href={`/${prevPen.id}`}>
            <ChevronRightIcon className={navIconRightCx} />
          </Link>
        ) : (
          <div
            className={navLeftCx}
            onClick={() => dispatch({ type: "PREV_STEP", isPlaying: false })}
          >
            <ChevronLeftIcon className={navIconLeftCx} />
          </div>
        )}

        {state.isLastStep ? (
          <Link className={nextLinkCx} href={`/${nextPen.id}`}>
            <div
              className="flex items-center pl-4 rounded-l-xl shadow-lg"
              style={{ background: nextPen.bgcolor, color: nextPen.textcolor }}
            >
              <div>
                <div className="text-sm opacity-75">SIGUIENTE</div>
                <div className="text-xl">{nextPen.name}</div>
              </div>
              <img
                className={nextThumbCx}
                src={`/thumbs/${nextPen.id}.png`}
                alt={nextPen.name}
              />
            </div>
          </Link>
        ) : (
          <div className={navRightCx} onClick={handleNextStep}>
            <ChevronRightIcon className={navIconRightCx} />
          </div>
        )}

        <Html html={pen.html} />
        <Style css={state.currentCSS} />

        <Btn
          onClick={() => dispatch({ type: "CODE_MID" })}
          className={btnCodeCx}
        >
          <CodeBracketIcon />
        </Btn>

        <Btn
          onClick={() => dispatch({ type: "CODE_FULL" })}
          className={btnMagCx}
        >
          <ChevronUpIcon />
        </Btn>
      </div>

      {/* Code */}
      <div className={codeCx}>
        <Code css={state.currentCSS} />

        {state.codeFull && (
          <Btn
            onClick={() => dispatch({ type: "CODE_MID" })}
            className={btnCloseCx}
          >
            <ChevronDownIcon />
          </Btn>
        )}

        {state.codeMid && (
          <Btn
            onClick={() => dispatch({ type: "CODE_HIDE" })}
            className={btnCloseCx}
          >
            <XMarkIcon />
          </Btn>
        )}
      </div>

      {/* Nav */}
      {/* <div className={navCx}>
        <div className={navPensCx}>
          {pens.map(({ id, name, bgcolor, textcolor }) => (
            <Link key={id} href={`/${id}`}>
              <Thumb
                id={id}
                name={name}
                bgcolor={bgcolor}
                textcolor={textcolor}
              />
            </Link>
          ))}
        </div>
      </div> */}
    </div>
  )
}
