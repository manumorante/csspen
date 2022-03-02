import parseCSS from './parseCSS'

export function reducer (state, action) {
  switch (action.type) {
    case 'SET_PEN':
      return {
        ...state,
        ...action.pen,
        loading: false,
        loaded: true,
        rewind: false,
        step: 0,
        totalSteps: action.pen.totalSteps,
        stepInfo: action.pen.steps[action.pen.totalSteps - 1].info,
        rawCode: action.pen.steps[action.pen.totalSteps - 1].code,
        parsedCode: parseCSS(action.pen.steps[action.pen.totalSteps - 1].code),
        menu: '',
      }

    case 'UPDATE_STEP':
      return {
        ...state,
        stepInfo: state.steps[state.step].info,
        rawCode: state.steps[state.step].code,
        parsedCode: parseCSS(state.steps[state.step].code),
        menu: '',
      }

    case 'LOADING':
      return { ...state, loading: true }

    case 'NEXT_STEP':
      return { ...state, step: state.step < state.totalSteps ? state.step + 1 : state.step }

    case 'PREV_STEP':
      return { ...state, step: state.step > 0 ? state.step - 1 : state.step }

    case 'REWIND':
      return { ...state, step: state.totalSteps - 1, autoplay: false, rewind: true }

    case 'PLAY':
      return { ...state, step: 0, autoplay: true, rewind: false }

    case 'STOP':
      return { ...state, autoplay: false, rewind: false }

    case 'SHOW_MENU':
      return { ...state, menu: 'ac-menu' }

    case 'HIDE_MENU':
      return { ...state, menu: '' }

    default:
      throw new Error()
  }
}
