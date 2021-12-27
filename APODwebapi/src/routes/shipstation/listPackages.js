const express = require("express");
const router = express.Router();
const listPackagesController = require('../../controllers/shipstation/listPackagesController');

router.get('/:carrierCode', listPackagesController.getAll);

module.exports = router;