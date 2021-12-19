const express = require("express");
const router = express.Router();

const listCarriersController = require('../../controllers/shipstation/listCarriersController');

router.post('/', listCarriersController.createNew);
router.get('/', listCarriersController.getAll);

module.exports = router;