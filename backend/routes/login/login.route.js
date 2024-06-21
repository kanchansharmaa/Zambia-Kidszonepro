const {checkuser}=require('./login.controller')

const router = require("express").Router();

router.get("/", checkuser);

module.exports = router;
