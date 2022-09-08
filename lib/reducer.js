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
    lastStep: newStep === pen.steps.length - 1,
  }
}

const actions = {
  SET_PEN: (state, action) => {
    let newPen = state.pens.find((p) => p.id === action.id)

    penHistory(newPen.id)

    return {
      ...state,
      pen: newPen,
      ...stepProps(newPen, 0),
    }
  },

  // STEPS NAVIGATION
  NEXT_STEP: (state, _action) => {
    return {
      ...state,
      ...(!state.lastStep && stepProps(state.pen, state.step + 1)),
    }
  },

  PREV_STEP: (state, _action) => {
    return {
      ...state,
      ...(!state.firstStep && stepProps(state.pen, state.step - 1)),
    }
  },

  FULL_CODE: (state, _action) => {
    return { ...state, codeHide: false, codeMid: false, codeFull: true }
  },

  MID_CODE: (state, _action) => {
    return { ...state, codeHide: false, codeMid: true, codeFull: false }
  },

  HIDE_CODE: (state, _action) => {
    return { ...state, codeHide: true, codeMid: false, codeFull: false }
  },
}

export function reducer(state, action) {
  const actionReducer = actions[action.type]
  return actionReducer ? actionReducer(state, action) : state
}
