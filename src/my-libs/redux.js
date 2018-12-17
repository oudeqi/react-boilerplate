// redux
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

// { add, remove, addAsync }
// add(参数) 变成 dispatch(add(参数))
export function bindActionCreators (creators, dispatch) {
  const bound = {}
  Object.keys(creators).forEach((v) => {
    const creator = creators[v]
    bound[v] = (...args) => dispatch(creator(...args))
  })
  return bound
}


// react-redux
import React from 'react'
import PropTypes from 'prop-types'

// 接受一个组件，吧state里的数据放进去，返回一个组件
// 数据变化时，通知组件
export function connect2 (mapStateToProps, mapDispatchToProps) {
  return function (WarpComponent) {
    return class ConnectComponent extends React.Component {
      // 。。。
    }
  }
}

export const connect = (mapStateToProps=s=>s, mapDispatchToProps={}) => (WarpComponent) => {
  return class ConnectComponent extends React.Component {
    constructor () {
      super()
      this.state = {
        props: {}
        // TODO props: this.props
      }
    }
    static contextTypes = {
      store: PropTypes.object
    }
    componentDidMount () {
      const store = this.context.store
      store.subscribe(() => this.update())
      this.update()
    }
    update () {
      // 获取mapStateToProps、mapDispatchToProps 放入this.state.props
      const store = this.context.store
      const state = mapStateToProps(store.getState())
      /**
       * function add () {
       *  return { type: ADD }
       * } 
       * 方法不能直接使用，因为需要dispatch
       * 直接执行add，没有意义；store.dispatch(add()) 才有意义。
       * 即，将add装饰成：add = () => store.dispatch(add())
       * */ 
      const dispatch = bindActionCreators(mapDispatchToProps, store.dispatch)
      this.setState({
        props: {
          ...this.state.props,
          ... state,
          ...dispatch
        }
      })
    }
    render () {
      <WarpComponent {...this.state.props}></WarpComponent>
    }
  }
}

export class Provide extends React.Component {
  constructor () {
    super()
    this.store = this.props.store
  }
  static childContextTypes = {
    store: PropTypes.object
  }
  getChildContext () {
    return {
      store: this.store
    }
  }
  render () {
    return this.props.children
  }
} 