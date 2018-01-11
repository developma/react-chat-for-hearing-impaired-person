import React, {Component} from 'react'
import './ChatUsers.css'

export default class ChatUsers extends Component {
  constructor (props) {
    super(props)
    this.state = {
      users: this.props.users
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      users: nextProps.users
    })
  }

  render () {
    return (
      <div className="col-md-3">
        <div className="panel panel-primary">
          <div className="panel-heading">
            ONLINE USERS
          </div>
          <div className="panel-body">
            <div className="chatusers">
              <ul>
                {(() => {
                  return this.props.isJoin && this.state.users.map(e => (
                    <li key={e.id}>
                      <div className="user">
                        <font color={e.colorCode}>
                          {e.name}
                        </font>
                      </div>
                      {
                        e.tmpmessage.length !== 0 &&
                        <div className="tmpmessage">
                          {e.tmpmessage}
                        </div>
                      }
                    </li>
                  ))
                }
                )()}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
