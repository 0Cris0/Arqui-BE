const controller = require('../controllers/stocks');
const router = require('express').Router();

// CRUD Routes
// /stocks
router.get("/", controller.getStocks); // /stocks
router.get("/id/:stockId", controller.getStock); // /stocks/:sotckId
router.get("/:symbol", controller.getStockBySymbol); // /stocks/:symbol
router.post("/", controller.createStock); // /stocks
router.put("/:stockId", controller.updateStock); // /stocks/:sotckId
router.delete("/:stockId", controller.deleteStock); // /stocks/:sotckId

module.exports = router;