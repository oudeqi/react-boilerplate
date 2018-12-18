import React from 'react'
import { connect } from './my-libs/react-redux'
import { add, div, addAsync, addTwice } from './redux/index'

@connect(
  state => state,
  { add, div, addAsync, addTwice }
)
class App extends React.Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <h2>现在有机枪{this.props.num}把</h2>
        <button onClick={this.props.add}>申请武器</button>
        <button onClick={this.props.div}>回收武器</button>
        <button onClick={this.props.addAsync}>过两天再给</button>
        <button onClick={this.props.addTwice}>申请两把</button>
      </div>
    )
  }
}

export default App