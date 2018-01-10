import React, { Component } from 'react'
import './ChatApp.css'
import Header from '../header/Header'
import ChatArea from './ChatArea'
import ConnectionManager from '../../ws/client/ConnectionManager'
import MessageHolder from '../../data/MessageHolder'

export default class ChatApp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isJoin: false,
      messages: MessageHolder.getMessages(),
      users: []
    }
    ConnectionManager.open()
    this.socket = null
  }

  onJoin () {
    this.socket = ConnectionManager.getConnection()
    this.establishWS()
    this.setState({
      isJoin: true
    })
  }

  establishWS () {
    if (this.socket) {
      this.socket.on('message', (message) => {
        console.log('debug msg ' + message.body)
        MessageHolder.addMessage(message.name, message.colorCode, message.body)
        this.setState({
          messages: MessageHolder.getMessages()
        })
      })

      this.socket.on('users', (data) => {
        this.setState({
          users: data.users
        })
      })
    }
  }

  onLeave () {
    this.socket = null
    this.setState({
      isJoin: false,
      messages: [],
      users: []
    })
  }

  render () {
    return (
      <div>
        <Header onJoin={e => this.onJoin(e)} onLeave={e => this.onLeave(e)}/>
        <ChatArea isJoin={this.state.isJoin} messages={this.state.messages} users={this.state.users}/>
      </div>
    )
  }
}
