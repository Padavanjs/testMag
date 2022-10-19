class UserDto {
  constructor(payload) {
    this.email = payload.email;
    this.password = payload.password;
  }
}

module.exports = UserDto;
