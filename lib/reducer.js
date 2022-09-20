export const initialState = ({ pens, penID }) => {
  const currentPen = pens.find((p) => p.id === penID)
  const orderedPens = [currentPen, ...pens.filter((p) => p.id !== currentPen.id)]

  return {
    pens: orderedPens,
    pen: currentPen,
    step: 0,
    firstStep: true,
    lastStep: currentPen.steps.length <= 1,
    currentCSS: currentPen.steps[0].css,
    currentInfo: currentPen.steps[0].info,

    playing: true,
    codeView: 0, // 0: HIDE, 1: MID, 2: FULL
  }
}

// Change de url in the brouser
const penHistory = (penID) => {
  window.history.pushState({}, '', `/${penID}`)
}

// Valores que cambian con cada paso
const stepProps = (pen, newStep) => {
  return {
    step: newStep,
    currentCSS: pen.steps[newStep].css,
    currentInfo: pen.steps[newStep].info,
    firstStep: newStep === 0,
    lastStep: pen.steps.length <= 1 ? true : newStep === pen.steps.length - 1,
  }
}

const actions = {
  SET_PEN: (state, action) => {
    let newPen = state.pens.find((p) => p.id === action.id)

    penHistory(newPen.id)

    return {
      ...state,
      pen: newPen,
      playing: true,
      ...stepProps(newPen, 0),
    }
  },

  // STEPS NAVIGATION
  NEXT_STEP: (state, _action) => {
    let newStep = state.lastStep ? state.step : state.step + 1
    return {
      ...state,
      ...stepProps(state.pen, newStep),
    }
  },

  PREV_STEP: (state, _action) => {
    let newStep = state.firstStep ? state.step : state.step - 1
    return {
      ...state,
      ...stepProps(state.pen, newStep),
    }
  },

  PLAY: (state, _action) => {
    return { ...state, playing: true }
  },

  STOP: (state, _action) => {
    return { ...state, playing: false }
  },

  FULL_CODE: (state, _action) => {
    return { ...state, codeView: 2 }
  },

  MID_CODE: (state, _action) => {
    return { ...state, codeView: 1 }
  },

  HIDE_CODE: (state, _action) => {
    return { ...state, codeView: 0 }
  },
}

export function reducer(state, action) {
  const actionReducer = actions[action.type]
  return actionReducer ? actionReducer(state, action) : state
}
