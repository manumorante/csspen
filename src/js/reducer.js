import parseCSS from './parseCSS'

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
    case 'SET_CODE':
      return {
        ...state,
        rawCode: action.rawCode,
        parsedCode: parseCSS(action.rawCode)
      }
    default:
      throw new Error()
  }
}
