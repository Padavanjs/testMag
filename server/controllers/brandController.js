const ApiError = require("../shared/errors/apiErors");
const BrandService = require("../services/brandService");
const ItemNameValidationService = require("../services/itemValidationService");

class BrandController {
  async create({ body }) {
    const { name } = body;
    const { isValid, errorMessage } =
      await ItemNameValidationService.validateItemName(name);
    if (!isValid) {
      throw new ApiError.badRequest(errorMessage);
    }
    const brand = await BrandService({ name });
    return "Brand successfully created";
  }

  async getAll(req, res) {
    const brands = await BrandService.getAllBrands();
    return res.json(brands);
  }
  async getOneBrand({ body }) {
    const { name } = body;
    const findBrand = await BrandService.findByName(name);
    return findBrand;
  }
}

module.exports = new BrandController();
