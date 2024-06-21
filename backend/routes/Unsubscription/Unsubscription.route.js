const {unsubscribeUser}=require('./Unsubscription.controller')

const router = require("express").Router();

router.post("/", unsubscribeUser);

module.exports = router;
