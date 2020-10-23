import React, { useState } from 'react'

const Context = React.createContext({})

export function PensContextProvider ({ children }) {
  const [pens, setPens] = useState([])

  return <Context.Provider value={{pens, setPens}}>
    {children}
  </Context.Provider>
}

export default Context
