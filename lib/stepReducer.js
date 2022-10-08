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

  SET_CSS: (state, action) => {
    return { ...state, css: action.css }
  },

  SET_INFO: (state, action) => {
    return { ...state, info: action.info }
  },
}

export function stepReducer(state, action) {
  const actionReducer = actions[action.type]
  return actionReducer ? actionReducer(state, action) : state
}
