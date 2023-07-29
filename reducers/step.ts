import { StateStep } from "@/types"

type ActionType =
  | { type: "SET_CSS"; css: string }
  | { type: "NO_EDITED" }
  | { type: "SET_INFO"; info: string }
  | { type: "SET_INITIAL"; css: string; info: string }
  | { type: "RESET" }
  | { type: "FOCUS" }
  | { type: "BLUR" }

export function stepReducer(state: StateStep, action: ActionType): StateStep {
  switch (action.type) {
    case "SET_CSS":
      return {
        ...state,
        css: action.css,
        edited: true,
      }
    case "NO_EDITED":
      return {
        ...state,
        css: state._css,
        edited: false,
      }
    case "SET_INFO":
      return {
        ...state,
        info: action.info,
        edited: true,
      }
    case "SET_INITIAL":
      return {
        ...state,
        _css: action.css,
        _info: action.info,
      }

    case "RESET":
      return {
        ...state,
        css: state._css,
        info: state._info,
        edited: false,
      }

    case "FOCUS":
      return {
        ...state,
        focus: true,
      }

    case "BLUR":
      return {
        ...state,
        focus: false,
      }

    default:
      console.error("Unknown action type", action)
      return state
  }
}
