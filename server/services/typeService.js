const { Type } = require("../models/models");

class TypeService {
  async createType(name) {
    return await Type.create(name);
  }

  async getAllType() {
    return await Type.findAll();
  }
}

module.exports = TypeService;
