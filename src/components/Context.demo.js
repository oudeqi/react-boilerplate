import React from 'react'
import PropTypes from 'prop-types'

class SideBar extends React.Component {
  render() {
    return (
      <div>
        <h1>SideBar</h1>
        <NavBar></NavBar>
      </div>
    )
  }
}

class NavBar extends React.Component {
  static contextTypes = {
    user: PropTypes.string
  }
  render() {
    console.log(this.context)
    return (
      <div>
        <h2>导航栏</h2>
        <p>{this.context.user}</p>
        <p>{this.context.user}</p>
        <p>{this.context.user}</p>
        <p>{this.context.user}</p>
      </div>
    )
  }
}

class Page extends React.Component {
  constructor () {
    super()
    this.state = {
      user: 'ooo'
    }
  }
  static childContextTypes = {
    user: PropTypes.string
  }
  getChildContext () {
    return this.state
  }
  render() {
    return (
      <SideBar></SideBar>
    )
  }
}

export default Page