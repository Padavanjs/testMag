const { Type } = require("../models/models");
const ApiError = require("../shared/errors/apiErors");
const ItemNameValidationService = require("../services/itemValidationService");
const TypeService = require("../services/typeService");

class TypeController {
  async create({ body }) {
    const { name } = body;
    const { isValid, errorMessage } =
      await ItemNameValidationService.validateItemName(name);
    if (!isValid) {
      throw new ApiError.badRequest(errorMessage);
    }
    const type = await TypeService.createType({ name });
    return "Type successfully created";
  }

  async getAll(req, res) {
    const types = await TypeService.getAllType();
    return res.json(types);
  }
}

module.exports = new TypeController();
