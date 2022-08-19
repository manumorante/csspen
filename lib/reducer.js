import { UpdateStepUseCase } from '../useCases/UpdateStepUseCase'
import { NewStepUseCase } from '../useCases/NewStepUseCase'
import { DeleteStepUseCase } from '../useCases/DeleteStepUseCase'

export const initialState = {
  pens: [], // List of Pens (complete, with all data).
  pen: {}, // Current Pen (all data).
  autoplay: true, // On/off autoplay at load Pen.
  playing: false,
  step: 0, // Current step.
  writing: false, // When editing CSS or Info step. Disable key controls etc.
  menuClosed: false,
  creator: false, // Mode creator.
  isMobile: false,
  loaded: false, // Pens list and current pen are ready to use.
}

export function findPen(pens, id) {
  return pens.find((p) => p.id === id)
}

// Change de url in the brouser
const penHistory = (penID) => {
  window.history.pushState({}, '', `/${penID}`)
}

const actions = {
  SHOW_CREATOR: (state, _action) => {
    return { ...state, creator: true }
  },

  HIDE_CREATOR: (state, _action) => {
    return { ...state, creator: false }
  },

  // UI
  WRITING: (state, _action) => {
    return { ...state, writing: true, playing: false }
  },

  TOGGLE_MENU: (state, _action) => {
    return { ...state, menuClosed: !state.menuClosed, playing: false }
  },

  CLOSE_MENU: (state, _action) => {
    return { ...state, menuClosed: true, playing: false }
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
    return { ...state, step: 0, playing: true }
  },

  STOP: (state, _action) => {
    return { ...state, playing: false }
  },

  PLAY_STOP: (state, _action) => {
    return { ...state, playing: !state.playing }
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

    const newPen = { ...state.pens[index + 1] }
    penHistory(newPen.id)

    return {
      ...state,
      pen: { ...newPen, step: 0 },
      step: 0,
    }
  },

  PREV_PEN: (state, _action) => {
    // Get current pen index.
    const pen = state.pens.find((p) => p.id === state.pen.id)
    const index = state.pens.indexOf(pen)

    if (index === 0) return { ...state }

    const newPen = { ...state.pens[index - 1] }
    penHistory(newPen.id)

    return {
      ...state,
      pen: { ...newPen, step: newPen.steps.length - 1 },
      step: state.pens[index - 1].steps.length - 1,
    }
  },

  // NEW SET PEN
  SET_PEN: (state, action) => {
    let newPen = state.pens.find((p) => p.id === action.id)

    if (!newPen || Object.keys(newPen).length === 0) {
      newPen = state.pens[0]
    }

    // Change de url in the brouser
    window.history.pushState({}, '', `/${newPen.id}`)

    return {
      ...state,
      pen: newPen,
      step: action.last ? newPen.steps.length - 1 : 0,
      playing: state.autoplay,
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
  // console.log(action.type, state)
  const actionReducer = actions[action.type]
  return actionReducer ? actionReducer(state, action) : state
}
