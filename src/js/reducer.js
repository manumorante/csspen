import parseCSS from './parseCSS'
import { UpdateStepUseCase } from './UpdateStepUseCase'

// TODO: usar un objeto actions `const actions = { SET = 'SET', ... }`
// Action types:
// SET_ - Guarda o actualiza el estado en memoria
// UPDATE_ - Actualiza en la base de datos

export function reducer(state, action) {
  switch (action.type) {
    case 'SET_PEN':
      return {
        ...state,
        ...action.pen,
        loading: false,
        loaded: true,
        rewind: false,
        writing: false,
        step: 0,
        totalSteps: action.pen.totalSteps,
        stepInfo: action.pen.steps[0].info,
        rawCode: action.pen.steps[0].code,
        parsedCode: parseCSS(action.pen.steps[0].code),
        menu: '',
      }

    case 'SET_STEP':
      return {
        ...state,
        stepInfo: state.steps[state.step].info,
        rawCode: state.steps[state.step].code,
        parsedCode: parseCSS(state.steps[state.step].code),
        menu: '',
      }

    case 'UPDATE_STEP':
      const UpdateStep = new UpdateStepUseCase()
      UpdateStep.execute({
        penID: state.id,
        step: state.step,
        code: state.rawCode,
        info: state.stepInfo,
      }).then(() => console.log('Saved'))

      return { ...state }

    case 'SET_STEP_CODE':
      // Optimizar esto con `...`
      const UPDATE_STEP_CODE_newSteps = state.steps
      UPDATE_STEP_CODE_newSteps[state.step].code = action.code

      return {
        ...state,
        writing: false,
        steps: UPDATE_STEP_CODE_newSteps,
        rawCode: action.code,
        parsedCode: parseCSS(action.code),
      }

    case 'SET_STEP_INFO':
      // Optimizar esto con `...`
      const UPDATE_STEP_INFO_newSteps = state.steps
      UPDATE_STEP_INFO_newSteps[state.step].info = action.stepInfo

      return {
        ...state,
        writing: false,
        steps: UPDATE_STEP_INFO_newSteps,
        stepInfo: action.stepInfo,
      }

    case 'LOADING':
      return { ...state, loading: true }

    case 'WRITING':
      return { ...state, writing: true, autoplay: false }

    case 'NEXT':
      return {
        ...state,
        step: state.step < state.totalSteps - 1 ? state.step + 1 : state.step,
      }

    case 'PREV':
      return {
        ...state,
        step: state.step > 0 ? state.step - 1 : state.step,
      }

    case 'REWIND':
      return {
        ...state,
        step: state.totalSteps - 1,
        autoplay: false,
        rewind: true,
      }

    case 'PLAY_STOP':
      return { ...state, autoplay: !state.autoplay, rewind: false }

    case 'PLAY':
      return { ...state, step: 0, autoplay: true, rewind: false }

    case 'STOP':
      return { ...state, autoplay: false, rewind: false }

    case 'SHOW_MENU':
      return { ...state, menu: 'ac-menu', autoplay: false }

    case 'HIDE_MENU':
      return { ...state, menu: '' }

    default:
      throw new Error()
  }
}
