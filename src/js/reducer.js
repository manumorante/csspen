import parseCSS from './parseCSS'

export function reducer (state, action) {
  switch (action.type) {
    case 'LOAD':
      return {
        ...state,
        ...action.pen,
        loaded: true,
        step: 0,
        totalSteps: action.pen.totalSteps,
        stepInfo: action.pen.steps[0].info,
        rawCode: action.pen.steps[0].code,
        parsedCode: parseCSS(action.pen.steps[0].code),
      }

    case 'NEXT_STEP':
      return { ...state, step: state.step < state.totalSteps ? state.step + 1 : state.step }

    case 'PREV_STEP':
      return { ...state, step: state.step > 0 ? state.step - 1 : state.step }

    case 'UPDATE_STEP':
      return {
        ...state,
        step: action.step,
        stepInfo: state.steps[action.step].info,
        rawCode: state.steps[action.step].code,
        parsedCode: parseCSS(state.steps[action.step].code),
      }

    case 'PLAY':
      return { ...state, step: 1, autoplay: true }

    case 'STOP':
      return { ...state, autoplay: false }

    default:
      throw new Error()
  }
}
