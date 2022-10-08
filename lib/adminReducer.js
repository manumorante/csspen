export const initialState = ({ pens, pen }) => {
  return {
    pens,
    pen,
    steps: pen.steps,
  }
}

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
}

export function reducer(state, action) {
  const actionReducer = actions[action.type]
  return actionReducer ? actionReducer(state, action) : state
}
