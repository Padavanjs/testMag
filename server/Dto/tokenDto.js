class UserTokenDto {
  constructor(payload) {
    this.id = payload.id;
    this.email = payload.email;
    this.role = payload.role;
  }
}

module.exports = {
  UserTokenDto,
};
