import React, { useReducer } from 'react'

import { GetPensUseCase } from '../useCases/GetPensUseCase'
import { getPenPaths } from '../lib/getPenPaths'
import getInitialState from '../lib/getInitialState'
import { reducer } from '../lib/reducer'

import Pen from '../components/pen'
import Nav from '../components/pen/nav'
import Control from '../components/pen/control'
import View from '../components/pen/view'

export async function getStaticPaths() {
  const paths = await getPenPaths()
  return { paths: paths, fallback: true }
}

export async function getStaticProps({ params }) {
  const pendID = params.id || 'heart'
  const GetPens = new GetPensUseCase()
  const pens = await GetPens.execute()
  const initialState = getInitialState(pens, pendID)

  return { props: { initialState: initialState } }
}

export default function Index(props) {
  const { initialState } = props
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <Pen>
      <Nav state={state} dispatch={dispatch} />
      <Control state={state} dispatch={dispatch} />
      <View state={state} dispatch={dispatch} />
    </Pen>
  )
}
