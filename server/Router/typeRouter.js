const Router = require("express");
const router = new Router();
const typeController = require("../controllers/typeController");
const checkRole = require("../guard/roleGuard");
const {
  getRequestHandler,
  postRequestHandler,
} = require("../shared/handlers/requestHandler");

router.post("/", checkRole("ADMIN"), postRequestHandler(typeController.create));
router.get("/", getRequestHandler(typeController.getAll));

module.exports = router;
