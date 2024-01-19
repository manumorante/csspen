import { State, Pen } from "@/types"

type ActionType =
  | { type: "SET_PEN"; payload: Pen }
  | { type: "NEXT_PEN" }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "PLAY" }
  | { type: "STOP" }
  | { type: "CODE_FULL" }
  | { type: "CODE_MID" }
  | { type: "CODE_HIDE" }

export function penReducer(state: State, action: ActionType): State {
  const steps = state.pen.steps

  switch (action.type) {
    case "SET_PEN":
      return { ...state, pen: action.payload }
    case "NEXT_PEN":
      return {
        ...state,
      }

    case "NEXT_STEP":
      if (state.isLastStep) return state

      let next = state.step + 1

      return {
        ...state,
        step: next,
        currentCSS: steps[next].css,
        currentInfo: steps[next].info,
        isFirstStep: next === 0,
        isLastStep: next === steps.length - 1,
      }
    case "PREV_STEP":
      if (state.isFirstStep) return state

      const prev = state.step - 1

      return {
        ...state,
        step: prev,
        currentCSS: steps[prev].css,
        currentInfo: steps[prev].info,
        isFirstStep: prev === 0,
        isLastStep: prev === steps.length - 1,
      }
    case "PLAY":
      console.log("PLAY")
      return { ...state, isPlaying: true }
    case "STOP":
      console.log("STOP")
      return { ...state, isPlaying: false }
    case "CODE_FULL":
      return { ...state, codeFull: true, codeMid: false, codeHide: false }
    case "CODE_MID":
      return { ...state, codeFull: false, codeMid: true, codeHide: false }
    case "CODE_HIDE":
      return { ...state, codeFull: false, codeMid: false, codeHide: true }
    default:
      console.error("Unknown action type", action)
      return state
  }
}
