const { User } = require("../models/models");
const bcrypt = require("bcryptjs");

class UserService {
  async findByEmail(email) {
    return User.findOne({ where: { email } });
  }
  async createUser(data) {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(data.password, salt);

    return User.create({
      ...data,
      password: hashPassword,
    });
  }
  async checkUserPassword(checkPassword, password) {
    return await bcrypt.compare(checkPassword, password);
  }
}

module.exports = UserService;
