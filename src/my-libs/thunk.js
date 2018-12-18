// 所有的dispatch，都要通过中间件走一趟，才能到最终的reducer里面
const thunk = ({dispatch, getState}) => next => action => {
  // 支持异步的中间件
  if (typeof action === 'function') {
    return action(dispatch, getState)
  }
  // 默认什么都没干
  return next(action)
}

const arrayThunk = ({dispatch, getState}) => next => action => {
  if (Array.isArray(action)) {
    return action.forEach(v => {
      if (typeof v === 'function') {
        v(dispatch, getState)
      } else {
        dispatch(v)
      }
    })
  }
  return next(action)
}
export {thunk, arrayThunk} 