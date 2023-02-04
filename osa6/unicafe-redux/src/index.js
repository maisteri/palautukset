import React from 'react'
import ReactDOM from 'react-dom/client'
import reducer from './reducer'

import { createStore } from 'redux'

const store = createStore(reducer)

const App = () => {
  const state = store.getState()
  return(
    <>
      <button onClick={() => store.dispatch({ type: 'GOOD' })} >good</button>
      <button onClick={() => store.dispatch({ type: 'OK' })} >ok</button>
      <button onClick={() => store.dispatch({ type: 'BAD' })} >bad</button>
      <button onClick={() => store.dispatch({ type: 'ZERO' })} >reset stats</button>
      <div>good {state.good}</div>
      <div>ok {state.ok}</div>
      <div>bad {state.bad}</div>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)