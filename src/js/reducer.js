import { UpdateStepUseCase } from './UpdateStepUseCase'

export const initialState = {
  loading: false,
  loaded: false,
  autoplay: false,
  rewind: false,
  step: -1,
  menuIsOpen: false,
}

export const actions = {
  // UI
  LOADING: (state, _action) => {
    return { ...state, loading: true }
  },

  WRITING: (state, _action) => {
    return { ...state, writing: true, autoplay: false }
  },

  SHOW_MENU: (state, _action) => {
    return { ...state, menuIsOpen: true, autoplay: false }
  },

  CLOSE_MENU: (state, _action) => {
    return { ...state, menuIsOpen: false }
  },

  // NAVIGATION
  NEXT: (state, _action) => {
    if (state.step >= state.pen.total_steps + 1) return { ...state }

    return {
      ...state,
      step: state.step + 1,
    }
  },

  PREV: (state, _action) => {
    if (state.step <= 0) return { ...state }

    return {
      ...state,
      step: state.step - 1,
    }
  },

  REWIND: (state, _action) => {
    return {
      ...state,
      step: state.pen.total_steps - 1,
      autoplay: false,
      rewind: true,
    }
  },

  PLAY: (state, _action) => {
    return { ...state, step: 0, autoplay: true, rewind: false }
  },

  STOP: (state, _action) => {
    return { ...state, autoplay: false, rewind: false }
  },

  PLAY_STOP: (state, _action) => {
    return { ...state, autoplay: !state.autoplay, rewind: false }
  },

  // INIT_PENS
  INIT_PENS: (state, action) => {
    return {
      ...state,
      pens: action.pens,
      pen: action.pen,
      step: 0,
    }
  },

  // NEW SET PEN
  SET_PEN: (state, action) => {
    const newPen = state.pens.find((p) => p.id === action.id)
    if (!newPen || Object.keys(newPen).length === 0) return { ...state }

    return {
      ...state,
      pen: newPen,
      step: 0,
    }
  },

  SET_STEP_CODE: (state, action) => {
    const stepsObj = state.pen.pen_steps
    stepsObj[state.step].code = action.code
    const newPen = { ...state.pen, pen_steps: stepsObj }

    return {
      ...state,
      writing: false,
      edited: true,
      pen: newPen,
    }
  },

  SET_STEP_INFO: (state, action) => {
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

  UPDATE_STEP: (state, _action) => {
    console.log('UPDATE_STEP', 'OFF')

    return { ...state }
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
  const actionReducer = actions[action.type]
  return actionReducer ? actionReducer(state, action) : state
}
