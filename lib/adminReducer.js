const actions = {
  INIT: (state, action) => {
    const _pen = action.pens.find((p) => p.id === state.penID)
    const pen = _pen || action.pens[0]
    return {
      ...state,
      penID: state.penID,
      pens: action.pens,
      pen,
      steps: pen.steps,
      loading: false,
      working: null,
      error: null,
    }
  },

  WORKING: (state, action) => {
    return { ...state, working: action.working }
  },

  DONE: (state, _action) => {
    return { ...state, working: null, error: null }
  },

  ERROR: (state, action) => {
    return { ...state, error: action.error, working: null }
  },
}

export function adminReducer(state, action) {
  const actionReducer = actions[action.type]
  return actionReducer ? actionReducer(state, action) : state
}
