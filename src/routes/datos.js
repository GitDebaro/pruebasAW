const express = require('express');
const cnt = require("../controllers/datos")

const router = express.Router();

router.get('/datos', cnt.volcado);

module.exports = router;