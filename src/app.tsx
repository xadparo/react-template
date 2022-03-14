import React from 'react'
import { Route, Routes } from 'react-router-dom'

export const App = () => {
  return <Routes>
    <Route path="/" element={<div>Hello world!</div>}/>
  </Routes>
}
export default App
