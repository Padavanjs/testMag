class ItemNameValidationService {
  validateItemName(payload) {
    const itemName = /^[а-яА-ЯёЁa-zA-Z0-9]+$/;

    if (!itemName.test(payload.name)) {
      return {
        isValid: false,
        errorMessage: `Название не коректно`,
      };
    }

    if (payload.name.length < 2) {
      return {
        isValid: false,
        errorMessage: "Название не коректно",
      };
    }
    return { isValid: true };
  }
  validateItemInfo(payload) {
    const infoItem = /^[а-яА-ЯёЁa-zA-Z0-9]+$/;

    if (!infoItem.test(payload.description)) {
      return {
        isValid: false,
        errorMessage: `Описание не коректно`,
      };
    }

    if (payload.description.length < 20) {
      return {
        isValid: false,
        errorMessage: "Описание не коректно",
      };
    }
    return { isValid: true };
  }
}

module.exports = new ItemNameValidationService();
