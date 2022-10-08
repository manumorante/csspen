const actions = {
  WORKING: (state, acc) => ({ ...state, working: acc.working }),
  DONE: (state, _) => ({ ...state, working: null, error: null }),
  ERROR: (state, acc) => ({ ...state, error: acc.error, working: null }),
  FOCUS: (state, _) => ({ ...state, focus: true }),
  BLUR: (state, _) => ({ ...state, focus: false }),
  NO_EDITED: (state, _) => ({ ...state, edited: false }),
  SET_CSS: (state, acc) => ({ ...state, css: acc.css, edited: true }),
  RESET: (state, _) => ({ ...state, css: state._css, info: state._info, edited: false }),
  SET_INFO: (state, acc) => ({ ...state, info: acc.info, edited: true }),
}

export function stepReducer(state, acc) {
  const actionReducer = actions[acc.type]
  return actionReducer ? actionReducer(state, acc) : state
}
