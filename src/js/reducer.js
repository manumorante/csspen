import parseCSS from './parseCSS'

export const initialState = {
  step: 0,
  totalSteps: 0,
  stepInfo: '',
  rawCode: '',
  parsedCode: '',
  autoplay: true,
}

export function reducer (state, action) {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, step: action.step }
    case 'NEXT_STEP':
      return { ...state, step: state.step >= state.totalSteps ? state.step : state.step + 1 }
    case 'PREV_STEP':
      return { ...state, step: state.step >= 1 ? state.step : state.step - 1 }
    case 'SET_TOTAL_STEPS':
      return { ...state, totalSteps: action.totalSteps }
    case 'SET_STEP_INFO':
      return { ...state, stepInfo: action.stepInfo }
    case 'SET_CODE':
      return {
        ...state,
        rawCode: action.rawCode,
        parsedCode: parseCSS(action.rawCode)
      }
    case 'SET_AUTOPLAY':
      return { ...state, autoplay: action.autoplay }
    default:
      throw new Error()
  }
}
