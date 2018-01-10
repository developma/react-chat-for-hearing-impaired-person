import React, {Component} from 'react'
import './Header.css'
import ConnectionManager from '../../ws/client/ConnectionManager'
import User from '../../data/User'

export default class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {
      label: 'Join',
      login: false,
      username: ''
    }
    this.socket = ConnectionManager.getConnection()
  }

  update (e) {
    this.setState({username: e.target.value})
  }

  onStateClick (e) {
    const name = this.state.username
    if (this.state.login) {
      this.socket.emit('leave', {
        id: this.socket.id,
        name: name
      })

      this.props.onLeave()
      this.setState({
        label: 'Join',
        login: false,
        username: ''
      })
    } else {
      this.socket.emit('join', {
        id: this.socket.id,
        name: name
      })
      User.setName(name)
      this.props.onJoin()
      this.setState({
        label: 'Leave',
        login: true
      })
    }
  }

  render () {
    return (
      <nav className="navbar navbar-inverse" role="navigation">
        <div className="container">
          <div className="navbar-header">
            <img className="navbar-brand app-logo" src="./favicon.ico" />
            <span className="navbar-brand">React Chat</span>
            <img className="navbar-brand app-logo" src="./favicon.ico" />
          </div>
          <ul className="nav navbar-nav navbar-right">
            {
              (
                () => {
                  if (!this.state.login) {
                    return (
                      <li>
                        <input className="form-control username" type="text"
                          placeholder="username" onChange={e => this.update(e)}
                          value={this.state.username} />
                      </li>
                    )
                  } else {
                    return (
                      <li>
                        <span className="navbar-brand">{this.state.username}</span>
                      </li>
                    )
                  }
                }
              )()
            }
            <li>
              <button className="btn btn-success navbar-btn" onClick={e => this.onStateClick(e)}>
                {this.state.label}
              </button>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}
