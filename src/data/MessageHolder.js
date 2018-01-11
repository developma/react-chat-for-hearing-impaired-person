export default class MessageHolder {
  static addMessage (name, colorCode, body) {
    MessageHolder.list.push({
      name: name,
      colorCode: colorCode,
      body: body
    })
  }

  static getMessages () {
    return MessageHolder.list
  }

  static clear () {
    MessageHolder.list.splice(0, MessageHolder.list.length)
  }
}

MessageHolder.list = []
