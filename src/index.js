import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { createStore } from './my-libs/redux'
import { myReducer, add } from './redux/index'

// test
const store = createStore(myReducer)
console.log(store.getState())
store.subscribe(() => {
  console.log(store.getState())
})
store.dispatch(add())
store.dispatch(add())
store.dispatch(add())


ReactDOM.render(
  <App />,
  document.getElementById('app')
)
