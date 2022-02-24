import parseCSS from './parseCSS'

export const initialState = {
  step: 1,
  totalSteps: 0,
  stepInfo: '',
  rawCode: '',
  parsedCode: '',
  autoplay: true,
}

export function reducer (state, action) {
  switch (action.type) {
    case 'NEXT_STEP':
      return { ...state, step: state.step < state.totalSteps ? state.step + 1 : state.step }
    case 'PREV_STEP':
      console.log('PREV_STEP')
      return { ...state, step: state.step > 1 ? state.step - 1 : state.step }
    case 'SET_TOTAL_STEPS':
      return { ...state, totalSteps: action.totalSteps }
    case 'SET_STEP_INFO':
      return { ...state, stepInfo: action.stepInfo || `Step ${state.step}` }
    case 'SET_CODE':
      return {
        ...state,
        rawCode: action.rawCode,
        parsedCode: parseCSS(action.rawCode)
      }
    case 'PLAY':
      return { ...state, step: 1, autoplay: true }
    case 'STOP':
      return { ...state, autoplay: false }
    default:
      throw new Error()
  }
}
