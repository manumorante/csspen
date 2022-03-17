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

const getStepInfo = (steps, stepNumber) => {
  return getStepProp(steps, stepNumber, 'info')
}

const getStepCode = (steps, stepNumber) => {
  return getStepProp(steps, stepNumber, 'code')
}

// Step props for the current step number
const stepProps = (state, stepNumber) => {
  // TODO: validation?
  return {
    step: stepNumber,
    stepInfo: state.steps[stepNumber].info,
    rawCode: state.steps[stepNumber].code,
    parsedCode: parseCSS(state.steps[stepNumber].code),
  }
}

const reducers = {
  // UI
  [A.LOADING]: (state, action) => {
    return { ...state, loading: true }
  },

  [A.WRITING]: (state, action) => {
    return { ...state, writing: true, autoplay: false }
  },

  [A.SHOW_MENU]: (state, action) => {
    return { ...state, menuIsOpen: true, autoplay: false }
  },

  [A.CLOSE_MENU]: (state, action) => {
    return { ...state, menuIsOpen: false }
  },

  // NAVIGATION
  [A.NEXT]: (state, action) => {
    if (state.step >= state.totalSteps + 1) return { ...state }

    return {
      ...state,
      ...stepProps(state, state.step + 1),
    }
  },

  [A.PREV]: (state, action) => {
    if (state.step <= 0) return { ...state }

    return {
      ...state,
      ...stepProps(state, state.step - 1),
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
    }
  },

  [A.SET_STEP]: (state, action) => {
    return {
      ...state,
      ...stepProps(state, state.step),
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
    const newStep = {
      info: `Copy of step ${state.step + 1}`,
      code: state.rawCode,
    }

    const newSteps = [...state.steps]
    newSteps.splice(state.step + 1, 0, newStep)

    return {
      ...state,
      step: state.step + 1,
      steps: newSteps,
      totalSteps: newSteps.length,
      stepInfo: newStep.info,
      rawCode: newStep.code,
      parsedCode: parseCSS(newStep.code),
    }
  },

  [A.DELETE_STEP]: (state, action) => {
    if (state.step === 0) return { ...state }

    const newSteps = [...state.steps]
    newSteps.splice(state.step - 1, 1)

    return {
      ...state,
      ...stepProps(state, state.step - 1),
      steps: newSteps,
      totalSteps: newSteps.length,
    }
  },

  [A.UPDATE_STEP]: (state, action) => {
    const UpdateStep = new UpdateStepUseCase()
    UpdateStep.execute({
      penID: state.id,
      step: state.step,
      code: state.rawCode,
      info: state.stepInfo,
    }).then(() => console.log('Saved'))

    return { ...state, edited: false }
  },
}

export function reducer(state, action) {
  // console.log('action', action.type)
  const actionReducer = reducers[action.type]
  return actionReducer ? actionReducer(state, action) : state
}
