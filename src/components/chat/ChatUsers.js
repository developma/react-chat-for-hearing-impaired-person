import React, {Component} from 'react'
import './ChatUsers.css'

export default class ChatUsers extends Component {
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
                  return this.props.users.map(e => (
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
