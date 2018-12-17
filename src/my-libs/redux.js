export function createStore (redecer) {
  let currState = undefined
  const listeners = []
  const getState = function () {
    return currState
  }
  const subscribe = function (listener) {
    listeners.push(listener)
  }
  const dispatch = function (action) {
    currState = redecer(currState, action)
    listeners.forEach((fn) => { fn() })
  }
  dispatch({type: '@@__@@'})
  return { getState, subscribe, dispatch }
}

