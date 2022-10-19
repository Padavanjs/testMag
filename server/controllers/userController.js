const UserDto = require("../Dto/userDto");
const UserTokenDto = require("../Dto/tokenDto");
const UserService = require("../services/userService");
const TokenService = require("../services/tokenService");
const userValidationService = require("../services/user.validation.service");
const ApiError = require("../shared/errors/apiErors");

class UserController {
  async registration({ body }) {
    const newUser = new UserDto(body);
    const { isValid, errorMessage } =
      userValidationService.validateUserRegisterPayload(newUser);
    if (!isValid) {
      throw new badRequest(errorMessage);
    }
    const checkEmailUser = UserService.findByEmail(newUser.email);
    if (checkEmailUser) {
      throw new badRequest("Эта почта уже используется");
    }
    const createNewUser = await UserService.createUser(newUser);
    const tokenInfo = new UserTokenDto(createNewUser);
    const accessToken = await TokenService.createAccessToken(tokenInfo);
    return { accessToken };
  }
  async login({ body }) {
    const { email, password } = body;
    const user = await UserService.findByEmail(email);
    if (!user) {
      return next(ApiError.internal("Пользователь не найден"));
    }
    let checkkPass = await UserService.checkUserPassword(
      password,
      user.password
    );
    if (!checkkPass) {
      return next(ApiError.internal("Указан неверный пароль"));
    }
    const tokendat = new UserTokenDto(user);
    const token = await TokenService.createAccessToken(tokendat);
    return res.json({ token });
  }

  async check(req, res, next) {
    const infoToken = new UserTokenDto(
      req.user.id,
      req.user.email,
      req.user.role
    );
    const token = await TokenService.createAccessToken(infoToken);
    return res.json({ token });
  }
}

module.exports = UserController;
