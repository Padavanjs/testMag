const { Device, DeviceInfo } = require("../models/models");

class DeviceService {
  async findById(id) {
    return await Device.findOne({
      where: { id },
      include: [{ model: DeviceInfo, as: "info" }],
    });
  }
  async createNewDevice(payload) {
    return await Device.create({ ...payload });
  }
  async findByName(name) {
    return await Device.findOne({ where: { name } });
  }
  async findDevices(brandId, typeId, page, limit) {
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;
    let devices;
    if (!brandId && !typeId) {
      devices = await Device.findAndCountAll({ limit, offset });
    }
    if (brandId && !typeId) {
      devices = await Device.findAndCountAll({
        where: { brandId },
        limit,
        offset,
      });
    }
    if (!brandId && typeId) {
      devices = await Device.findAndCountAll({
        where: { typeId },
        limit,
        offset,
      });
    }
    if (brandId && typeId) {
      devices = await Device.findAndCountAll({
        where: { typeId, brandId },
        limit,
        offset,
      });
    }
    return devices;
  }
}

module.exports = DeviceService;
