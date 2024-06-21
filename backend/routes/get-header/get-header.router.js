const { getMSISDN } = require("./get-header.controller");

const router = require("express").Router();

router.get("/", getMSISDN);

module.exports = router;
