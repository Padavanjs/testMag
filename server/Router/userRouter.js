const Router = require("express");
const router = new Router();
const UserController = require("../controllers/userController");
const authGuard = require("../guard/authGuard");
const {
  getRequestHandler,
  postRequestHandler,
} = require("../shared/handlers/requestHandler");

router.post("/registration", postRequestHandler(UserController.registration));
router.post("/login", postRequestHandler(UserController.login));
router.get("/auth", authGuard, getRequestHandler(UserController.check));
module.exports = router;
