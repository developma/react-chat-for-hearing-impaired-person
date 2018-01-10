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
}

MessageHolder.list = []
