import { UpdateStepUseCase } from '../useCases/UpdateStepUseCase'
import { NewStepUseCase } from '../useCases/NewStepUseCase'
import { DeleteStepUseCase } from '../useCases/DeleteStepUseCase'

const initialPen = {
  colors: {
    c1: 'white',
    c2: 'white',
    c3: 'black',
  },
  html: '',
  id: '',
  info: '',
  name: '',
  steps: [
    {
      num: 1,
      info: '',
      css: '',
      pen_id: '',
    },
  ],
}

export const initialState = {
  pens: Array.from({ length: 15 }, () => initialPen),
  loaded: false, // Pens list and current pen are ready to use.

  pen: {},
  id: '',
  name: '',
  html: '',
  color1: '',
  color2: '',
  color3: '',

  css: '',
  step: 0,
  stepInfo: '',
  firstStep: true,
  lastStep: false,

  autoplay: true, // On/off autoplay at load Pen.
  playing: false,
  showCode: 0, // HIDE: 0, MID: 1, FULL: 2
  showPenList: false,
}

// Change de url in the brouser
const penHistory = (penID) => {
  window.history.pushState({}, '', `/${penID}`)
}

// Valores que cambian con cada paso
const stepProps = (pen, newStep) => {
  return {
    step: newStep,
    css: pen.steps[newStep].css,
    stepInfo: pen.steps[newStep].info,
    firstStep: newStep === 0,
    lastStep: newStep === pen.steps.length - 1,
  }
}

// Valores que cambian al cambiar de Pen
const penProps = (pen) => {
  return {
    id: pen.id,
    name: pen.name,
    html: pen.html,
    color1: pen.colors.c1,
    color2: pen.colors.c2,
    color3: pen.colors.c3,
  }
}

const actions = {
  TOGGLE_CODE: (state, _action) => {
    let showCode
    if (state.showCode === 0) {
      showCode = 1
    } else if (state.showCode === 1) {
      showCode = 2
    } else {
      showCode = 0
    }

    return { ...state, showCode }
  },

  SHOW_PEN_LIST: (state, _action) => {
    return { ...state, showPenList: true }
  },

  HIDE_PEN_LIST: (state, _action) => {
    return { ...state, showPenList: false }
  },

  SHOW_FULL_CODE: (state, _action) => {
    return { ...state, showCode: 2 }
  },

  SHOW_MID_CODE: (state, _action) => {
    return { ...state, showCode: 1 }
  },

  HIDE_CODE: (state, _action) => {
    return { ...state, showCode: 0 }
  },

  // NAVIGATION
  NEXT: (state, _action) => {
    if (state.step >= state.pen.steps.length - 1) return { ...state }

    return {
      ...state,
      ...stepProps(state.pen, state.step + 1),
    }
  },

  PREV: (state, _action) => {
    if (state.step <= 0) return { ...state }

    return {
      ...state,
      ...stepProps(state.pen, state.step - 1),
    }
  },

  PLAY: (state, _action) => {
    return { ...state, step: 0, playing: true }
  },

  STOP: (state, _action) => {
    return { ...state, playing: false }
  },

  TOGGLE_PLAY: (state, _action) => {
    return { ...state, playing: !state.playing }
  },

  // INIT_PENS
  INIT_PENS: (state, action) => {
    return {
      ...state,
      pens: action.pens,
      pen: { ...action.pen },
      ...penProps(action.pen),
      ...stepProps(action.pen, 0),
      loaded: true,
    }
  },

  NEXT_PEN: (state, _action) => {
    // Get current pen index.
    const pen = state.pens.find((p) => p.id === state.pen.id)
    const penIndex = state.pens.indexOf(pen)
    const index = penIndex === state.pens.length - 1 ? 0 : penIndex + 1

    const newPen = { ...state.pens[index] }
    penHistory(newPen.id)

    return {
      ...state,
      pen: { ...newPen },
      ...penProps(newPen),
      ...stepProps(newPen, 0),
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
      pen: { ...newPen },
      ...penProps(newPen),
      ...stepProps(newPen, 0),
    }
  },

  // NEW SET PEN
  SET_PEN: (state, action) => {
    let newPen = state.pens.find((p) => p.id === action.id)

    if (!newPen || Object.keys(newPen).length === 0) {
      newPen = state.pens[0]
    }

    penHistory(newPen.id)

    return {
      ...state,
      pen: newPen,
      ...penProps(newPen),
      ...stepProps(newPen, 0),
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
  const actionReducer = actions[action.type]
  return actionReducer ? actionReducer(state, action) : state
}
