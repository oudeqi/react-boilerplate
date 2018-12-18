const ADD = 'ADD'
const DIV = 'DIV'
const initState = {
  num: 0
}
export function myReducer (state=initState, action) {
  switch (action.type) {
    case ADD: return {...state, num: state.num + action.num}
    case DIV: return {...state, num: state.num - action.num}
    default: return state
  }
}
export function add () {
  return {
    type: ADD,
    num: 1
  }
}
export function div () {
  return {
    type: DIV,
    num: 1
  }
}
export function addAsync () {
  return dispatch => {
    setTimeout(() => {
      dispatch(add())
    }, 2000)
  }
}

export function addTwice(){
  return [add(), addAsync()]
}
