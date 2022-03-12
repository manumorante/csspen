import { A } from './reducerActions'
import parseCSS from './parseCSS'
import { UpdateStepUseCase } from './UpdateStepUseCase'

const getStep = (steps, stepNumber) => {
  const step = steps[stepNumber]
  return step || false
}

const getStepProp = (steps, stepNumber, prop) => {
  const step = getStep(steps, stepNumber)
  return step && step[prop]
}

const getStepInfo = (steps, stepNumber) =>
  getStepProp(steps, stepNumber, 'info')

const getStepCode = (steps, stepNumber) =>
  getStepProp(steps, stepNumber, 'code')

const reducers = {
  // UI
  [A.LOADING]: (state, action) => {
    return { ...state, loading: true }
  },

  [A.WRITING]: (state, action) => {
    return { ...state, writing: true, autoplay: false }
  },

  [A.SHOW_MENU]: (state, action) => {
    return { ...state, menu: 'action-menu', autoplay: false }
  },

  [A.HIDE_MENU]: (state, action) => {
    return { ...state, menu: '' }
  },

  // NAVIGATION
  [A.NEXT]: (state, action) => {
    return {
      ...state,
      step: state.step < state.totalSteps - 1 ? state.step + 1 : state.step,
    }
  },

  [A.PREV]: (state, action) => {
    return {
      ...state,
      step: state.step > 0 ? state.step - 1 : state.step,
    }
  },

  [A.REWIND]: (state, action) => {
    return {
      ...state,
      step: state.totalSteps - 1,
      autoplay: false,
      rewind: true,
    }
  },

  [A.PLAY]: (state, action) => {
    return { ...state, step: 0, autoplay: true, rewind: false }
  },

  [A.STOP]: (state, action) => {
    return { ...state, autoplay: false, rewind: false }
  },

  [A.PLAY_STOP]: (state, action) => {
    return { ...state, autoplay: !state.autoplay, rewind: false }
  },

  // SET CURRENT
  [A.SET_PEN]: (state, action) => {
    return {
      ...state,
      ...action.pen,
      email: action.email,
      loading: false,
      loaded: true,
      rewind: false,
      writing: false,
      edited: false,
      step: 0,
      totalSteps: action.pen.totalSteps,
      stepInfo: getStepInfo(action.pen.steps, 0),
      rawCode: getStepCode(action.pen.steps, 0),
      parsedCode: parseCSS(getStepCode(action.pen.steps, 0)),
      menu: '',
    }
  },

  [A.SET_STEP]: (state, action) => {
    return {
      ...state,
      stepInfo: state.steps[state.step].info,
      rawCode: state.steps[state.step].code,
      parsedCode: parseCSS(state.steps[state.step].code),
      menu: '',
    }
  },

  [A.SET_STEP_CODE]: (state, action) => {
    // Optimizar esto con `...`
    const steps = state.steps
    steps[state.step].code = action.code

    return {
      ...state,
      writing: false,
      edited: true,
      steps: steps,
      rawCode: action.code,
      parsedCode: parseCSS(action.code),
    }
  },

  [A.SET_STEP_INFO]: (state, action) => {
    // Optimizar esto con `...`
    const steps = state.steps
    steps[state.step].info = action.stepInfo

    return {
      ...state,
      writing: false,
      edited: true,
      steps: steps,
      stepInfo: action.stepInfo,
    }
  },

  // CREATE AND EDIT NEW ONES
  [A.NEW_STEP]: (state, action) => {
    return {
      ...state,
      step: state.totalSteps + 1,
      totalSteps: state.totalSteps + 1,
      stepInfo: state.steps[state.step].info,
      rawCode: state.steps[state.step].code,
      parsedCode: parseCSS(state.steps[state.step].code),
    }
  },

  [A.UPDATE_STEP]: (state, action) => {
    // TODO: :face_palm:
    if (state.email === 'manu@estadologico.com') {
      const UpdateStep = new UpdateStepUseCase()
      UpdateStep.execute({
        penID: state.id,
        step: state.step,
        code: state.rawCode,
        info: state.stepInfo,
      }).then(() => console.log('Saved'))
    }

    return { ...state, edited: false }
  },
}

export function reducer(state, action) {
  const actionReducer = reducers[action.type]
  return actionReducer ? actionReducer(state, action) : state
}
