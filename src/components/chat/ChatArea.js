import React, {Component} from 'react'
import './ChatArea.css'
import ChatLog from './ChatLog'
import ChatUsers from './ChatUsers'

export default class ChatArea extends Component {
  render () {
    return (
      <div className="container">
        <ChatLog isJoin={this.props.isJoin} messages={this.props.messages}/>
        <ChatUsers isJoin={this.props.isJoin} users={this.props.users}/>
      </div>
    )
  }
}
