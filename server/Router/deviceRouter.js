const Router = require("express");
const router = new Router();
const deviceController = require("../controllers/deviceController");
const checkRole = require("../guard/roleGuard");
const {
  getRequestHandler,
  postRequestHandler,
} = require("../shared/handlers/requestHandler");

router.post(
  "/",
  checkRole("ADMIN"),
  postRequestHandler(deviceController.create)
);
router.get("/", getRequestHandler(deviceController.getAll));
router.get("/:id", getRequestHandler(deviceController.getOne));

module.exports = router;
