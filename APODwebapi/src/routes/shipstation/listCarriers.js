const express = require("express");
const router = express.Router();

const listCarriersController = require('../../controllers/shipstation/listCarriersController');

router.get('/', listCarriersController.getAll);
// router.post('/', listCarriersController.createNew);

module.exports = router;