export default class User {
  static setName (name) {
    User.info.name = name
  }

  static getName () {
    return User.info.name
  }
}

User.info = {
  name: ''
}
