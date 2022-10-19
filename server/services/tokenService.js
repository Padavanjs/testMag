const jwt = require("jsonwebtoken");

class TokenSetvice {
  async createAccessToken(payload) {
    return jwt.sign({ ...payload }, process.env.JWT_ACCESS_SECRET);
  }
}

module.exports = TokenSetvice;
