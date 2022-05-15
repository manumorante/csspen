import { UpdateStepUseCase } from './UpdateStepUseCase'
import { NewStepUseCase } from './NewStepUseCase'
import { DeleteStepUseCase } from './DeleteStepUseCase'

const isMobile = window.innerWidth < 768

export const initialState = {
  pens: [], // List of Pens (complete, with all data).
  pen: {}, // Current Pen (all data).
  loaded: false, // Pens list and current pen are ready to use.
  autoplay: false, // Go to first step and execute dispatch: 'NEXT' to the end.
  writing: false, // When editing CSS or Info step. Disable key controls etc.
  step: 0, // Current step.
  menuClosed: isMobile,
  creator: false, // Mode creator.
  isMobile: isMobile,
}

const actions = {
  // UI
  WRITING: (state, _action) => {
    return { ...state, writing: true, autoplay: false }
  },

  TOGGLE_MENU: (state, _action) => {
    return { ...state, menuClosed: !state.menuClosed, autoplay: false }
  },

  CLOSE_MENU: (state, _action) => {
    return { ...state, menuClosed: true, autoplay: false }
  },

  // NAVIGATION
  NEXT: (state, _action) => {
    if (state.step >= state.pen.steps.length - 1) return { ...state }

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

  STORY_NEXT_STEP: (state, _action) => {
    if (state.pen.step >= state.pen.steps.length - 1) return { ...state }

    return {
      ...state,
      pen: { ...state.pen, step: state.pen.step + 1 },
    }
  },

  STORY_PREV_STEP: (state, _action) => {
    if (state.pen.step <= 0) return { ...state }

    return {
      ...state,
      pen: { ...state.pen, step: state.pen.step - 1 },
    }
  },

  PLAY: (state, _action) => {
    return { ...state, step: 0, autoplay: true }
  },

  STOP: (state, _action) => {
    return { ...state, autoplay: false }
  },

  PLAY_STOP: (state, _action) => {
    return { ...state, autoplay: !state.autoplay }
  },

  // INIT_PENS
  INIT_PENS: (state, action) => {
    return {
      ...state,
      pens: action.pens,
      pen: { ...action.pen, step: 0 },
      step: 0,
      loaded: true,
      menuClosed: state.isMobile,
    }
  },

  NEXT_PEN: (state, _action) => {
    // Get current pen index.
    const pen = state.pens.find((p) => p.id === state.pen.id)
    const index = state.pens.indexOf(pen)

    if (index === state.pens.length - 1) return { ...state }

    return {
      ...state,
      pen: { ...state.pens[index + 1], step: 0 },
      step: 0,
    }
  },

  PREV_PEN: (state, _action) => {
    // Get current pen index.
    const pen = state.pens.find((p) => p.id === state.pen.id)
    const index = state.pens.indexOf(pen)

    if (index === 0) return { ...state }

    const newPen = { ...state.pens[index - 1] }

    return {
      ...state,
      pen: { ...newPen, step: newPen.steps.length - 1 },
      step: state.pens[index - 1].steps.length - 1,
    }
  },

  // NEW SET PEN
  SET_PEN: (state, action) => {
    const newPen = state.pens.find((p) => p.id === action.id)
    if (!newPen || Object.keys(newPen).length === 0) return { ...state }

    return {
      ...state,
      pen: newPen,
      step: action.last ? newPen.steps.length - 1 : 0,
    }
  },

  SET_STEP_CSS: (state, action) => {
    const newStep = { ...state.pen.steps[state.step] }
    newStep.css = action.css

    const newPen = { ...state.pen, steps: [...state.pen.steps] }
    newPen.steps[state.step] = newStep

    return {
      ...state,
      writing: false,
      pen: newPen,
    }
  },

  SET_STEP_INFO: (state, action) => {
    const newStep = { ...state.pen.steps[state.step] }
    newStep.info = action.info

    const newPen = { ...state.pen, steps: [...state.pen.steps] }
    newPen.steps[state.step] = newStep

    return {
      ...state,
      writing: false,
      pen: newPen,
    }
  },

  NEW_STEP: (state, _action) => {
    const newSteps = [...state.pen.steps]
    const newStep = {
      pen_id: state.pen.id,
      num: newSteps.length + 1,
      info: 'New step',
      css: '.foo {}',
    }
    const newPen = { ...state.pen, steps: [...newSteps, newStep] }

    return {
      ...state,
      pen: newPen,
      step: newSteps.length,
    }
  },

  SAVE_NEW_STEP: (state, _action) => {
    const step = state.pen.steps[state.step]

    console.log('pen to save', step)

    const NewStep = new NewStepUseCase()
    NewStep.execute({
      pen_id: step.pen_id,
      num: step.num,
      info: step.info,
      css: step.css,
    }).then(() => {
      console.log('New step added!')
    })

    return { ...state }
  },

  // Delete current step
  DELETE_STEP: (state, _action) => {
    const stepData = {
      penID: state.pen.id,
      stepNum: state.step + 1,
    }

    const newSteps = [...state.pen.steps]
    newSteps.splice(state.step, 1)

    const newPen = { ...state.pen, steps: newSteps }

    const DeleteStep = new DeleteStepUseCase()
    DeleteStep.execute(stepData).then(() => {
      console.log('Pen step deleted!')
    })

    return { ...state, pen: newPen, step: state.step - 1 }
  },

  UPDATE_STEP: (state, _action) => {
    const newStep = { ...state.pen.steps[state.step] }
    const penVO = {
      penID: state.pen.id,
      step: state.step,
      css: newStep.css,
      info: newStep.info,
    }

    const UpdateStep = new UpdateStepUseCase()
    UpdateStep.execute(penVO).then(() => {
      console.log('Saved')
    })

    return { ...state, edited: false }
  },
}

export function reducer(state, action) {
  console.log(action.type, state)
  // console.log('action', action)
  const actionReducer = actions[action.type]
  return actionReducer ? actionReducer(state, action) : state
}
