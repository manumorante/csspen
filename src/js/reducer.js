import { UpdateStepUseCase } from './UpdateStepUseCase'

export const initialState = {
  pens: [], // List of Pens (complete, with all data).
  pen: {}, // Current Pen (all data).
  loading: false, // Loading state.
  loaded: false, // Loaded state.
  autoplay: true, // Go to first step and execute dispatch: 'NEXT' to the end.
  writing: false, // When editing CSS code or Info step.
  rewind: false, // Go to the final step and execute dispatch: 'PREV' to the beginning.
  step: 0, // Current step.
  menuIsOpen: false, // Define when the mobile Pens menu is open.
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
      loaded: true,
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
      step: action.last ? newPen.total_steps - 1 : 0,
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
    console.log('SET_STEP_INFO', 'OFF')
    return { ...state }

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
