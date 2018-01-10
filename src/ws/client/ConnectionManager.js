import client from 'socket.io-client'

export default class ConnectionManager {
  static open () {
    ConnectionManager.socket = client.connect('http://localhost:3000')
  }

  static getConnection () {
    return ConnectionManager.socket
  }

  static close () {
    // TODO connectionをcloseするAPIを叩く
    ConnectionManager.socket.disconnect()
  }
}

ConnectionManager.socket = null
