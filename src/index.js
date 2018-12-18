import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
// import Context from './components/Context.demo'

import { createStore, applyMiddleware } from './my-libs/redux'
import { Provider } from './my-libs/react-redux'
import { thunk, arrayThunk } from './my-libs/thunk'
import { myReducer } from './redux/index'

// test
const store = createStore(myReducer, applyMiddleware(thunk, arrayThunk))
// console.log(store.getState())
// store.subscribe(() => {
//   console.log(store.getState())
// })
// store.dispatch(add())
// store.dispatch(add())
// store.dispatch(add())

ReactDOM.render(
  (
    <Provider store={store}>
      <App a="bbb" />
    </Provider>
  ),
  document.getElementById('app'))

// ReactDOM.render(
//   <div>
//     <App />
//     <Context></Context>
//   </div>,
//   document.getElementById('app')
// )
