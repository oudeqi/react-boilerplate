import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Context from './components/Context.demo'

import { createStore } from './my-libs/redux'
import { myReducer, add, div } from './redux/index'

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
  <div>
    <App />
    <Context></Context>
  </div>,
  document.getElementById('app')
)
