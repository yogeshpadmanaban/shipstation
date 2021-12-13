const express = require("express");
const router = express.Router();

const listPackagesController = require('../../controllers/shipstation/listPackagesController');

router.post('/', listPackagesController.createNew);
// router.post('/', listPackagesController.createNew);

module.exports = router;