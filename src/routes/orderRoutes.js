const express = require("express");
const {
  markOrderCompleted,
  getOrderHistory,
} = require("../controllers/orderController");

const router = express.Router();

router.post("/complete", markOrderCompleted);

router.get("/history/:orderId", getOrderHistory);

module.exports = router;
