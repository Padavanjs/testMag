const { Brand } = require("../models/models");

class BrandService {
  async findById(id) {
    return Brand.findByPk(id);
  }
  async createBrand(name) {
    return await Brand.create(name);
  }
  async findByName(name) {
    return await Brand.findOne({ where: { name } });
  }
  async getAllBrands() {
    return await Brand.findAll();
  }
}

module.exports = BrandService;
