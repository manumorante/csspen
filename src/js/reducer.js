// Manage pen with useReducer
export const initialState = {
  step: 0,
  totalSteps: 0,
  stepInfo: '',
  rawCode: '',
  parsedCode: ''
}

export function reducer (state, action) {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, step: action.step }
    case 'SET_TOTAL_STEPS':
      return { ...state, totalSteps: action.totalSteps }
    case 'SET_STEP_INFO':
      return { ...state, stepInfo: action.stepInfo }
    case 'SET_RAW_CODE':
      return { ...state, rawCode: action.rawCode }
    case 'SET_PARSED_CODE':
      return { ...state, parsedCode: action.parsedCode }
    default:
      throw new Error()
  }
}
