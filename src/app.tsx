import React from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import { createBrowserHistory, createMemoryHistory } from 'history'

const createHistory = typeof(window) !== 'undefined'? createBrowserHistory: createMemoryHistory
const history = createHistory()

export const App = () => {
  return <Router history={history}>
    <Switch>
      <Route path="/" component={() => <div>Hello world!</div>} />
    </Switch>
  </Router>
}
export default App
