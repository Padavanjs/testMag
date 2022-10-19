const Router = require("express");
const router = new Router();
const brandController = require("../controllers/brandController");
const checkRole = require("../guard/roleGuard");
const {
  getRequestHandler,
  postRequestHandler,
} = require("../shared/handlers/requestHandler");

router.post(
  "/",
  checkRole("ADMIN"),
  postRequestHandler(brandController.create)
);
router.get("/", getRequestHandler(brandController.getAll));

module.exports = router;
