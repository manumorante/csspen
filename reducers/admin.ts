import { StateAdmin, Pen } from "@/types"

type ActionType =
  | { type: "INIT"; pens: Pen[] }
  | { type: "DONE" }
  | { type: "WORKING"; msg: string }
  | { type: "ERROR"; msg: string }

export function adminReducer(
  state: StateAdmin,
  action: ActionType
): StateAdmin {
  switch (action.type) {
    case "INIT":
      const _pen = action.pens.find((p) => p.id === state.penID)
      const pen = _pen || action.pens[0]
      return {
        ...state,
        penID: state.penID,
        pens: action.pens,
        pen,
        steps: pen.steps,
        loading: false,
        working: false,
        workingMsg: '',
        error: false,
        errorMsg: '',
      }

    case "WORKING":
      return { ...state, working: true, workingMsg: action.msg }

    case "DONE":
      return { ...state, working: false, workingMsg: "" }

    case "ERROR":
      return { ...state, error: true, errorMsg: action.msg }
  }
}
