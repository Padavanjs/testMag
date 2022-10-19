const uuid = require("uuid");
const path = require("path");
const { Device, DeviceInfo } = require("../models/models");
const ApiError = require("../shared/errors/apiErors");
const DeviceService = require("../services/deviceService");

class DeviceController {
  async create(req, res, next) {
    try {
      let { name, price, brandId, typeId, info } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));
      const device = await DeviceService.createNewDevice({
        name,
        price,
        brandId,
        typeId,
        img: fileName,
      });

      if (info) {
        info = JSON.parse(info);
        info.forEach((i) =>
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id,
          })
        );
      }

      return "Device successfully created";
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    let { brandId, typeId, limit, page } = req.query;
    const foundDevices = await DeviceService.foundDevices(
      brandId,
      typeId,
      limit,
      page
    );
    return res.json(foundDevices);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const device = await DeviceService.findById(id);
    return res.json(device);
  }
}

module.exports = new DeviceController();
