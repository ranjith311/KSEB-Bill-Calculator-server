const express = require("express");
const { calculate, getTarif } = require("../controllers/calculateController");

const router = express.Router()

router.get("/tarif",getTarif)
router.post("/calculate",calculate)


module.exports = router