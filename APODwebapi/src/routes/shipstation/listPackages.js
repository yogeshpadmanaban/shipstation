const express = require("express");
const router = express.Router();

const listPackagesController = require('../../controllers/shipstation/listPackagesController');

router.get('/', listPackagesController.getAll);
// router.post('/', listPackagesController.createNew);

module.exports = router;