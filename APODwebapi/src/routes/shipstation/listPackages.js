const express = require("express");
const router = express.Router();

const listPackagesController = require('../../controllers/shipstation/listPackagesController');

router.post('/', listPackagesController.getAll);

module.exports = router;