import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import './ChatLog.css'
import ConnectionManager from '../../ws/client/ConnectionManager'
import User from '../../data/User'

export default class ChatLog extends Component {
  constructor (props) {
    super(props)
    this.state = {
      disabled: !this.props.isJoin,
      messages: this.props.messages,
      tmpmessage: ''
    }
    this.socket = null
  }

  componentDidUpdate () {
    const node = ReactDOM.findDOMNode(this.refs.log)
    node.scrollTop = node.scrollHeight
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.isJoin !== undefined) {
      this.setState({
        disabled: !nextProps.isJoin
      })
      if (nextProps.isJoin) {
        this.socket = ConnectionManager.getConnection()
      }
    } else if (nextProps.messages) {
      this.setState({
        messages: nextProps.messages
      })
    }
  }

  onInput (e) {
    const value = e.target.value
    this.setState({tmpmessage: value})
    this.socket.emit('tmpmessage', {
      id: this.socket.id,
      body: value
    })
  }

  onKeyPress (e) {
    if (e.which === 13 && this.state.tmpmessage.length !== 0) {
      this.socket.emit('message', {
        id: this.socket.id,
        name: User.getName(),
        body: this.state.tmpmessage
      })
      this.setState({tmpmessage: ''})
    }
  }

  render () {
    return (
      <div className="col-md-8">
        <div className="panel panel-info">
          <div className="panel-heading">
            CHAT LOG
          </div>
          <div className="panel-body">
            <div className="chatlog" ref="log">
              {(() => {
                return this.props.isJoin && this.state.messages.map(e => (
                  <div>
                    <font color={e.colorCode}>{e.name}</font>:{e.body}
                  </div>
                ))
              }
              )()}
            </div>
          </div>
          <div className="panel-footer">
            <input type="text"
              className="form-control"
              placeholder="your message"
              value={this.state.tmpmessage}
              disabled={this.state.disabled}
              onInput={e => this.onInput(e)}
              onKeyPress={e => this.onKeyPress(e)}
            />
          </div>
        </div>
      </div>
    )
  }
}
