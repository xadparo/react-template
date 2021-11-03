import React from 'react'
import { Router } from 'react-router-dom'
import { createBrowserHistory, createMemoryHistory } from 'history'

const createHistory = typeof(window) !== 'undefined'? createBrowserHistory: createMemoryHistory
const history = createHistory()

export const App = () => {
  return <Router history={history}>
    <div>
      Hello world!
    </div>
  </Router>
}
export default App
