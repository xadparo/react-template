import React from 'react'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'

export const App = () => {
  return <Router history={createBrowserHistory()}>
    <div>
      Hello world!
    </div>
  </Router>
}
export default App
