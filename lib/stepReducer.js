const actions = {
  WORKING: (state, action) => {
    return { ...state, working: action.working }
  },

  DONE: (state, _action) => {
    return { ...state, working: null, error: null }
  },

  ERROR: (state, action) => {
    return { ...state, error: action.error, working: null }
  },

  FOCUS: (state, _) => ({ ...state, focus: true }),
  BLUR: (state, _) => ({ ...state, focus: false }),
  NO_EDITED: (state, _) => ({ ...state, edited: false }),

  SET_CSS: (state, action) => {
    return { ...state, css: action.css, edited: true }
  },

  SET_INFO: (state, action) => {
    return { ...state, info: action.info, edited: true }
  },
}

export function stepReducer(state, action) {
  const actionReducer = actions[action.type]
  return actionReducer ? actionReducer(state, action) : state
}
