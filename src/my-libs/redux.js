export function createStore (redecer, enhancer) {
  // 增强器
  if (enhancer) {
    return enhancer(createStore)(redecer)
  }
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
    return action
  }
  dispatch({type: '@@__@@'})
  return { getState, subscribe, dispatch }
}

// { add, remove, addAsync }
// add(参数) 变成 dispatch(add(参数))
// export function bindActionCreators (creators, dispatch) {
//   const bound = {}
//   Object.keys(creators).forEach((v) => {
//     const creator = creators[v]
//     bound[v] = (...args) => dispatch(creator(...args))
//   })
//   return bound
// }

function bindActionCreator(creator, dispatch){
	return (...args) => dispatch(creator(...args))
}
export function bindActionCreators(creators,dispatch){
	return Object.keys(creators).reduce((ret,item)=>{
		ret[item] = bindActionCreator(creators[item],dispatch)
		return ret
	}, {})
}


// enhancer
export function applyMiddleware (...middlewares) {
  return createStore => (...args) => {
    const store = createStore(...args)
    const middApi = {
      getState: store.getState,
      dispatch: (...args) => store.dispatch(...args)
    }
    // 支持多个middleware
    const middlewareChain = middlewares.map(middleware => middleware(middApi))
    const dispatch = compose(...middlewareChain)(store.dispatch)
    // const dispatch = middleware(middApi)(store.dispatch) // 支持单个middleware
    return {
      ...store,
      dispatch
    }
  }
}

// compose(fn1, fn2, fn3)
// fn1(fn2(fn3))
export function compose (...funcs) {
  if (funcs.length === 0) {
		return arg => arg
	}
	if (funcs.length === 1) {
		return funcs[0]
	}
  return funcs.reduce((ret, item) => (...args) => ret(item(...args)))
}
