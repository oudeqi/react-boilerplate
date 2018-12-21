# react 的优化

1. 减少render函数里 新建的变量、函数
2. 减少render函数里的大量计算
3. 减少给子组件传递的props
4. bind函数在constructor里执行
5. 定制 shouldComponentUpdate 函数
6. v16之后 如果组件只是根据传进来的props进行渲染，没有内部的状态，可以使用 React.PureComponent

``` bash
// 默认父组件 render函数执行了 子组件也会render
// shouldComponentUpdate(nextProps,nextState) 是父组件render 或者本身 setState时候或执行的函数
// 他决定当前组件是否应该重新render, 当父组件重新render时，子组件未接收到改变的props时避免渲染
// shouldComponentUpdate 可以通过对两个对象 nextProps和this.props 做对比，来决定是否重新渲染组件
function shouldComponentUpdate (nextProps,nextState) {
  if (nextProps.title === this.props.title) {
    retrun false
  }
  return true
}
// 深递归对比，复杂度太高，不可接受，react建议只做浅层比较，PureComponent也是如此只做浅层比较
// 所以从性能上考虑，建议无论在redux还是state时候，数据结构不要深层次嵌套，因为react无法深比较
// 一但嵌套层次过深，react会总是更新组件，造成性能隐患
```

不可变得数据结构：
1. 减少内存使用
2. 并发安全
3. 减少可变带来的复杂度
4. 便于比较复杂数据结构，定制shouldComponentUpdate 方便
5. 时间旅行功能方便
6. 函数式编程，方便写纯函数

immutable缺点： 
1. 学习成本
2. 库的大小
3. 对先有项目入侵太严重（新项目可以使用，老项目评估再用）

共享可变的状态是万恶之源：把一个可以修改的状态交给别人，让别人共享是一件很危险的事情
``` bash
// immutable-js 生成不可变得数据结构：
// 一旦创建不可修改，只能生成新的数据结构，所以直接用等号就可以判断两个数据是否相等
// 对定制 shouldComponentUpdate 生命周期函数，是一个非常好的数据结构，这也是需要immutable-js的原因

import { Map, is } from 'immutable'

constructor {
  this.state = Map({
    name: 'xxx',
    num: 1
  })
} 

this.setState(this.state.set('num', this.state.get('num') + 1))

<SubComponent name={this.state.get('name')} />

shouldComponentUpdate (nextProps,nextState) {
  return is(nextProps, this.props)
}
```

# redux 的优化

``` bash
// reselect：用在重复大计算的时候
// 从redux的state里面获取数据，和获取到的数据经过计算，变成组件可用的数据分成了两步
// 内部会做一些缓存的计算，做重复操作的时候性能会更加好，不用重复计算

import { createSelector } from 'reselect'

const numSelector = createSelector(
  state=>state, 
  state=>({num: state*2}) // 第二个函数的参数，是第一个函数的返回值
)

@connect(
  state=>numSelector(state),
  {
    actionCreator1,
    actionCreator2,
    actionCreator3
  }
)

```